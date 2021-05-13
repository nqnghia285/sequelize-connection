import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";
import { ConnectionDevelopmentENVType, ConnectionProductionENVType, ConnectionType } from "./lib/interface";

dotenv.config();

/**
 * @method connectWithSSL Connect to batabase by ssl
 * @param params ConnectionProductionENVType
 * @returns Sequelize
 */
export function connectWithSSL(params: ConnectionProductionENVType): Sequelize {
    return new Sequelize(params.databaseURL, {
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            freezeTableName: true,
            timestamps: false,
        },
        // logging: console.log, //(...msg) => { console.log(msg) },
        // benchmark: true
    });
}

/**
 * @method connectWithOptions Connect to database with options
 * @param params ConnectionDevelopmentENVType
 * @returns Sequelize
 */
export function connectWithOptions(params: ConnectionDevelopmentENVType): Sequelize {
    return new Sequelize(params.database, params.username, params.password, {
        dialect: dialectConvert(params.dialect),
        dialectOptions: {
            host: params.host,
            port: params.port,
            user: params.username,
            password: params.password,
            database: params.database,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            freezeTableName: true,
            timestamps: false,
        },
        // logging: console.log,
        // benchmark: true,
    });
}

/**
 * @method connect Create a connection to database by Sequelize
 * @param params ConnectionType
 * @returns Sequelize
 */
export function connect(params: ConnectionType): Sequelize {
    if (process.env.NODE_ENV === "production") {
        const connection: ConnectionProductionENVType = params;
        return connectWithSSL(connection);
    } else {
        const connection: ConnectionDevelopmentENVType = params;
        return connectWithOptions(connection);
    }
}

/**
 * @method dialectConvert Convert a string to Dialect
 * @param dialect string | undefined
 * @returns Dialect
 */
export function dialectConvert(dialect: string | undefined): Dialect {
    const mysql: Dialect = "mysql";
    const postgres: Dialect = "postgres";
    const sqlite: Dialect = "sqlite";
    const mariadb: Dialect = "mariadb";
    const mssql: Dialect = "mssql";

    switch (dialect) {
        case "mysql":
            return mysql;
        case "postgres":
            return postgres;
        case "sqlite":
            return sqlite;
        case "mariadb":
            return mariadb;
        case "mssql":
            return mssql;
        default:
            return "postgres";
    }
}

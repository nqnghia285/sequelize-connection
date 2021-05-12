import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";
import { ConnectionDevelopmentENVType, ConnectionProductionENVType, ConnectionType } from "./lib/interface";

dotenv.config();

/**
 * @method sequelize Sequelize instance
 */
let sequelize: Sequelize = new Sequelize();

/**
 * @method initConnectToDatabase Initiate Sequelize intance
 * @param params ConnectionType
 */
export function initConnectToDatabase(params: ConnectionType): void {
    sequelize = connect(params);
}

/**
 * @method connect Create a connection to database by Sequelize
 * @param params ConnectionType
 * @returns Sequelize
 */
export function connect(params: ConnectionType): Sequelize {
    if (process.env.NODE_ENV === "production") {
        const connection: ConnectionProductionENVType = params;

        if (connection.databaseURL !== undefined) {
            return new Sequelize(connection.databaseURL, {
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
        } else {
            return new Sequelize();
        }
    } else {
        const connection: ConnectionDevelopmentENVType = params;

        if (connection.database !== undefined && connection.username) {
            return new Sequelize(connection.database, connection.username, connection.password, {
                //mydb myuser
                dialect: dialectConvert(connection.dialect),
                dialectOptions: {
                    host: connection.host,
                    port: connection.port,
                    user: connection.username,
                    password: connection.password,
                    database: connection.database,
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
        } else {
            return new Sequelize();
        }
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

export default sequelize;

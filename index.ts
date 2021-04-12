import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";

dotenv.config();

/**
 * @method sequelize: Object Sequelize
 */
const sequelize: Sequelize = connect();

/**
 * @method connect: Create a connection to database by Sequelize
 * @returns Sequelize
 */
export function connect(): Sequelize {
    if (process.env.NODE_ENV === "production") {
        const DATABASE_URL: string = process.env.DATABASE_URL || "your-database-url";

        return new Sequelize(DATABASE_URL, {
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
        const database = process.env.DATABASE || "your-database";
        const username = process.env.USER || "your-username-of-database";
        const password = process.env.PASSWORD;
        const dialect: Dialect = dialectConvert(process.env.DIALECT);
        const host = process.env.HOST;
        const port = process.env.DATABASE_PORT;

        return new Sequelize(database, username, password, {
            //mydb myuser
            dialect: dialect,
            dialectOptions: {
                host: host,
                port: port,
                user: username,
                password: password,
                database: database,
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            define: {
                freezeTableName: true,
                timestamps: true,
            },
            logging: console.log,
            benchmark: true,
        });
    }
}

/**
 * @method dialectConvert: Convert a string to Dialect
 * @param dialect
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

import { Dialect, Sequelize } from "sequelize";
import { ConnectionDevelopmentENVType, ConnectionProductionENVType, ConnectionType } from "./lib/interface";

/**
 * @method connectWithSSL Connect to batabase by ssl
 * @param params ConnectionProductionENVType
 * @returns Sequelize
 */
export declare function connectWithSSL(params: ConnectionProductionENVType): Sequelize;

/**
 * @method connectWithOptions Connect to database with options
 * @param params ConnectionDevelopmentENVType
 * @returns Sequelize
 */
export declare function connectWithOptions(params: ConnectionDevelopmentENVType): Sequelize;

/**
 * @method connect Create a connection to database by Sequelize
 * @param params ConnectionType
 * @returns Sequelize
 */
export declare function connect(params: ConnectionType): Sequelize;

/**
 * @method dialectConvert Convert a string to Dialect
 * @param dialect string | undefined
 * @returns Dialect
 */
export declare function dialectConvert(dialect: string | undefined): Dialect;

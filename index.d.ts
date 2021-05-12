import { Dialect, Sequelize } from "sequelize";
import { ConnectionType } from "./lib/interface";

/**
 * @method sequelize Sequelize instance
 */
declare let sequelize: Sequelize;

/**
 * @method initConnectToDatabase Initiate Sequelize intance
 * @param params ConnectionType
 */
export declare function initConnectToDatabase(params: ConnectionType): void;

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

export default sequelize;

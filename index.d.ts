import { Dialect, Sequelize } from "sequelize";

/**
 * @method sequelize: Object Sequelize
 */
declare const sequelize: Sequelize;

/**
 * @method connect: Create a connection to database by Sequelize
 * @returns Sequelize
 */
export declare function connect(): Sequelize;

/**
 * @method dialectConvert: Convert a string to Dialect
 * @param dialect
 * @returns Dialect
 */
export declare function dialectConvert(dialect: string | undefined): Dialect;

export default sequelize;

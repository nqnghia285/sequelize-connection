# Sequelize Connection [![Build Status](https://github.com/Links2004/arduinoWebSockets/workflows/CI/badge.svg?branch=master)](https://github.com/nqnghia285/sequelize-connection.git)

Sequelize Connection support us to connect to database.

### Functions:

```typescript
/**
 * @method connectWithSSL Connect to batabase by ssl
 * @param params ConnectionProductionENVType
 * @returns Sequelize
 */
function connectWithSSL(params: ConnectionProductionENVType): Sequelize;
```

```typescript
/**
 * @method connectWithOptions Connect to database with options
 * @param params ConnectionDevelopmentENVType
 * @returns Sequelize
 */
function connectWithOptions(params: ConnectionDevelopmentENVType): Sequelize;
```

```typescript
/**
 * @method connect Create a connection to database by Sequelize
 * @param params ConnectionType
 * @returns Sequelize
 */
function connect(params: ConnectionType): Sequelize;
```

```typescript
/**
 * @method dialectConvert Convert a string to Dialect
 * @param dialect string | undefined
 * @returns Dialect
 */
function dialectConvert(dialect: string | undefined): Dialect;
```

### Example:

```typescript
// ES6
import { connect, connectWithSSL, connectWithOptions } from "sequelize-connection";
import { Sequelize } from "sequelize";
import { ConnectionDevelopmentENVType, ConnectionProductionENVType, ConnectionType } from "sequelize-connection/dist/lib/interface";

let sequelize: Sequelize | undefined = undefined;

......
// Variables of production environment
const databaseURL = process.env.DATABASE_URL;
if (databaseURL !== undefined) {
    const connection: ConnectionProductionENVType = {
        databaseURL: databaseURL
    };

    sequelize = connectWithSSL(connection);
}

......
// Variables of development environment
const database = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;
const databasePort = process.env.DATABASE_PORT;

if (database !== undefined && user !== undefined && password !== undefined && host !== undefined && dialect !== undefined && databasePort !== undefined) {
    const connection: ConnectionDevelopmentENVType = {
        database: database,
        username: user,
        password: password,
        dialect: dialect,
        host: host,
        port: databasePort
    };

    sequelize = connectWithOptions(connection);
}

......
// Variables of production environment
const databaseURL = process.env.DATABASE_URL;

// Variables of development environment
const database = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;
const databasePort = process.env.DATABASE_PORT;

if (databaseURL !== undefined && database !== undefined && user !== undefined && password !== undefined && host !== undefined && dialect !== undefined && databasePort !== undefined) {
    const connection: ConnectionDevelopmentENVType = {
        databaseURL: databaseURL,
        database: database,
        username: user,
        password: password,
        dialect: dialect,
        host: host,
        port: databasePort
    };

    sequelize = connect(connection);
}

......
// Define model
sequelize.define("User",
    {
        id: { type: SMALLINT, primaryKey: true, autoIncrease: true },

        username: { type: STRING, allowNull: false },

        password: { type: STRING, allowNull: false }
    }
);

// Sync models in database
sequelize.sync();
```

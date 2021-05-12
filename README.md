# Sequelize Connection [![Build Status](https://github.com/Links2004/arduinoWebSockets/workflows/CI/badge.svg?branch=master)](https://github.com/nqnghia285/sequelize-connection.git)

Sequelize Connection support us to connect to database.

### Functions:

```typescript
/**
 * @method initConnectToDatabase Initiate Sequelize intance
 * @param params ConnectionType
 */
function initConnectToDatabase(params: ConnectionType): void;
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
import sequelize, { initConnectToDatabase } from "sequelize-connection";
import { ConnectionDevelopmentENVType, ConnectionProductionENVType, ConnectionType } from "sequelize-connection/lib/interface";

...
// DEV_ENV
const connection: ConnectionDevelopmentENVType = {
    database: "your-database",
    username: "your-username",
    password: "your-password",
    dialect: "postgres, mysql...",
    host: "your-host",
    port: "port of database" | 1234
}

...
// PRO_ENV
const connection: ConnectionProductionENVType = {
    databaseURL: "your-database-url"
}

// Init sequelize instance connect to database
initConnectToDatabase(connection);
...

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

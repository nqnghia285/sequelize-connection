# Sequelize Connection [![Build Status](https://github.com/Links2004/arduinoWebSockets/workflows/CI/badge.svg?branch=master)](https://github.com/nqnghia285/sequelize-connection.git)

Sequelize Connection support us to connect to database.

### Functions:

```typescript
/**
 * @method connectWithSSL Connect to batabase by ssl
 * @param params IConnectionProductionMode
 * @returns Sequelize
 */
function connectWithSSL(params: IConnectionProductionMode): Sequelize;
```

```typescript
/**
 * @method connectWithOptions Connect to database with options
 * @param params IConnectionDevelopmentMode
 * @returns Sequelize
 */
function connectWithOptions(params: IConnectionDevelopmentMode): Sequelize;
```

```typescript
/**
 * @method connect Create a connection to database by Sequelize
 * @param params IConnection
 * @returns Sequelize
 */
function connect(params: IConnection): Sequelize;
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

// Variables of production environment
const databaseURL = process.env.DATABASE_URL || "your-database-url";

const connection: IConnectionProductionMode = {
    databaseURL: databaseURL
};

const sequelize = connectWithSSL(connection);

......
// Variables of development environment
const database = process.env.DATABASE || "your-database";
const user = process.env.USER || "postgres";
const password = process.env.PASSWORD || "your-password ";
const host = process.env.HOST || "0.0.0.0";
const dialect = process.env.DIALECT || "postgres";
const databasePort = process.env.DATABASE_PORT || "5432";

const connection: IConnectionDevelopmentMode = {
    database: database,
    username: user,
    password: password,
    dialect: dialect,
    host: host,
    port: databasePort
};

const sequelize = connectWithOptions(connection);


......
// Variables of production environment
const databaseURL = process.env.DATABASE_URL || "your-database-url";

// Variables of development environment
const database = process.env.DATABASE || "your-database";
const user = process.env.USER || "postgres";
const password = process.env.PASSWORD || "your-password ";
const host = process.env.HOST || "0.0.0.0";
const dialect = process.env.DIALECT || "postgres";
const databasePort = process.env.DATABASE_PORT || "5432";


const connection: IConnection = {
    databaseURL: databaseURL,
    database: database,
    username: user,
    password: password,
    dialect: dialect,
    host: host,
    port: databasePort
};

const sequelize = connect(connection);

......
// Define model
sequelize.define("User",
    {
        id: { type: SMALLINT, primaryKey: true, autoIncrement: true },

        username: { type: STRING, allowNull: false },

        password: { type: STRING, allowNull: false }
    }
);

// Sync models in database
(async () => {
    await sequelize.sync();
    await sequelize.models.User.create({ username: "admin@gmail.com", password: "acbxyz" });
})();
```

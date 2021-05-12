export interface ConnectionProductionENVType {
    databaseURL?: string;
}

export interface ConnectionDevelopmentENVType {
    database?: string;
    username?: string;
    password?: string;
    dialect?: string;
    host?: string;
    port?: string | number;
}

export type ConnectionType = ConnectionProductionENVType & ConnectionDevelopmentENVType;

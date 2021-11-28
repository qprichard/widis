import dotenv from "dotenv";
import {ConnectionOptions, createConnection} from "mysql2/promise";

dotenv.config();

export const config: ConnectionOptions = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
}
const connection = createConnection(config);

export function query<T>(sql: string, params: any[] = []): Promise<T | any> {
    return connection
        .then((c) => c.query(sql, params)
            .then((data) => data[0])
        );
}
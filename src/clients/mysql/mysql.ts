import mysql from 'mysql2/promise';
import { getEnv } from '../../env';
import { createTaskAssignmentTable, createTaskListTable, createTaskTable } from './ddl-script';

interface ConnectionOptions {
    host: string,
    user: string,
    database: string,
    password: string
}


//connection pool improves latencies of queries
const createConnectionPool = (options: ConnectionOptions) => {
    const conn = mysql.createPool({
         host: options.host,
        user: options.user,
        database: options.database,
        password: options.password,
        port: 3309,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    return conn;
}

// export const getMysql = (): mysql.Connection => {
//     return createConnection({
//         host: getEnv().MYSQL_HOSTNAME,
//         user: getEnv().MYSQL_USER,
//         database: getEnv().MYSQL_DATABASE,
//         password: getEnv().MYSQL_PASSWORD
//     });
// }

export const getMysqlPool = (): mysql.Pool => {
    return createConnectionPool({
        host: getEnv().MYSQL_HOSTNAME,
        user: getEnv().MYSQL_USER,
        database: getEnv().MYSQL_DATABASE,
        password: getEnv().MYSQL_PASSWORD,
    });
}

//execute DDL script
Promise.all([
    createTaskTable(getMysqlPool()),
    createTaskListTable(getMysqlPool()),
    createTaskAssignmentTable(getMysqlPool())
    ]).then(() => {
    console.info('Successfully ran the DDL script')
}).catch((err) => {
    //console.log({err});
    console.error('Error occured while running the DDL script', err.message);
})
import mysql from 'mysql2/promise';
import { Tables } from '../../constants';


export const createTaskTable = (conn: mysql.Pool) => {
    return conn.execute(`
    CREATE TABLE IF NOT EXISTS ${Tables.Task}
    (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    updated_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NULL,
    description VARCHAR(100),
    status VARCHAR(100)
    );`).then(() => {
        //console.log('created task table');
    })
}

export const createTaskListTable = (conn: mysql.Pool) => {
    return conn.execute(`
    CREATE TABLE IF NOT EXISTS ${Tables.TaskList}
    (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    updated_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NULL
    );`).then(() => {
       // console.log('created task list table');
    })
}

//apologies for this function name :)
export const createTaskAssignmentTable = (conn: mysql.Pool) => {
    return conn.execute(`
    CREATE TABLE IF NOT EXISTS ${Tables.TaskAssignment}
    (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    tasklist_id INT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES ${Tables.Task}(id),
    FOREIGN KEY (tasklist_id) REFERENCES ${Tables.TaskList}(id)
    );`).then(() => {
       // console.log('created task assignement table');
    })
}
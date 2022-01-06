import { Task, TaskDao } from "./TaskDao";
import mysql from 'mysql2/promise';
import { Tables } from "../../constants";

export class TaskDaoMySql implements TaskDao {

    pool: mysql.Pool;
    
    constructor(mysql: mysql.Pool) {
        this.pool = mysql;
    }

    deleteTaskById(task_id: string): Promise<void> {
        return this.pool.execute(`DELETE FROM ${Tables.Task} WHERE id = ?`, 
        [task_id])
        .then(() => {
            return;
        })
    }

    deleteAllTasks(): Promise<void> {
        return this.pool.execute(`DELETE FROM ${Tables.Task}`)
        .then(() => {
            return;
        })
    }

    createTask(doc: Task): Promise<void> {
        return this.pool.execute(`INSERT INTO ${Tables.Task}(title, description, status, updated_at, created_at)
        VALUES (?, ?, ?, ?, ?); SELECT title, updated_at`, [doc.title, doc.description, doc.status, doc.updated_at, doc.created_at])
        .then(() => {
            return;
        })
    }

    updateTask(task_id: string, doc: Partial<Task>): Promise<void> {
        return this.pool.execute(`UPDATE ${Tables.Task} SET title = ?, description = ?, status = ?, updated_at = ? WHERE id = ?`, 
        [doc.title, doc.description, doc.status, doc.updated_at, task_id])
        .then(() => {
            return;
        })
    }

    getTaskById(task_id: string): Promise<Task>{
        return this.pool.execute(`SELECT * FROM ${Tables.Task} WHERE id = ?`, 
        [task_id])
        .then((result) => {
            return JSON.parse(JSON.stringify(result[0]))[0];
        })
    }

    getAllTasks(): Promise<Task[]> {
        return this.pool.execute(`SELECT * FROM ${Tables.Task}`)
        .then((result) => {
            return JSON.parse(JSON.stringify(result[0]));
        })
    }

}
import mysql from 'mysql2/promise';
import { Tables } from '../../constants';
import { TaskListDao, TaskList } from "./TaskListDao";


export class TaskListDaoMySql implements TaskListDao {

    pool: mysql.Pool;
    
    constructor(mysql: mysql.Pool) {
        this.pool = mysql;
    }

    addTaskToList(task_id: string, tasklist_id: string): Promise<void> {
        return this.pool.execute(`INSERT INTO ${Tables.TaskAssignment}(task_id, tasklist_id)
        VALUES (?, ?)`, [task_id, tasklist_id])
        .then(() => {
            return;
        });
    }

    removeTaskFromList(task_id: string, tasklist_id: string): Promise<void> {
         return this.pool.execute(`DELETE FROM ${Tables.TaskAssignment} WHERE task_id = ? AND tasklist_id = ?`, [task_id, tasklist_id])
        .then(() => {
            return;
        })
    }
  
    getTaskListsTasksById(tasklist_id: string) {
        // return this.pool.execute(`SELECT * FROM ${Tables.TaskAssignment} TAS,${Tables.TaskList} TL,${Tables.Task}TA 
        // JOIN TAS.task_id ON TA.id AND TAS.tasklist_id ON TL.id WHERE task_id = ?`, 
        // [task_id])
        // .then((result) => {
        //     return JSON.parse(JSON.stringify(result[0]))[0];
        // })
        return this.pool.execute(`SELECT * FROM ${Tables.TaskAssignment} AS TAS
        JOIN ${Tables.Task} AS TA ON TAS.task_id = TA.id WHERE tasklist_id = ?`, 
        [tasklist_id])
        .then((result) => {
            return JSON.parse(JSON.stringify(result[0]))[0];
        })
    }

    deleteTaskListById(task_id: string): Promise<void> {
        return this.pool.execute(`DELETE FROM ${Tables.TaskList} WHERE id = ?`, 
        [task_id])
        .then(() => {
            return;
        })
    }

    deleteAllTaskLists(): Promise<void> {
        return this.pool.execute(`DELETE FROM ${Tables.TaskList}`)
        .then(() => {
            return;
        })
    }

    createTaskList(doc: TaskList): Promise<any> {
        return this.pool.execute(`INSERT INTO ${Tables.TaskList}(title, updated_at, created_at)
        VALUES (?, ?, ?)`, [doc.title, doc.updated_at, doc.created_at])
        .then(() => {
            return;
        })
    }

    updateTaskList(tasklist_id: string, doc: Partial<TaskList>): Promise<void> {
        return this.pool.execute(`UPDATE ${Tables.TaskList} SET title = ?, updated_at = ? WHERE id = ?`, 
        [doc.title, doc.updated_at, tasklist_id])
        .then(() => {
            return;
        })
    }

    getTaskListById(task_id: string): Promise<TaskList>{
        return this.pool.execute(`SELECT * FROM ${Tables.TaskList} WHERE id = ?`, 
        [task_id])
        .then((result) => {
            return JSON.parse(JSON.stringify(result[0]))[0];
        })
    }

    getAllTaskLists(): Promise<TaskList[]> {
        return this.pool.execute(`SELECT * FROM ${Tables.TaskList}`)
        .then((result) => {
            return JSON.parse(JSON.stringify(result[0]));
        })
    }

}
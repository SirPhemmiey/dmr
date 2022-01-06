import { Task, TaskDao, TaskStatus } from "./TaskDao";

export class TaskService {

    constructor(private taskDao: TaskDao) {}

    createTask(doc: Task) {
       doc.created_at = new Date();
       doc.updated_at = new Date();
       doc.status = TaskStatus.Pending;
       return this.taskDao.createTask(doc);
    }

    getTaskById(task_id: string): Promise<Task>{
        return this.taskDao.getTaskById(task_id);
    }

    getAllTasks(): Promise<Task[]> {
        return this.taskDao.getAllTasks();
    }

    deleteTaskById(task_id: string) {
        return this.taskDao.deleteTaskById(task_id);
    }

    deleteAllTasks() {
        return this.taskDao.deleteAllTasks();
    }

    async updateTask(task_id: string, doc: Partial<Task>) {
        const task = await this.getTaskById(task_id);
        const updatedTask = {
            ...task,
            ...doc,
        };
        updatedTask.updated_at = new Date();
        return this.taskDao.updateTask(task_id, updatedTask);
    }
    

}
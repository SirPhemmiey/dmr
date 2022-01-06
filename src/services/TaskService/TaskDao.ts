
export enum TaskStatus {
    Pending = 'Pending',
    Completed = 'Completed'
}

export interface Task {
    title: string,
    description: string
    status: TaskStatus,
    updated_at: Date,
    created_at: Date,
}

export interface TaskDao {
    createTask(doc: Task): Promise<void>;
    updateTask(task_id: string, doc: Partial<Task>): Promise<void>;
    getTaskById(task_id: string): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    deleteTaskById(task_id: string): Promise<void>;
    deleteAllTasks(): Promise<void>;
}
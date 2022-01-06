
export interface TaskList {
    title: string,
    updated_at: Date,
    created_at: Date,
}

export interface TaskListAssignment {

}

export interface TaskListDao {
    createTaskList(doc: TaskList): Promise<void>;
    updateTaskList(task_id: string, doc: Partial<TaskList>): Promise<void>;
    getTaskListById(task_id: string): Promise<TaskList>;
    getAllTaskLists(): Promise<TaskList[]>;
    deleteTaskListById(task_id: string): Promise<void>;
    deleteAllTaskLists(): Promise<void>;
    addTaskToList(task_id: string, tasklist_id: string): Promise<void>;
    removeTaskFromList(task_id: string, tasklist_id: string): Promise<void>;
    getTaskListsTasksById(task_id: string): Promise<any>;
    // deleteTaskListsByTaskId()
}
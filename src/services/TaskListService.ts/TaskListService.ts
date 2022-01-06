import { TaskList, TaskListDao } from "./TaskListDao";

export class TaskListService {

    constructor(private taskListDao: TaskListDao) {}

    createTaskList(doc: TaskList) {
       doc.created_at = new Date();
       doc.updated_at = new Date();
       return this.taskListDao.createTaskList(doc);
    }

    getTaskListById(task_id: string): Promise<TaskList>{
        return this.taskListDao.getTaskListById(task_id);
    }

    getAllTaskLists(): Promise<TaskList[]> {
        return this.taskListDao.getAllTaskLists();
    }

    deleteTaskListById(task_id: string) {
        return this.taskListDao.deleteTaskListById(task_id);
    }

    deleteAllTaskLists() {
        return this.taskListDao.deleteAllTaskLists();
    }

    async updateTaskList(tasklist_id: string, doc: Partial<TaskList>) {
        const task = await this.getTaskListById(tasklist_id);
        const updatedTaskList = {
            ...task,
            ...doc,
        };
        updatedTaskList.updated_at = new Date();
        return this.taskListDao.updateTaskList(tasklist_id, updatedTaskList);
    }

    addTaskToTaskList(task_id: string, tasklist_id: string) {
        return this.taskListDao.addTaskToList(task_id, tasklist_id);
    }
    
    removeTaskFromTaskList(task_id: string, tasklist_id: string) {
        return this.taskListDao.removeTaskFromList(task_id, tasklist_id);
    }

    //TODO: get tasks in a tasklist
    getTaskListsByTaskId(tasklist_id: string) {
        return this.taskListDao.getTaskListsTasksById(tasklist_id);
    }

}
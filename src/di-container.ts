
/**
 *
 * Manual dependency injection was used here, but a dependency injection library like typedi could be used as normal practice
 */

import { TaskDao } from "./services/TaskService/TaskDao";
import { TaskDaoMySql } from "./services/TaskService/TaskDaoMySQL";
import { TaskService } from "./services/TaskService/TaskService";
import { getMysqlPool } from "./clients/mysql/mysql";
import { TaskListService } from "./services/TaskListService.ts/TaskListService";
import { TaskListDao } from "./services/TaskListService.ts/TaskListDao";
import { TaskListDaoMySql } from "./services/TaskListService.ts/TaskListDaoMySQL";

export interface ServiceContainer {
    taskService: TaskService,
    taskDao: TaskDao,

    taskListService: TaskListService,
    taskListDao: TaskListDao,
}

const taskDao = new TaskDaoMySql(getMysqlPool());
export const taskService = new TaskService(taskDao);

const taskListDao = new TaskListDaoMySql(getMysqlPool());
export const taskListService = new TaskListService(taskListDao);
import { Router } from 'express'
import { messages } from '../../../constants';
import statusCode from 'http-status-codes';
import { ResponseFormat } from '../../../core/ResponseFormat';
import { taskListService } from '../../../di-container';
import Boom from "boom";
import { TaskList } from '../../../services/TaskListService.ts/TaskListDao';

const router = Router();
const response = new ResponseFormat();

router.get('/all', (req, res, next) => {
    taskListService.getAllTaskLists().then((tasklists) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                tasklists,
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.get('/:id', (req, res, next) => {
    taskListService.getTaskListById(req.params.id).then((tasklist) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                tasklist,
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.post('/create', (req, res, next) => {
    const doc = req.body as TaskList;
    taskListService.createTaskList(doc).then((result) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Tasklist created successfully",
            }
        });
    }).catch((err) => {
        console.log({err});
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.patch('/:id', (req, res, next) => {
    const doc = req.body as TaskList;
    //TODO: add a validator schema
    taskListService.updateTaskList(req.params.id, doc).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Tasklist updated successfully",
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.delete('/all', (req, res, next) => {
    taskListService.deleteAllTaskLists().then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Tasklists deleted successfully",
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.delete('/:id', (req, res, next) => {
    taskListService.deleteTaskListById(req.params.id).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Tasklist deleted successfully",
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.post('/:tasklist_id/assign/:task_id', (req, res, next) => {
    const {tasklist_id, task_id} = req.params;
    //const task_id = req.body;
    taskListService.addTaskToTaskList(task_id, tasklist_id).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Task added to tasklist successfully",
            }
        });
    }).catch((err) => {
        console.log({err});
        console.error(err.message);
        let { output } = Boom.badRequest(err.message);        
        return response.handleError(res, output);
    });
});

router.delete('/:tasklist_id/remove/:task_id', (req, res, next) => {
    const {tasklist_id, task_id} = req.params;
    taskListService.removeTaskFromTaskList(task_id, tasklist_id).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Task removed from tasklist successfully",
            }
        });
    }).catch((err) => {
        console.log({err});
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.get('/assignments/:tasklist_id', (req, res, next) => {
    taskListService.getTaskListsByTaskId(req.params.tasklist_id).then((tasklist) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                tasklist,
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

export { router as tasklistRouter }

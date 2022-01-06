import { Router } from 'express'
import { messages } from '../../../constants';
import statusCode from 'http-status-codes';
import { ResponseFormat } from '../../../core/ResponseFormat';
import { taskService } from '../../../di-container';
import Boom from "boom";
import { Task } from '../../../services/TaskService/TaskDao';

const router = Router();
const response = new ResponseFormat();

router.get('/all', (req, res, next) => {
    taskService.getAllTasks().then((tasks) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                tasks,
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.get('/:id', (req, res, next) => {
    taskService.getTaskById(req.params.id).then((task) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                task,
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.post('/create', (req, res, next) => {
    const doc = req.body as Task;
    taskService.createTask(doc).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Task created successfully",
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
    const doc = req.body as Task;
    //TODO: add a validator schema
    taskService.updateTask(req.params.id, doc).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Task updated successfully",
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.delete('/all', (req, res, next) => {
    taskService.deleteAllTasks().then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Tasks deleted successfully",
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

router.delete('/:id', (req, res, next) => {
    taskService.deleteTaskById(req.params.id).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: "Task deleted successfully",
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
});

export { router as taskRouter }

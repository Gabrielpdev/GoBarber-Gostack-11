import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionRouter = Router();
const sessionController = new SessionsController();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;

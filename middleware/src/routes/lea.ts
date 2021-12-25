import express, {NextFunction, Request, Response} from 'express';
import {LeaManager} from "../../../crawler/src/index";
const router = express.Router()

const leaManager: {[id: string]: LeaManager} = {};

router.use(async (req, res, next) => {
    if (!leaManager[req.session.id]) {
        leaManager[req.session.id] = await LeaManager.build(req.session.omnivoxCookie!);
    } 
    next();
});

router.get('/getClasses', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        data: await leaManager[req.session.id].getAllClasses()
    });
});

export default router;

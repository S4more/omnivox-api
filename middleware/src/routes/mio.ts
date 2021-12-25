import express, {NextFunction, Request, Response} from 'express';
import {MioManager } from "../../../crawler/src/index";
const router = express.Router()

const mioManager: {[id: string]: MioManager} = {};

router.use(async (req, res, next) => {
    console.log(mioManager);
    if (!mioManager[req.session.id]) {
        mioManager[req.session.id] = await MioManager.build(req.session.omnivoxCookie!);
    } 
    next();
});

router.get('/mioList', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        data: await mioManager[req.session.id].loadMioPreview()
    });
});

router.get('/mioName', async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id as string;
    return res.status(200).json({
        data: await mioManager[req.session.id].loadMioById(id)
    });
});

export default router;

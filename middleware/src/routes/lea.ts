import express, {NextFunction, Request, Response} from 'express';
import {LeaManager} from "omnivox-crawler";
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

router.get('/getClassByName', async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.name) {
        const data = await leaManager[req.session.id].getClass({name: req.query.name as string});
        return res.status(200).json({'data': data});
    }
    return res.status(422).json("missing name parameter");
});

router.get('/getClassByCode', async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.code) {
        const data = await leaManager[req.session.id].getClass({code: req.query.code as string});
        return res.status(200).json({data});
    }
    return res.status(422).json("Missing code parameter");
});

router.get('/getClassByTeacher', async (req: Request, res: Response) => {
    console.log(req.query.name);
    if (req.query.name) {
        const data = await leaManager[req.session.id].getClass({teacher: req.query.name as string});
        return res.status(200).json({data});
    }
    return res.status(422).json("missing name parameter");
});

export default router;

import express, {NextFunction, Request, Response} from 'express';
import {MioManager} from "omnivox-crawler";
const router = express.Router()

const mioManager: {[id: string]: MioManager} = {};

router.use(async (req, res, next) => {
    if (!mioManager[req.session.id]) {
        mioManager[req.session.id] = await MioManager.build(req.session.omnivoxCookie!);
    } 
    next();
});

router.get('/getAllPreview', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({data: await mioManager[req.session.id].loadMioPreview()});
});

router.get('/getByID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.id) {
            const id = req.query.id as string;
            return res.status(200).json(await mioManager[req.session.id].loadMioById(id));
        }
    } catch (error) {
        return res.status(400).json((<Error> error).message);
    }
});

router.post('/sendMio', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await mioManager[req.session.id].sendMio(req.body.users, req.body.mio);
        return res.status(200).json("sent");
    } catch (error) {
        return res.status(200).json("Couldn't interpret input");
    }

});

router.get('/getUsersByName', async (req: Request, res: Response) => {
    if (req.query.name) {
        const name = req.query.name as string;
        return res.status(200).json({data: await mioManager[req.session.id].getUserList(name)});
    }
    return res.status(400).json("Missing name parameter");
});

router.get('/getCachedUserByID', (req: Request, res: Response, next: NextFunction) => {
    if (req.query.id) {
        const id = req.query.id as string;
        return res.status(200).json(mioManager[req.session.id].getCachedUserByID(id));
    }
    return res.status(400).json("Missing id parameter");
});

export default router;

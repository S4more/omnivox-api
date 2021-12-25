import express, {NextFunction, Request, Response} from 'express';
const router = express.Router()
router.get('/mioList', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'pong'
    });
});

export = router;

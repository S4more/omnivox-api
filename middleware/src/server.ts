import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mioRoutes from './routes/mio';
import leaRoutes from './routes/lea';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {login as omnivoxLogin } from 'omnivox-crawler';

const NAMESPACE = 'Server';
const router = express();

declare module 'express-session' {
    interface SessionData {
        username: string,
        password: string,
        omnivoxCookie: string[];
    }
}

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());
router.use(session({'secret': 'this is my secret', 'resave': true, 'saveUninitialized': true}));
let logged: string[] = [];

/** Rules of our API */
router.use(async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');


    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    if (!logged.includes(req.session.id) && req.path != '/api/login') {
        return res.status(200).json("not logged in");
    }


    next();
});

router.use('/api/login', async (req, res, next) => {
    if (req.method != 'POST') {
        return res.status(405).json("login uses post");
    }
    let ses = req.session;
    ses.username = req.body.username as string;
    ses.password = req.body.password as string;
    try {
        ses.omnivoxCookie = (await omnivoxLogin(ses.username!, ses.password!)).getCache();
        logged.push(ses.id);
        return res.status(200).json("Logged in!");
    } catch (error) {
        res.status(200).json(error);
        ses.destroy(() => console.log(JSON.stringify(error)));
    }

});

/** Routes go here */
router.use('/api/mio', mioRoutes);
router.use('/api/lea', leaRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

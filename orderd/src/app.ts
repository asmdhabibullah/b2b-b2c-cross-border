import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from 'package.breezebd.com';
import { createOrderRouter } from './routers/createOrder';
import { cancelOrderRouter } from './routers/cancelOrder';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        // secure: process.env.NODE_ENV !== 'test',
        secure: false,
    })
);

// console.log("Running");
app.use(createOrderRouter);
app.use(cancelOrderRouter);

app.all('*', async (req, res) => {
    console.log("Order app error handaler for all routers.");
    throw new NotFoundError();
});

// app.use(errorHandler);

export { app };
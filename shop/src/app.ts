import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from 'package.breezebd.com';
import { createBusinessRouter } from './routers/createBusiness';
import { createProductRouter } from './routers/createProduct';
import { deleteProductRouter } from './routers/deleteProduct';
import { getProductRouter } from './routers/getProduct';
import { getProductsRouter } from './routers/getProducts';
import { updateProductRouter } from './routers/updsteProduct';



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
app.use(getProductRouter);
app.use(getProductsRouter);
app.use(updateProductRouter);
app.use(createProductRouter);
app.use(deleteProductRouter);
app.use(createBusinessRouter);

app.all('*', async (req, res) => {
    console.log("Business app error handaler for all routers.");
    throw new NotFoundError();
});

// app.use(errorHandler);

export { app };
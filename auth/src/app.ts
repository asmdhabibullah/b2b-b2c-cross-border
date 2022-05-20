import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from 'package.breezebd.com';

import { signinUserRouter } from './routers/signin';
import { signoutUserRouter } from './routers/signout';
import { signupUserRouter } from './routers/signup';
import { updateUserRouter } from './routers/update';
import { deleteUserRouter } from './routers/delete';

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

// Normal User
// console.log("Running");
app.use(signinUserRouter);
// app.use(activeUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);

// Business Account
// app.use(businessAccountCreate);
// app.use(businessAccountUpdate);
// app.use(businessAccountDelete);

// Transportation Account
// app.use(transportationAccountCreate);
// app.use(transportationAccountUpdate);
// app.use(transportationAccountDelete);

// Order Create
// app.use(orderCreate);

app.all('*', async (req, res) => {
    console.log("Auth app error handaler for all routers.");
    throw new NotFoundError();
});

// app.use(errorHandler);

export { app };
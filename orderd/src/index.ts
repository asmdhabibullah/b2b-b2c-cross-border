import { app } from './app';
import { connect } from "mongoose";

const dbConnect = async () => {
    try {
        const DB_URI = process.env.MONGO_URI || "mongodb://orderdb-srv:27017/orderdb";
        await connect(DB_URI);
        console.log("Order database connected successfully");
    } catch (error) {
        console.log(error);
    }
};

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Order app runing on http://localhost:${port}`);
});

dbConnect();

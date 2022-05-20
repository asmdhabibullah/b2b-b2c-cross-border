import { app } from './app';
import { connect } from "mongoose";

const dbConnect = async () => {
    try {
        const DB_URI = process.env.MONGO_URI || "mongodb://businessdb-srv:27017/businessdb";
        await connect(DB_URI);
        console.log("Business app database connected successfully");
    } catch (error) {
        console.log(error);
    }
};

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Business app runing on http://localhost:${port}`);
});

dbConnect();

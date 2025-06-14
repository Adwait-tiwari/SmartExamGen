import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_DB);
        console.log(`Connection created : ${con.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
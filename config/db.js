import mongoose from 'mongoose'

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_url);
        console.log(`Connected to MongoDB Database ${conn.connection.host}`);
    }
    catch(error){
    console.log(error);
}
};

export default connectDB;
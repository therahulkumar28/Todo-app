const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        console.log(process.env.port)
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
          
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(); // Exit the process with failure
    }
};
connectDB();

const todoSchema = mongoose.Schema({
    title : String,
    description : String ,
    completed : Boolean
})

const todo = mongoose.model('todos',todoSchema)
module.exports = {todo }
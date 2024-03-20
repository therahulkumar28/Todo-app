const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const { createTodo, updateTodo } = require('./types');
const {todo} = require('./db');
const app = express();
app.use(cors());

app.use(express.json());// parse the body to json body
//express.json  middleware

app.get('/',async function(req,res){
    const todos = await todo.find({}) ;
    
   res.json({
    todos
   })
})//show output to the user
app.delete('/todo/delete',async function(req,res){
    const todoId = await req.body;
    const parsetodoId = updateTodo.safeParse(todoId);
    if(!parsetodoId.success){
        res.status(403).json({
            msg:"todo id not found"
        })

    }
  
    const deletedTodo = await todo.findByIdAndDelete(todoId._id);

    if (!deletedTodo) {
        return res.status(404).json({
            msg: "Todo not found"

        });
    }

    res.json({
        msg: "Todo deleted successfully"
    });
})
app.post('/todos',async function(req,res){
   const createPayload = await req.body;
   const parsedPayload = createTodo.safeParse(createPayload);
   if(!parsedPayload.success){
        res.status(422).json({
            msg : "You have not entered string values"
        })
        return ;
   }
   await todo.create({
        title: createPayload.title,
        description:createPayload.description,
        completed:false
   })
    res.json({
        msg:"todo Created "
    })

})// getting user input using post request 

app.put('/completed',async function(req,res){ // marking todo which is completed
    try {
        const updatePayload = await req.body;
        
        const parsedPayload = updateTodo.safeParse(updatePayload);
       
        if (!parsedPayload.success) {
            res.status(422).json({
                msg: "You have not signed in"
            });
            return;
        }
    
        const result = await todo.updateOne(
            {_id : req.body._id},
            { completed: true }
        );
    
      
    
        res.json({
            msg: "Marked completed"
        });
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
    

})//marking todo as completed
app.listen(5000, function(req, res) {
    // Sending the response "Server is running" when a request is made
   console.log('Server is listening')
});
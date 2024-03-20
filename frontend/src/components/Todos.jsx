import { useState ,useEffect } from "react";

export function Todos({ todos }) {
    const [todosList, setTodosList] = useState();
    useEffect(() => {
      
        setTodosList(todos);
      }, [todos]);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const todoStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        maxWidth: '400px',
    };

    const buttonStyle = {
        padding: '8px',
        margin: '5px',
        cursor: 'pointer',
        background: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    };

    const handleMarkStatus = async (todo) => {
            console.log(todo._id);
        try {
            const response = await fetch("http://localhost:5000/completed/", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                 _id : todo._id
                }),
              });
             
            setTodosList((prevTodos) => {
                const updatedTodos = prevTodos.map((t) => {
                    if (t._id === todo._id) {
                        return { ...t, completed: true };
                    }
                    return t;
                });
                return updatedTodos;
            });
          
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };
    const deleteTodo = async (todo)=>{
        try{
            const response = await fetch("http://localhost:5000/todo/delete",{
                method : "DELETE" ,
            headers: {
                "Content-Type": "application/json",
              },

                body: JSON.stringify({
                    _id : todo._id 
                })
            })
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div style={containerStyle}>
            {todosList?.map((todo) => {
                console.log(todo);
                return (
                    <div key={todo._id} style={todoStyle}>
                        <h1>{todo.title}</h1>
                        <h2>{todo.description}</h2>
                        <button style={buttonStyle} onClick={() => handleMarkStatus(todo)}>
                            {todo.completed ? 'Completed' : 'Mark as completed'}
                        </button>
                        <button
                        style={ {  padding: '8px',
                        margin: '5px',
                        cursor: 'pointer',
                        background: 'dark red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',}}
                        onClick={
                           
                          ()=>{  deleteTodo(todo)}
                        }
                    >
                        Delete
                    </button>
                    </div>
                );
            })}
        </div>
    );
}

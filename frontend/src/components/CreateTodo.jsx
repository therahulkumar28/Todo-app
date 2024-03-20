import { useState } from "react";
export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTodo = async () =>{
        console.log(title);
        console.log(description)
        try{
            const response = await fetch(`http://localhost:5000/todos`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                 title : title,
                 description:description
                }),
              });
              
        }catch(err){
            console.log(err);
        }
       
    };
    const inputStyle = {

        marginBottom: '10px',
        padding: '8px',
        width: '300px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        padding: '10px',
        background: '#4CAF50',
        width: '315px',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' ,alignItems: 'center'}}>
            <input
                style={inputStyle}
                onChange={(e) => {
                    console.log(e.target.value);
                    setTitle(e.target.value);
                }}
                type="text"
                placeholder="Enter your title"
            />
            <input
                style={inputStyle}
                onChange={(e) => {
                    console.log(e.target.value);
                    setDescription(e.target.value);
                }}
                type="text"
                placeholder="Enter your description"
            />
            <button
                style={buttonStyle}
                onClick={
                   
                    addTodo
                }
            >
                Add a todo
            </button>
        </div>
    );
}

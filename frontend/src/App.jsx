import { useState ,useEffect} from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
function App() {
  const [todos , setTodos] = useState([]);
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Making a GET request to http://localhost:5000/
        const response = await fetch("http://localhost:5000/");
        
        // Extracting JSON data from the response
        const parsed = await response.json();
        

        // Updating state with the retrieved todos
        setTodos(parsed["todos"]);
      } catch (error) {
        // Handle errors, e.g., log the error or show a message to the user
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setTimeout(() => {
      fetchData();
  }, 1000);
  }, []); // Empty dependency array means this effect runs once when the component mounts

 
  return (
    <div>
      <CreateTodo />
    
      <Todos todos={todos}/>
    </div>
  );
}

export default App

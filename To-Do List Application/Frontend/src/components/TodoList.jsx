import { LuListTodo } from "react-icons/lu";
import TodoItems from "./TodoItems";
import { useState } from "react";

function TodoList() {
    const [task, setTask] = useState({
        name: "",
        isComplete: false
      });
      const [items, setItems] = useState([]);

      const handleChange = (e) => {
        setTask({
          ...task,
          [e.target.name]: e.target.value
        });
      };
      const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/items");
            if (!response.ok) throw new Error("Failed to fetch items");
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.name.trim()) {
          alert("Please enter a task.");
          return; 
        }
        try {
          const response = await fetch("http://localhost:5000/auth/task", { 
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              task: task.name,   
              complete: task.isComplete
            }) 
          });
      
          if (response.ok) {
            fetchItems();
          } else {
            alert("Failed to add task");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("There was an error processing your request.");
        }
      };
  return (
    <>
     <section className="font-poppins-font bg-white h-screen md:h-[600px] w-full md:w-1/3 md:rounded-xl p-7 flex flex-col">
                <div className="flex md:mt-7 gap-2">
                    <LuListTodo className="h-7 w-6 md:h-8 md:w-9"/>
                    <h2 className="text-black text-xl md:text-2xl font-semibold">To-Do List</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex justify-center mt-4 gap-2 mb-2">
                    <input className="text-black border-2 border-slate-400 rounded-md w-1/2 px-4" type="text" placeholder="Add your task" name="name" onChange={handleChange}/>
                    <button className="bg-[#0079FF] text-white w-32 h-12 rounded-xl cursor-pointer hover:bg-[#3AB0FF]" type="submit">Add</button>
                </form>
              
                <div className="md:h-[400px] h-screen overflow-y-auto">
                    <TodoItems items={items} fetchItems={fetchItems}/>
                </div>
      </section>
    </> 
  )
}

export default TodoList         
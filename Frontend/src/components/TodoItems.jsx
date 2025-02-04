import { TiTick } from "react-icons/ti";
import { HiX } from "react-icons/hi";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

function TodoItems({ items, fetchItems }) {
    const [isUpdateClicked, setIsUpdateClicked] = useState(null);
    const [updatedTask, setUpdatedTask] = useState("");

    useEffect(() => {
        fetchItems(); 
    }, []);

    const handleChange = (e) => {
        setUpdatedTask(e.target.value);
    };

    const toggleComplete = async (itemId) => {
        try {
            const response = await fetch(`https://to-do-list-3b2g.onrender.com/auth/iscomplete/${itemId}`, {
                method: "PUT",
            });

            if (!response.ok) throw new Error("Failed to update item");

            await fetchItems(); 
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`https://to-do-list-3b2g.onrender.com/auth/delete/${itemId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete item");

            await fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleUpdate = async (itemId) => {
        try {
            const response = await fetch(`https://to-do-list-3b2g.onrender.com/update/${itemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: updatedTask }),
            });

            if (!response.ok) throw new Error("Failed to update task");

            setIsUpdateClicked(null); 
            setUpdatedTask(""); 
            await fetchItems(); 
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <>
            <section>
                <div className="flex flex-col items-center cursor-pointer m-6 md:m-8 ">
                    {items.map((item, index) => (
                        <div key={item._id} className="flex flex-1 items-center justify-between w-full mb-4">
                            {item.complete ? (
                                <>
                                    {isUpdateClicked === index ? (
                                        <div className="flex items-center gap-2">
                                        <input
                                            className="text-black border-2 border-slate-400 rounded-md h-8 md:h-9 max-w-[170px] md:min-w-[220px] px-2 md:px-4"
                                            type="text"
                                            placeholder="Write your task"
                                            value={updatedTask}
                                            onChange={handleChange}
                                        />
                                        <button className="border bg-slate-300 rounded-md  p-1 px-1 md:px-2 ml-1 md:ml-4" onClick={() => handleUpdate(item._id)} >Update</button>
                                        <button className="border bg-slate-300 rounded-md  p-1 px-1 md:px-2"onClick={()=>setIsUpdateClicked(!isUpdateClicked)}>Cancel</button>
                                    </div>
                                    ) : (
                                        <>
                                            <TiTick className="min-h-6 min-w-7" onClick={() => toggleComplete(item._id)} />
                                            <div className="flex w-full">
                                                <p className="text-slate-700 ml-4 line-through max-w-[150px] md:max-w-[250px] break-words">{item.task}</p>
                                            </div>
                                            <div className="flex gap-2">
                                <PiNotePencilBold
                                    className="h-6 w-7 cursor-pointer"
                                    onClick={() => {
                                        setIsUpdateClicked(isUpdateClicked === index ? null : index); 
                                        setUpdatedTask(item.task);
                                    }}
                                />
                                <MdDelete
                                    className="h-6 w-7 cursor-pointer"
                                    onClick={() => deleteItem(item._id)}
                                />
                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {isUpdateClicked === index ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                className="text-black border-2 border-slate-400 rounded-md h-8 md:h-9 max-w-[170px] md:min-w-[220px] px-2 md:px-4"
                                                type="text"
                                                placeholder="Write your task"
                                                value={updatedTask}
                                                onChange={handleChange}
                                            />
                                            <button className="border bg-slate-300 rounded-md  p-1 px-1 md:px-2 ml-1 md:ml-4" onClick={() => handleUpdate(item._id)} >Update</button>
                                            <button className="border bg-slate-300 rounded-md  p-1 px-1 md:px-2"onClick={()=>setIsUpdateClicked(!isUpdateClicked)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <>
                                            <HiX className="min-h-6 min-w-7" onClick={() => toggleComplete(item._id)} />
                                            <div className="flex w-full">
                                                <p className="text-slate-700 ml-4 max-w-[180px] md:max-w-[250px] break-words">{item.task}</p>
                                            </div>
                                            <div className="flex gap-2">
                                <PiNotePencilBold
                                    className="h-6 w-7 cursor-pointer"
                                    onClick={() => {
                                        setIsUpdateClicked(isUpdateClicked === index ? null : index); 
                                        setUpdatedTask(item.task);
                                    }}
                                />
                                <MdDelete
                                    className="h-6 w-7 cursor-pointer"
                                    onClick={() => deleteItem(item._id)}
                                />
                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default TodoItems;

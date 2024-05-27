import { useState } from "react"
import "/src/components/ToDoList/ToDoList.css"
import ToDoItem from "./ToDoItem";
const regex = {
    noWhiteSpace: /^(?!\s+$).+/,
};

const ToDoListComponent = () => {
    const [toDoList, setToDoList] = useState([])

    const addNewToDo = (e) => {
        if(e.key === "Enter" && regex.noWhiteSpace.test(e.target.value)) {
            const newToDo = {
                idO: e.target.value + toDoList.length,
                contentO: e.target.value,
                isCompletedO: false,
                dateO: new Date().getDate()
            }
            setToDoList((prevToDoList) => [...prevToDoList, newToDo])
            e.target.value = ""
        }
    }

    

    return (
        <>
        <section className="primary-container">
            <input type="text" placeholder="Create a new task!" onKeyUp={addNewToDo}/>
            {toDoList.map(toDo => <ToDoItem id={toDo.idO} key={toDo.idO} content={toDo.contentO}/>)}
        </section>
        </>
    )
}

export default ToDoListComponent
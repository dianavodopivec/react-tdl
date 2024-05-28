import { useEffect, useState } from "react";
import "/src/components/ToDoList/ToDoList.css";
import ToDoItem from "./ToDoItem";
const regex = {
  noWhiteSpace: /^(?!\s+$).+/,
};

const ToDoContent = () => {
  const [toDoList, setToDoList] = useState(
    JSON.parse(localStorage.getItem("toDoListStorage")) || []
  );

  useEffect(() => {
    localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
  }, [toDoList]);

  const addNewToDo = (e) => {
    if (e.key === "Enter" && regex.noWhiteSpace.test(e.target.value)) {
      const newToDo = {
        idX: e.target.value + toDoList.length,
        contentX: e.target.value,
        isCompletedX: false,
        dateX: new Date().getDate(),
      };
      setToDoList((prevState) => [...prevState, newToDo]);
      e.target.value = "";
      //console.log(newToDo)
    }
  };

  const deleteToDo = (e) => {
    const idToDelete = e.target.id;
    const updatedToDoList = toDoList.filter((toDo) => toDo.idX !== idToDelete);
    setToDoList(updatedToDoList);
  };

  return (
    <>
      <section className="primary-container">
        <input
          type="text"
          placeholder="Add New To-Do!"
          onKeyDown={addNewToDo}
        />
        {toDoList.length > 0 ? (
          toDoList.map((toDoList) => (
            <ToDoItem
              id={toDoList.idX}
              key={toDoList.idX}
              date={toDoList.dateX}
              content={toDoList.contentX}
              deleteActions={deleteToDo}
            />
          ))
        ) : (
          <p style={{ backgroundColor: "white", padding: "10px" }}>
            Congratulations all completed!
          </p>
        )}
      </section>
    </>
  );
};

export default ToDoContent;

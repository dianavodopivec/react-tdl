import { useEffect, useRef, useState } from "react";
import "/src/components/ToDoList/ToDoList.css";
import ToDoItem from "./ToDoItem";
const regex = {
  noWhiteSpace: /^(?!\s+$).+/,
};

const ToDoContent = () => {
  const [toDoList, setToDoList] = useState(
    JSON.parse(localStorage.getItem("toDoListStorage")) || []
  );
  const [modalState, setModalState] = useState(false);
  const [sortOrder, setSortOrder] = useState(
    JSON.parse(localStorage.getItem("memorySort")) || false
  );
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
  }, [toDoList]);

  useEffect(() => {
    localStorage.setItem("memorySort", JSON.stringify(sortOrder));
  }, [sortOrder]);

  const inputEdit = useRef();

  const modalStyle = modalState ? "modal-open" : "modal-close";
  const buttonText = sortOrder ? "ORDER A-z" : "ORDER Z-a";

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

  const modalChanges = () => {
    setModalState(!modalState);
    setTimeout(() => {
      inputEdit.current.value = "";
    },500);
  };

  const editToDo = (e) => {
    const idToEdit = e.target.id;
    setEditId(idToEdit);
    modalChanges();
  };

  const confirmChanges = () => {
    if (!regex.noWhiteSpace.test(inputEdit.current.value)) return;
    const toDoListCopy = [...toDoList];
    toDoListCopy.forEach((toDo) => {
      if (toDo.idX === editId) {
        toDo.idX = inputEdit.current.value + toDoList.length;
        toDo.contentX = inputEdit.current.value;
        toDo.isCompletedX = false;
        toDo.dateX = new Date().getDate();
        if (!regex.noWhiteSpace.test(inputEdit.current.value)) return;
      }
      setToDoList(toDoListCopy);
      modalChanges();
    });
  };

  const deleteAllToDo = () => {
    setToDoList([]);
  };

  const orderAllTodo = () => {
    const orderedArray = [...toDoList];
    sortOrder
      ? orderedArray.sort((a, b) => a.contentX.localeCompare(b.contentX))
      : orderedArray.sort((a, b) => b.contentX.localeCompare(a.contentX));
    setSortOrder(!sortOrder);
    setToDoList(orderedArray);
  };

  return (
    <>
      <button
        onClick={deleteAllToDo}
        style={{ backgroundColor: "red", color: "white" }}
      >
        DELETE ALL
      </button>
      <button
        onClick={orderAllTodo}
        style={{ backgroundColor: "orange", color: "white" }}
      >
        {buttonText}
      </button>
      <section className="primary-container">
        <div className={`modal ${modalStyle}`}>
          <input
            ref={inputEdit}
            type="text"
            placeholder={`EDITING TODO: ${editId}`}
          />
          <button onClick={modalChanges}>CLOSE</button>
          <button onClick={confirmChanges}>CONFIRM CHANGES</button>
        </div>
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
              editActions={editToDo}
            />
          ))
        ) : (
          <p
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "15px",
              fontStyle: "italic",
            }}
          >
            Congratulations all completed! 🥳
          </p>
        )}
      </section>
    </>
  );
};

export default ToDoContent;

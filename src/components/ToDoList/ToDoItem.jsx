const ToDoItem = ({content, id, date, deleteActions, editActions,}) => {
    return(
        <section id={id} key={id}>
        <article>
            <p>{content}</p>
            <div className="container-buttons">
                <button id={id} onClick={editActions}>
                    <img className={"svg-edit"} src="src/assets/edit.svg" alt="edit-svg" />
                </button>
                <button id={id} onClick={deleteActions}>
                    <img className={"svg-delete"} src="src/assets/delete.svg" alt="delete-svg" />
                </button>
                <p>{date}</p>
            </div>
        </article>
        <div className="drop-down">{content}</div>
        </section>
    )
}

export default ToDoItem
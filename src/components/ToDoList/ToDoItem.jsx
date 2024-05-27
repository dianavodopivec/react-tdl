const ToDoItem = ({content, id, isEditing, isDeleted}) => {
    return(
        <section id={id} key={id}>
        <article>
            <p>{content}</p>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </article>
        <div className="drop-down">{content}</div>
        </section>
    )
}

export default ToDoItem
import TaskCard from "./TaskCard";

export default function Status({ status, tasks, editTask, changeTaskStatus }) {
  function drop(e) {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("task_id");
    const card = document.getElementById(card_id);
    card.style.display = "block";

    e.target.appendChild(card);
    changeTaskStatus(card_id, status._id);
  }

  function dragOver(e) {
    e.preventDefault();
  }


  return (
    <div className="col m-2 p-0 border min-vh-100 bg-secondary" onDrop={drop} onDragOver={dragOver}>
      <div className="heading py-2 border bg-dark text-light">
        {status.title}
      </div>
      <div className="tasks">
        {
          (tasks.length !== 0) ? (tasks.map((task, index) => (
            <TaskCard key={index} task={task} editTask={editTask} />
          ))) : (<h1>No Task </h1>)
        }
      </div>
    </div>
  );
}

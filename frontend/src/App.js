import { useEffect, useState } from "react";
import "./App.css";
import Status from "./component/Status";
import TaskForm from "./component/TaskForm";
import { fetchData, fetchTask, updateTaskStatus, updateStatus } from "./functionality/fetchFromServer";

function App() {
  const [taskStatus, loadStatus] = useState([{}]);
  const [pageStatus, changeStatus] = useState("loading");
  const [display, changeDisplay] = useState("none");
  const [tasks, changeTask] = useState([]);

  useEffect(() => {
    changeStatus("loading");
    fetchData().then((result) => {
      loadStatus(result);

    }).catch((err) => {
      changeStatus("error");
    });

    fetchTask().then((result) => {
      changeTask(result);
    }).catch((err) => {
      changeStatus("error");
    }).finally(() => {
      changeStatus("done")
    });
  }, []);

  const changeVisibility = () => {
    if (display === "none") {
      changeDisplay("flex");
    } else {
      changeDisplay("none");
    }
  }

  const changeTaskStatus = async (taskid, statusId) => {
    let newTaskArray = tasks;

    newTaskArray.forEach(task => {
      if (task._id == taskid) {
        task.statusId = statusId;
      }
    });

    let result = await updateTaskStatus(taskid, statusId);
    changeTask(newTaskArray);
  }

  function addTask(task) {
    changeTask([...tasks, task]);
  }

  if (pageStatus === "loading") {
    return <div>Loading ...</div>
  }

  if (pageStatus === "error") {
    return <div>Error</div>
  }

  function editTask() {
    changeVisibility();
  }

  const addStatus = async () => {
    let statusName = prompt("Enter Status Name");
    if (statusName && statusName != "") {
      let response = await updateStatus(statusName);
      loadStatus([...taskStatus, response])

    }
  }

  return (
    <>
      <div className="App container p-1">
        <div className="btns gap-5 m-3 d-flex flex-row-reverse">
          <button className="btn btn-primary" onClick={changeVisibility}>Add Task</button>
          <button className="btn btn-primary" onClick={addStatus}>Add Status</button>
        </div>

        <div className="row p-0 min-vh-100">
          {
            taskStatus.map((tstatus, index) => (
              <Status key={index} status={tstatus} changeTaskStatus={changeTaskStatus} tasks={tasks.filter(task => task.statusId === tstatus._id)} editTask={editTask} />
            ))
          }
        </div>
      </div >

      <div className="pop-up" style={{ "display": display }} >
        <TaskForm taskStatus={taskStatus} addTask={addTask} hide={changeVisibility} />
      </div >
    </>
  );
}

export default App;

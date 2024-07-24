import React, { useState } from "react";

export default function TaskForm({ taskStatus, addTask, hide }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function insertTask() {
    if (document.querySelector("title").value === "") {
      alert("Title is requered");
    } else {
      try {
        let response = await fetch("http://localhost:3001/api/inserttask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            desc: desc,
            statusId: document.querySelector("#taskStatus").value,
          }),
        });
        let result = await response.json();

        addTask({
          title: title,
          desc: desc,
          statusId: document.querySelector("#taskStatus").value,
        });
        hide();
      } catch (error) {
        console.error(error);
      }
    }
  }


  return (
    <>
      <div className="form p-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Task Title</label>
          <input type="email" className="form-control" id="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Task Description</label>
          <textarea className="form-control" id="desc" rows="3" onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
        </div>
        <select className="mb-3 form-select w-3" aria-label="Default" id="taskStatus">
          {
            taskStatus.map((tstatus, index) =>
            (
              <option key={index} value={tstatus._id} >{tstatus.title}</option>
            )
            )
          }
        </select >
        <div className="mb-3">
          <button type="submit" className="btn btn-primary px-5" onClick={insertTask}>Add</button>
          <button type="submit" className="btn btn-danger mx-3" onClick={hide}>Cancel</button>
        </div>
      </div>

    </>
  );
}

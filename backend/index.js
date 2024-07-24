import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { taskConnect, insertTask, getTasks, updateTaskStatus } from './taskconnect.js';
import { statusConnect, insertStatus, getStatus, addStatus } from './statusConnect.js';

const app = express();
const port = 3001;
const taskModel = await taskConnect();
const statusModel = await statusConnect();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/inserttask", (req, res) => {
    const task = new taskModel({
        title: req.body.title,
        desc: req.body.desc,
        statusId: req.body.statusId
    });

    try {
        insertTask(task);
        res.json({ type: "OK" })
    } catch (error) {
        res.json(error)
    }

});

app.post("/api/gettask", async (req, res) => {
    let result;
    if (req.query.id) {
        result = await getTasks(taskModel, req.query.id);
    } else {
        result = await getTasks(taskModel, "")
    }
    res.send(result);
});


app.post("/api/updatetaskstatus", (req, res) => {
    const taskid = req.body.taskid;
    const statusid = req.body.status;
    res.json(updateTaskStatus(taskModel, taskid, statusid));
});

// APIs for status
app.post("/api/insertstatus", (req, res) => {
    const taskstatus = new statusModel({
        title: "In progress",
        desc: "Task has to be done"
    });

    res.send(insertStatus(taskstatus));
});

app.post("/api/getStatus", async (req, res) => {
    res.header("Content-Type", "application/json");
    let status = await getStatus(statusModel);
    res.json(status);
});

app.post("/api/updatestatus", async (req, res) => {
    let status = new statusModel({
        title: req.body.statusName,
        desc: ""
    });

    let response = await addStatus(status);
    res.json(response);
});

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})
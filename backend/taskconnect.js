import mongoose from 'mongoose';

async function taskConnect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/taskManagement");
    } catch (error) {
        console.log(error);
    }

    const taskSchema = new mongoose.Schema({
        title: String,
        desc: String,
        statusId: mongoose.Schema.Types.ObjectId
    });
    delete mongoose.connection.models['Todo'];

    return mongoose.model("todo", taskSchema);
}

function insertTask(task) {
    task.save().then(() => {
        return "ok";
    }).catch((err) => {
        return err;
    });
}

const getTasks = async (model, query) => {
    if (query !== "") {
        try {
            return await model.find({ statusId: query });
        } catch (error) {
            return error;
        }
    } else {
        try {
            return await model.find();
        } catch (error) {
            return error;
        }
    }
}

const updateTaskStatus = async (model, taskid, statusid) => {
    try {
        let result = await model.updateOne({ _id: taskid }, { $set: { statusId: statusid } });
        return result;
    } catch (err) {
        console.log(err);
    }
}

export { taskConnect, insertTask, getTasks, updateTaskStatus };
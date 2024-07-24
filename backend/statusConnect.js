import mongoose from 'mongoose';

async function statusConnect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/taskManagement");
    } catch (error) {
        console.log(error);
    }

    const statusSchema = new mongoose.Schema({
        title: String,
        desc: String
    });

    return mongoose.model("status", statusSchema);
}

function insertStatus(status) {
    status.save().then(() => {
        console.log("Successfull!!");
    }).catch((err) => {
        console.log(err);
    });
}

const getStatus = async (model) => {
    let status = await model.find()
    return status;
}

const addStatus = async (status) => {
    let newStatus = await status.save();
    return newStatus;
}

export { statusConnect, insertStatus, getStatus, addStatus };
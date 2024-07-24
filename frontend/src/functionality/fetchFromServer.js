const fetchData = async () => {
    try {
        let response = await fetch("http://localhost:3001/api/getStatus", { method: "POST" });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let result = await response.json();
        return result;
    } catch {
        console.log("Something went wrong");
    }
};

const updateStatus = async (statusName) => {
    try {
        let response = await fetch("http://localhost:3001/api/updatestatus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            "body": JSON.stringify({ "statusName": statusName })
        })
        let result = await response.json();
        return result;
    } catch (err) {
        return err;
    }
}

const fetchTask = async () => {
    let response = await fetch("http://localhost:3001/api/gettask", { method: "POST" });
    let result = await response.json();
    return result;
}

const updateTaskStatus = async (taskid, statusid) => {
    let response = await fetch("http://localhost:3001/api/updatetaskstatus", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "taskid": taskid,
            "status": statusid
        })
    });
    let result = await response.json();
    return result;
}


export { fetchData, fetchTask, updateTaskStatus, updateStatus };

const failedProcess = (res, e) => {
    console.log(e, "Error")
    return res.status(500).json({ "message": "FAILED FOR SOME REASON", error: e });
}

module.exports = {
    failedProcess
}
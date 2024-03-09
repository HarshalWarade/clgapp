const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500
    const msg = err.msg || "Server Error"
    const extraDetails = err.extraDetails || "Server extra errors"


    return res.status(status).json({msg, extraDetails})

}



module.exports = errorMiddleware
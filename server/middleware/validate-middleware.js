

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (error) {
        const status = 422
        const msg = "Fill the inputs properly!"
        const extraDetails = error.errors[0].message
        console.log(msg)
        console.log("Error in validate-middleware.js: ", error)
        const errorRet = {
            status,
            msg,
            extraDetails
        }
        console.log(errorRet)
        next(errorRet)
        // return res.status(500).json({msg: "Internal Server Error!"})
    }
}


module.exports = validate

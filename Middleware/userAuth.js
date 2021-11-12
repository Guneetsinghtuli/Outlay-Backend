var jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY

const authorise = async (req, res, next) => {
    const success = false
    const id = req.header('authtoken')
    if (!id) {
        return res.status(401).send({ success,message: "You are not authorised" })
    }
    try {
        const decode = jwt.verify(id, privateKey)
        req.user= decode.id
        next()
    } catch (err) {
        res.status(401).send({ success,message: "Problem with token" })
    }

}

module.exports = authorise
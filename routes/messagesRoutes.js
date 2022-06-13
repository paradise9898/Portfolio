const Router = require('express')
const router = Router()
const controller = require("../controllers/messagesController")

router.post('/message', controller.send)

module.exports = router

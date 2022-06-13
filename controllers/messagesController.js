const messages = require('../models/messages')

class Messages {
    async send (req, res, next) {
        try {
            const {Name, Email, Message} = req.body
            const Messages = new messages ({Name, Email, Message})
            await Messages.save()
            return res.json({message:"sent"})

        } catch (error) {
            console.log(error);
        }
    }



}

module.exports = new Messages();
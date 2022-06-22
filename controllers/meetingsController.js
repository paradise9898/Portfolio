const meetings = require('../models/meetings')

class Meetings {
    async booking(req, res, next) {
    try {
        const {date, time, message} = req.body
        const Meetings = new meetings ({date, time, message})
        await Meetings.save()
        return res.json({message: 'success'})

    } catch (error) {
        console.log(error);
    }
    }
}

module.exports = new Meetings();
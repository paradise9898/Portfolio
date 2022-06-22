const meetings = require('../models/meetings')

class Meetings {
    async booking(req, res){
    try {
        const {date, time} = req.body
        const Meetings = new meetings ({date, time})
        await Meetings.save()
        return res.json({message: 'success'})

    } catch (error) {
        console.log(error);
    }
    }
}

module.exports = new Meetings();
const express = require('express')
const res = require('express/lib/response')
const app = express()
const mongoose = require('mongoose')
const xhr2 = require('xhr2')
const PORT = process.env.PORT || 3333
const path = require('path')



//encoding
app.use(express.json())
app.use(express.json({extended: true}))
app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.use(express(__dirname + '/views'))
app.use("/public", express.static(path.join(__dirname, 'public')));



//routes
app.get('/', (req, res) => {
    res.render('index')
})


app.get('/a' , (req, res) => {
    res.render('maintenence')
})



app.post('/sch', (req, res) => {
    res.redirect('/thanks')
})




app.get('/thanks', (req, res) => {
    res.render('maintenance')
})
//launch
async function launch(){
    try {
        await mongoose.connect('mongodb+srv://Portfolio:portfolio9@portfoliobase.adlmq.mongodb.net/?retryWrites=true&w=majority')
    } catch (error) {
        console.log(error);
    }
}

launch()
app.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}`);
})
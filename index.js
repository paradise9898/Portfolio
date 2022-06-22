const express = require('express')
const res = require('express/lib/response')
const app = express()
const MessagesRouter = require('./routes/messagesRoutes')
const MeetingsRoutes = require('./routes/meetingsRoutes')
const mongoose = require('mongoose')
const XMLHttpRequest = require('xhr2')
const PORT = process.env.PORT || 3333
const path = require('path')


//encoding
app.use(express.json())
app.use(express.json({extended: true}))
app.use(express.urlencoded())
app.set('view engine', 'pug')
app.use(express(__dirname + '/views'))
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/sendmessage', MessagesRouter)
app.use('/api', MeetingsRoutes)
//routes
app.get('/', (req, res) => {
    res.render('index')
})


app.get('/a' , (req, res) => {
    res.render('schedule')
})






app.post('/sendmessage', async (req, res) => {
    res.send('your message has been sent')

    const formData  = JSON.stringify( req.body);
    console.log(formData);
    const  http = new XMLHttpRequest();
    const  url = "https://rj-personal-website.herokuapp.com/sendmessage/message"
    const  method = "POST";
    const  data = formData

    http.open(method, url,);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function(){
      if (http.readyState === XMLHttpRequest.DONE && http.status === 201){
        console.log(JSON.parse(http.responseText));
      }
    }

    http.send(data);
})


app.post('/api', async (req, res) => {
    const formData  = JSON.stringify( req.body);
    console.log(formData);
    const  http = new XMLHttpRequest();
    const  url = "https://rj-personal-website.herokuapp.com/api/meetings"
    const  method = "POST";
    const  data = formData

    http.open(method, url,);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function(){
      if (http.readyState === XMLHttpRequest.DONE && http.status === 201){
        console.log(JSON.parse(http.responseText));
      }
    }

    http.send(data);

    res.redirect('/thanks')
})



app.get('/thanks', (req, res)=>{
  res.render('thanks')
})
//launch
async function launch(){
    try {
        await mongoose.connect('mongodb+srv://rj98:rj9898@scheduleandmessages.ujfyg.mongodb.net/?retryWrites=true&w=majority')
    } catch (error) {
        console.log(error);
    }
}

launch()
app.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}`);
})
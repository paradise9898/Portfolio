const express = require('express')
const res = require('express/lib/response')
const app = express()
const MessagesRouter = require('./routes/messagesRoutes')
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




app.post('/sendmessage', async (req, res) => {
    res.send('your message has been sent')

    const formData  = JSON.stringify( req.body);
    console.log(formData);
    const  http = new XMLHttpRequest();
    const  url = "http://localhost:3333/sendmessage/message"
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

//-   form#ajax-contact(method='post' action='/sendmessage')
          //- .form-group.has-feedback.wow.fadeInLeft(data-wow-delay='0.6s')
          //-   input#Name(type='text' name='name' placeholder='NAME' data-error="Field can't be blank!" required='')
           
          //- .form-group.has-feedback.wow.fadeInRight(data-wow-delay='0.8s')
          //-   input#Email(type='email' name='email' placeholder='EMAIL' data-error="Field can't be blank!" required='')
          //-   span.glyphicon.form-control-feedback(aria-hidden='true')
          //-   .help-block.with-errors
          //- .form-group.has-feedback.wow.fadeInLeft(data-wow-delay='1s')
          //-   textarea#Message form-control(data-minlength='10' name='message' placeholder='MESSAGE' data-error='Minimum of 10 characters' required='')
          //-   span.glyphicon.form-control-feedback(aria-hidden='true')
          //-   .help-block.with-errors
          //- .hidden
          //-   input#human.form-control(type='text' placeholder='')
          //- .wow.fadeInUp(data-wow-delay='1s')
          //-   button#submit.btn.btn-lg(type='submit' name='submit') SEND MESSAGE
          //-   br
          //-   br
          //- br


//launch
async function launch(){
    try {
        await mongoose.connect('mongodb+srv://SendMessage:SendMessage@sendmessage.vlb90.mongodb.net/?retryWrites=true&w=majority')
    } catch (error) {
        console.log(error);
    }
}

launch()
app.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}`);
})
const express= require('express')
const app=express();
const fs=require('fs')
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extends:false}))

app.get('/login',(req,res,next)=>{
    res.send("<form method='POST' onsubmit='localStorage.setItem(`username`, document.getElementById(`username`).value)' action='/chats-data'><input name='user' type='text' id='username' placeholder='Inter Your Name'></input><button type='submit'>submit</button></form>")
})

app.post('/chats-data', (req,res,next)=>{
    res.redirect('/chat')
})
app.post('/chats-data2', (req,res,next)=>{
    console.log(req.body)
    fs.writeFile('chats.txt',`${req.body.username}:${req.body.message}`,{flag:'a'}, (err) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Internal Server Error');
          return;
        }
    })
    res.redirect('/chat')
})

app.get('/chat',(req,res,next)=>{
    fs.readFile('chats.txt', 'utf8', (err, data) => { 
      if(err){
        data=err
      }
      res.send(`${data}<form method='POST' onsubmit=\"document.getElementById('username').value=localStorage.getItem('username');\" action='/chats-data2'><input name='message' type='text' id='message' placeholder='Enter Your Message'></input><input type='hidden' name='username' id='username'></input><button type='submit'>Submit</button></form>`);

    })
          

})

app.listen(4000,(req,res)=>{
    console.log("Listening on port 4000")
})
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

const app = express()
app.use(cors())

function INSERT_USER_IN_QUEUE(userid, interest) {
    return `INSERT INTO userqueue VALUE('${userid}','${interest}')`
}


function createPair() {
    connection.query((`SELECT u1.* FROM userqueue u1, userqueue u2 WHERE u1.interest = u2.interest LIMIT 2;`), (err, results) => {
        if (err) {
            // console.log(err, "pairerror")
        }
        else {
            //    console.log(results[0].interest,"pairresults")
            if (results.length == 2) {
                connection.query((`INSERT INTO pairs(user1,user2,interest) VALUES('${results[0].userid}','${results[1].userid}','${results[0].interest}')`))
                connection.query((`DELETE FROM userqueue WHERE userid='${results[0].userid}'`))
                connection.query((`DELETE FROM userqueue WHERE userid='${results[1].userid}'`))
                connection.query((`CREATE TABLE room${results[0].userid}${results[1].userid}(senderid varchar(10),receiverid varchar(10),message varchar(1000))`))
                console.log("enogh")
            }
            else {
                console.log("not enough users")
            }
        }
    })
}



// host:'35.224.113.38',
// user:'root',
// password:'bilalkhan',
// database:'chatberg'


const connection = mysql.createConnection({
    host:'34.66.149.111',
    user:'root',
    password:'bilalkhan',
    database:'chatberg'
})

connection.connect(err => {
    if (err) {
        console.log(err, "error connecting")
    }
    else {
        console.log("connected to db")
    }
})

console.log(connection, "connection")

app.get('/', (req, res) => {
    res.send("Bilal")
})

app.get('/insertinqueue', (req, res) => {
    const { userid, interest } = req.query
    if(userid!==undefined){
    connection.query(INSERT_USER_IN_QUEUE(userid, interest), (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send("success")
        }
    })
}
})

app.get('/searchforpartner',(req,res)=>{
    const {userid} = req.query
    connection.query((`SELECT * FROM pairs WHERE user1='${userid}' OR user2='${userid}'`),(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            if(results.length>0){
                console.log(results,"result aagya")
                res.send(results)
            }

        }
    })
})



app.get('/getmessages',(req,res)=>{
    const {roomname} = req.query
    connection.query((`SELECT * FROM ${roomname}`),(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
                return res.send(results)

           
        }
    })
})




app.get('/sendmessage',(req,res)=>{
    const {senderid,receiverid,message,roomname} = req.query
    connection.query((`INSERT INTO ${roomname}(senderid,receiverid,message) VALUES('${senderid}','${receiverid}','${message}')`),(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send("success")
        }
    })
})

app.get('/endchat',(req,res)=>{
    const {userid,roomname} = req.query
    connection.query((`DELETE FROM pairs WHERE user1='${userid}' OR user2='${userid}'`))
    connection.query((`DROP TABLE ${roomname}`))
})

app.get('/setstatus',(req,res)=>{
    const{id} = req.query
})


setInterval(() => {
    createPair();
}, 2000);


app.listen(5000, () => {
    console.log("Serving on 5000");
   
})
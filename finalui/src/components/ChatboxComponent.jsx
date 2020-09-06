import React, { useEffect } from 'react';
import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component';
import { Button , Modal, ModalHeader, ModalBody,Card,CardBody, NavLink } from 'reactstrap';
import img from '../images/feedbacks/acm.jpg';
import "../App.css";
import { Link } from 'react-router-dom';
import { id8 } from '@jsweb/randkey'
import { useHistory } from "react-router-dom";

export default function Chat(){


const [state,setState] = React.useState({
    isChatOpen:true
})
const [searching,setSearching] = React.useState(true)
const [receiverID,setReceiverID] = React.useState("")
const [roomname,setRoomname] = React.useState("")
const [timeout,settime] = React.useState(false)
const [messages,setMessages] = React.useState([])
const [message,setMessage] = React.useState("")
const [userid,setUserId] = React.useState(id8())
const [messageInterval,setMessageInterval] = React.useState(setInterval(() => {}, 1000))
const history = useHistory();
const [sending,setSending] = React.useState(false);


function handleMessageChange(event){
setMessage(event.target.value)
}




function searchForPartner(interval){
    var roomnamees=""
    var prev_ID = 0
    console.log("searching")
    fetch(`http://localhost:5000/searchforpartner?userid=${userid}`)
    .then(response => response.json())
    .then(data => {console.log(data);
        if(data[0]){
      var roomnames = `room${data[0].user1}${data[0].user2}`
      console.log(roomnames,"roomnamefromfetch")
      
      if(data[0].user1!==userid){
          setReceiverID(data[0].user1)
      }
      else{
        setReceiverID(data[0].user2)
      }
    }
      setRoomname(roomnames)
      roomnamees=roomnames
      clearInterval(interval)
      setSearching(false)
}).then(()=>{
    var messageInterval = setInterval(() => {
        if(!sending){
        fetch(`http://localhost:5000/getmessages?roomname=${roomnamees}`)
        .then(response => response.json())
        .then((data,err) => {
            if(data.code){
                if(data.code=="ER_NO_SUCH_TABLE"){
                    clearInterval(messageInterval)
                    localStorage.setItem("reload","true")
                    history.push("/home")
                }
            }
            setState({searching:false})
            // if (data[0] && data[0].id > prev_ID){
            //     var allMessages = messages
            //     allMessages.push(data[0])
            //     setMessages(allMessages)
            //     console.log(messages,"all messages")
            //     prev_ID = data[0].id
            //   }
            //   else{
            //     console.log("Old message") 
            //   }
            setMessages(data)
            }

        )
    }  
    }, 2000)
})
   }




 

        function sendMessage(e){
            setSending(true)
            var msgform = document.getElementById("msgform")
            msgform.reset()
            e.preventDefault()
            console.log(userid,"userds")
            fetch(`http://localhost:5000/sendmessage?senderid=${userid}&receiverid=${receiverID}&message=${message}&roomname=${roomname}`)
            .then(response => response.text())
            .then(data => {console.log(data,"messagesend");setSending(false)})
        }

        function endChat(e){
            setSending(true)
            clearInterval(messageInterval)
            fetch(`http://localhost:5000/endchat?userid=${userid}&roomname=${roomname}`).then(()=>{
                localStorage.setItem("reload","true")
                history.push("/home")
               })

        }

useEffect(()=>{
    var interest = localStorage.getItem("interest")
    var timesRun = 0 
    fetch(`http://localhost:5000/insertinqueue?userid=${userid}&interest=${interest}`)
    .then(()=>{
        var interval = setInterval(() => {
            timesRun += 1;
           
            if(timesRun == 30){
                settime(true)
                clearInterval(interval);
                setTimeout(() => {
                    localStorage.setItem("reload","true")
                    history.push("/home") 
                }, 3000);
            }
            else{
                searchForPartner(interval)
            }
        }, 1000);
        return () => clearInterval(interval);  
})


    


    
},[])




        return (
            <>
{timeout ? <div>
    <center><div className="loading-screen">
               <img src="timeout.png" className="timeout-icon"/>
               <h1 className="searching">Sorry, We Couldn't Find Anyone
               , Try Again</h1>
           </div>
           </center>
</div>
:<div>
           {searching ? <center><div className="loading-screen">
               <img src="Logo-1.png" className="logo-load"/>
               <h1 className="searching">Searching For Someone</h1>
           </div>
           </center>
           :<div className="mainchat">
          


<div className="chatbox">

{messages && messages.map((v,i)=>{
                
                return(
                    <>
                    {v.senderid==userid ? 
                    <div key={i} className="bubbleWrapper">
                    <div key={i} className="inlineContainer own">
                        <div key={i} className="ownBubble own">
                        {v.message}
                        </div>
                    </div>
                </div> :
                    <div key={i} className="bubbleWrapper">
                    <div key={i} className="inlineContainer">
                        <div key={i} className="otherBubble other">
                           {v.message}
                        </div>
                    </div>
                </div>}
                    </>
                )
                }
        )}

    </div>

    <form id="msgform" onSubmit={(e)=>{sendMessage(e)}} className="msger-inputarea row">
    <input type="button" onClick={()=>endChat()} className="msger-end-btn" value="End Chat"/>
    <input type="text" className="msger-input" onChange={(e)=>handleMessageChange(e)} placeholder="Enter your message..."/>
    <button type="submit" className="msger-send-btn">Send</button>
  </form>

      
 

               
           </div>}
           </div>}
           </>
        );

}



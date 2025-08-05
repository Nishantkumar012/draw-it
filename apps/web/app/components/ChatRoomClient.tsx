"use client"

import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";


export function ChatRoomClient({
    messages,
    id
}: {
      messages: {message: string}[];
      id: string
}){
      
      const [chats,setChats] = useState(messages);
      const [currentMessage, setCurrentMessage] = useState('')
      const {socket,loading} = useSocket();

      useEffect(()=>{
                 
        //    if(loading){
        //        return
        //    }
        //      if(!socket){
        //           alert("socket hi nhi h")
        //           console.log("Socket not available");
        // return;
        //      }
            if(socket && !loading){

               socket.send(JSON.stringify({
                     type:"join_room",
                     roomId:id
               }));

               alert("socket is " + socket)


                 socket.onmessage = (event) =>{
                        const parsedData = JSON.parse(event.data);

                        if(parsedData.type ==='chat'){
                              setChats(c => [...c, {message: parsedData.message}])
                        }
                 }
            }
      }, [socket, loading, id])


      return <div>
            
             {chats.map(m => <div>{m.message}</div>)}
         <input
           value={currentMessage}
           onChange={(e)=> setCurrentMessage(e.target.value)}
           placeholder="Type your messages"
           />       

           <button onClick={()=> {
               socket?.send(JSON.stringify({
                       
                         type: "chat",
                         roomId: id,
                         message: currentMessage
               }))

                console.log(currentMessage)
      console.log("socketis",socket)


               setCurrentMessage("")
           }}>Send Messages</button>
          
      </div>
}


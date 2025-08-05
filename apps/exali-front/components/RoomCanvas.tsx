"use client"
import { WS_URL } from "@/config";
// import { initDraw } from "@/draw";
import { useEffect,useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}) {
         
         
          const [socket,setSocket] = useState<WebSocket | null>(null)


     useEffect(()=>{
          
         const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwYmNjZTIwMy00MGU1LTRmODEtYTY5Ni0zNzM3ZWQwMWVjMmYiLCJpYXQiOjE3NTMyMDk5NDl9.KxaORk-5u0sV4rYYIa98PaOAtXyydRq9IMw0zbqhhTU`)

           ws.onopen = () => {
              setSocket(ws)

              ws.send(JSON.stringify({
                   type:"join_room",
                   roomId
              }))
           }
     },[])

       if(!socket){
            return <div className="text-green-600">
                 Socket is connecting to server...
            </div>    
       }

   


       return <div>
                <Canvas roomId={roomId} socket={socket}/>
        </div>
} 
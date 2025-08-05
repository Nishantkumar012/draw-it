 
  "use client"

import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation"


export default function Home() {
   
   const [roomId, setRoomId] = useState('');
   const router = useRouter();

  return (
   <div style={{
         display:"flex",
         width: "100vw",
         height: "100vh",
         justifyContent:"center",
         alignItems: "center"

   }}>
        <div style={{
              
        }}>

          <h1>Hello</h1>
          <input
           value={roomId}
         onChange={(e)=> setRoomId(e.target.value)} 
                placeholder="Room id"
                type="text"
                style={{
                   padding: "7px 15px",
                   fontSize: "1.1rem",
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                   marginBottom: "16px",
                   outline: "none",
                   boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                }}
                />  
                
                  <button onClick={()=>{
              router.push(`/room/${roomId}`)
          }}
           style={{
                   padding: "7px 15px",
                   fontSize: "1.1rem",
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                   marginBottom: "16px",
                   marginLeft: "10px",

                   outline: "none",
                   boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                }}
          >Join room </button>
        </div>
    </div>
  );
}

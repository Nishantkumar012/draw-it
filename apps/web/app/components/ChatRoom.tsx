import { BACKEND_URL } from "../config"
import axios from 'axios'
import { ChatRoomClient } from "./ChatRoomClient";


//    async function getChats(roomId: string){
//                console.log("kya");
               
//         const  response = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
//                console.log(response);
//             return response.data.messages;
//     }



async function getChats(roomId: string) {
//   console.log("kya");
  try {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    // console.log(response);
    return response.data.messages;
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return []; // or throw error, depending on how you want to handle it
  }
}



  export async function ChatRoom({id} : {
     id: string
  }) {
        const messages = await getChats(id) 
  
         return <ChatRoomClient id={id} messages={messages}/>
    }
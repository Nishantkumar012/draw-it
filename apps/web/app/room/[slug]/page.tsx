import { BACKEND_URL } from "../../config";
import axios from 'axios'
import { ChatRoom  } from "../../components/ChatRoom";

 async function getRoomId(slug: string){
       const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
        // console.log(response.data);
        // console.log(typeof(response.data.id))
//         console.log("Raw response.data:", response.data);
// console.log("Keys in response.data:", Object.keys(response.data));
// console.log("response.data.id:", response.data.id);
// console.log("typeof response.data.id:", typeof response.data.id);
       return response.data.room.id;
 }


export default async function ChatRoomPage({
    params
}: {
      params: {
          slug: string
      }
})  

    {
        // const slug = (await params).slug;  
          
        const slug = "blue";
        const roomId = await getRoomId(slug);
         
        return <ChatRoom id={roomId}/>
    }
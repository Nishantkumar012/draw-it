
import { WebSocketServer, WebSocket } from "ws";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import {JWT_SECRET} from "@repo/backend-common/config"
import {prismaClient} from '@repo/db/client';











  const wss = new WebSocketServer({ port: 9000 });

interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch(e) {
    return null;
  }
  return null;
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close()
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws
  })

  ws.on('message', async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }

    if (parsedData.type === "join_room") {
      const user = users.find(x => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter(x => x === parsedData.room);
    }

    console.log("message received")
    console.log(parsedData);

    if (parsedData.type === "chat") {
       const roomIdRaw = parsedData.roomId;
      const roomId = Number(roomIdRaw);
      
      
        if (isNaN(roomId)) {
    console.error("❌ Invalid roomId:", roomIdRaw);
    return;
  }
      const message = parsedData.message;



      await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId
        }
      });

      users.forEach(user => {
        if (user.rooms.includes(roomId.toString())) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId
          }))
        }
      })
    }

  });

});


// Extend WebSocket to include 'user' property
// declare module "ws" {
//   interface WebSocket {
//     user?: string | JwtPayload;
//   }
// }



//   const wss = new WebSocketServer({ port: 9000 }, () => {
//   console.log("✅ WebSocket server running on ws://localhost:9000");
// });

// wss.on("connection", (ws) => {
//   console.log("🔗 Client connected without token");

//   // Handle incoming messages
//   ws.on("message", (data) => {
//     console.log("📩 Message received:", data.toString());

//     // Echo the message back
//     ws.send(`Server received: ${data.toString()}`);
//   });

//   // Send a welcome message
//   ws.send("✅ Connected to WebSocket server!");
// });



// const PORT = 6000;
// const wss = new WebSocketServer({port: PORT});

// interface User{
//        ws : WebSocket,
//        rooms: string[],
//        userId: string
// }

//    const users : User[] = [];

//    function checkUser(token: string): string | null{
    
//       try {
            
//             //  const decoded = jwt.verify(token , JWT_SECRET)
               
//             const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

// console.log("🔑 Token received:", token);
// console.log("👤 User ID from token:", decoded.userId);


//    if (typeof decoded === "string" || !decoded || !("userId" in decoded)) {
//       return null;
//     }

//           return decoded.userId;

//       } catch (error) {
           
//           return null;
//       } 

  
//    }

// // wss.on("connection", (ws, request)=>{
     
// //      console.log(`New cliwnt connected at ${PORT}`);
     
// //     //  const url = request.url;
      
// //     //   if (!url) return;

// //     //  const UrlParams = new URLSearchParams(url.split('?')[1]);

// //     //  const token = UrlParams.get("token") || "";



// //          const url = new URL(request.url || '', 'http://localhost'); 
// //   const token = url.searchParams.get("token") || "";




// //     //  const decoded = jwt.verify(token as string, JWT_SECRET)

// //     //         if(typeof decoded == "string"){
// //     //             ws.close();
// //     //             return;
// //     //         }

// //     //       if(!decoded || !decoded.userId){
// //     //            ws.close();
// //     //            return;
// //     //       }
 
       
// //          const userId = checkUser(token);

// //          if(userId == null){
// //              console.log("❌ Invalid token. Closing connection.");
// //     ws.close(1008, "Invalid token"); // 1008 = Policy Violation
// //     return;
// //          }
           
// //           users.push({
// //             userId,
// //             rooms: [],
// //             ws
// //           })

// //           ws.on("message", async (data : string)=>{

// //                   console.log("🧾 Incoming raw data:", data.toString());
          
// //                    const parsedData = JSON.parse(data.toString());

// //                    if(parsedData.type === "join_room"){
// //                        const user = users.find(x=> x.ws === ws);
// //                        user?.rooms.push(parsedData.roomId)
// //                         console.log("Room joined:", parsedData.roomId);
// //                    }

// //                    if(parsedData.type === "Leave_room") {
// //                         const user = users.find(x => x.ws === ws);
                        
// //                         if(!user){
// //                             return;
// //                         }

// //                         user.rooms = user?.rooms.filter(x => x === parsedData.room);
// //                        console.log("Room left:", parsedData.roomId);
// //                     }

// //                  if (parsedData.type === "chat") {
// //   const roomId = parsedData.roomId;
// //   const message = parsedData.message;

// //   if (!roomId || !message) {
// //     ws.send(JSON.stringify({ type: "error", message: "roomId and message are required." }));
// //     return;
// //   }

// //      await prismaClient.chat.create({
// //           data: {
// //              roomId,
// //              message,
// //              userId
// //           }
// //      })

// //   users.forEach(user => {
// //     if (user.rooms.includes(roomId)) {
// //       console.log("✅ at right place");

// //       try {
// //         user.ws.send(JSON.stringify({
// //           "type": "chat",
// //           "message":message,
// //           "roomId": roomId
// //         }));
// //         console.log("📨 Message sent to room:", roomId, "=>", message);
// //       } catch (err) {
// //         console.error("❌ Failed to send message to a client:", err);
// //       }
// //     }
// //   });
// // }

// //         })
// // })


//    wss.on("connection", (ws, request) => {
//   console.log(`New client connected at ${PORT}`);

//     // const url = request.url;
//     const url = new URL(request.url || '', `ws://${request.headers.host}`);
//          console.log(url);
//   if (!url) {
//     return;
//   }
//   const queryParams = new URLSearchParams(url.search);
//   const token = queryParams.get('token') || "";
  
    
//   const userId = checkUser(token);

//   if (userId == null) {
//     console.log("❌ Invalid token. Closing connection.");
//     // ws.close(1008, "Invalid token");

//      setTimeout(() => {
//   ws.close(1008, "Invalid token");
//    console.log("I am in set time out")
// }, 2000); // 2000 ms = 2 seconds


//     return;
//   }

//   users.push({
//     userId,
//     rooms: [],
//     ws
//   });


// ws.on('message', async function message(data) {
//     let parsedData;
//     if (typeof data !== "string") {
//       parsedData = JSON.parse(data.toString());
//     } else {
//       parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
//     }

//     if (parsedData.type === "join_room") {
//       const user = users.find(x => x.ws === ws);
//       user?.rooms.push(parsedData.roomId);
//     }

//     if (parsedData.type === "leave_room") {
//       const user = users.find(x => x.ws === ws);
//       if (!user) {
//         return;
//       }
//       user.rooms = user?.rooms.filter(x => x === parsedData.room);
//     }

//     console.log("message received")
//     console.log(parsedData);

//     if (parsedData.type === "chat") {
//       const roomId = parsedData.roomId;
//       const message = parsedData.message;

//       await prismaClient.chat.create({
//         data: {
//           roomId: Number(roomId),
//           message,
//           userId
//         }
//       });

//       users.forEach(user => {
//         if (user.rooms.includes(roomId)) {
//           user.ws.send(JSON.stringify({
//             type: "chat",
//             message: message,
//             roomId
//           }))
//         }
//       })
//     }

// });
        

//       console.log(`Websocket active at ${PORT}`);
    
//   });

// import { HTTP_BACKEND } from '@/config';
// import axios from 'axios';
// // import {shapeSelect} from '../components/Canvas'

//   // type Shape = {
        
//   //      type : "rect",
//   //      x:number,
//   //      y:number,
//   //      width:number,
//   //      height:number
//   // } | {
//   //      type:"circle",
//   //      centerX:number,
//   //      centerY:number,
//   //      radius:number
//   // }

// export async function initDraw(canvas: HTMLCanvasElement, roomId: string,socket :WebSocket,selectedTool: any ){

//         // const ctx = canvas.getContext("2d");
//         //      let existingShapes : Shape[] = await getExistingShapes(roomId);

//         //     if(!ctx) return;

//         //       ctx.fillStyle = "rgba(0,0,0)"
//         //                 ctx.fillRect(0, 0, canvas.width, canvas.height);
                       
//               //  socket.onmessage = (event)=>{
                    
//               //       const message = JSON.parse(event.data);
//               //       if(message.type == "chat"){
//               //             const parsedShapes = JSON.parse(message.message)
//               //            existingShapes.push(parsedShapes.shape);
//               //            clearCanvas(existingShapes, canvas, ctx)
//               //       }
//               //  }

//         // ctx.strokeRect(25,25,100,100)
//         // clearCanvas(existingShapes, canvas, ctx);
//         //   let clicked = false
//         //   let startX= 0;
//         //   let startY = 0;

//           //  canvas.addEventListener("mousedown", (e)=>{
//           //      clicked = true
//           //         startX = e.clientX;
//           //      startY = e.clientY;
//           //  })
           

// //            canvas.addEventListener("mouseup", (e)=>{
// //                  clicked = false;
// //                   const width = e.clientX-startX;
// //                   const height = e.clientY-startY
                  
// //                 //    ctx.clearRect(0,0,canvas.width,canvas.height);
// //                 //         ctx.fillStyle = "rgba(0,0,0)"
// //                 //         ctx.fillRect(0, 0, canvas.width, canvas.height);
// //                 //         ctx.strokeStyle = "rgba(255, 255, 255)"
// //                 //  ctx.strokeRect(startX,startY,width,height)
                  
// //                 //  ctx.strokeRect(startX, startY, width, height);
// //                 //@ts-ignore
// //                 const selectedTool = window.selectedTool
// //                 // const selectedTool = window.selectedTool?.toLowerCase();
// //                    let shape: Shape | null = null;

// //                   if(selectedTool === "rect"){
// //                          shape= {

// //                      type: "rect",
// //                      x: startX,
// //                      y: startY,
// //                      width: width,
// //                      height: height
// //                  }

// //                 //  existingShapes.push(shape);
// //                   } else if(selectedTool === "circle"){
                       
// //                       //  const centerX = startX + width/2;
// //                       //        const centerY = startY + height/2;
// //                       //       //  const radius = Math.max(width,height);
// //                             const radius = Math.max(width, height); 
// //                             shape = {
// //                                    type:"circle",
// //                                    radius: Math.max(width, height),
// //                                    centerX: startX + radius,
// //                                    centerY: startY + radius
// //                            }           
// //                         //  existingShapes.push(shape);
                             
// //                      }
// //                 // const shape: Shape = {
// //                 //           //@ts-ignore
// //                 //      type: window.selectedTool,
// //                 //      x: startX,
// //                 //      y: startY,
// //                 //      width: width,
// //                 //      height: height
// //                 //  }

// //                 //  existingShapes.push(shape);
                         
// //                   if(!shape){
// //                     console.log("shape to h hi nhi");
// //                     return
// //                   }
            
// //                  existingShapes.push(shape);                  
// //                    console.log("db m aaya")
// //                  socket.send(JSON.stringify({
// //                      type: "chat",
// //                      message: JSON.stringify({
// //                         shape
// //                      }),
// //                      roomId
// //                  }))
                
// //             // console.log(e.clientX);
// //               //  console.log(e.clientY)
// // })

//           //  canvas.addEventListener("mousemove", (e)=>{
//           //       if(clicked){
//           //              const width = e.clientX - startX ;
//           //              const height = e.clientY - startY;
//           //                  clearCanvas(existingShapes,canvas,ctx)
//           //               ctx.strokeStyle = "rgba(255, 255, 255)"
                        
//           //               //@ts-ignore
//           //               const selectedTool = window.selectedTool;
//           //               console.log("mere nicche");
//           //               console.log(selectedTool);
//           //               if(selectedTool === "rect"){

//           //                   ctx.strokeRect(startX, startY, width , height);
//           //               }
//           //                   // } 
//           //                   else if(selectedTool === "circle"){
//           //                    const centerX = startX + width/2;
//           //                    const centerY = startY + height/2;
//           //                   //  const radius = Math.max(width,height);
//           //                   const radius = Math.max(width, height); 
//           //                    ctx.beginPath();
//           //                    ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
//           //                    ctx.stroke();
//           //                    ctx.closePath();
//           //                   }
//           //           // console.log(e.clientX);
//           //           // console.log(e.clientY)
//           //       } 
//           //  })
// }

//     // function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
             
//     //     ctx.clearRect(0,0,canvas.width, canvas.height);

//     //     ctx.fillStyle = "rgba(0,0,0)"
//     //     ctx.fillRect(0,0,canvas.width,canvas.height);
             
//     //     existingShapes.map((shape)=> {
                
//     //         //  console.log("starting existing shapes",existingShapes);

//     //         if(shape.type === "rect"){
//     //             // ctx.strokeStyle = "rgba(255,255, 255)"
//     //             ctx.strokeStyle = "white";
//     //             ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
//     //         }
//     //         else  if(shape.type === "circle"){
//     //             // ctx.strokeStyle = "white";
//     //                ctx.strokeStyle = "white";
//     //                 ctx.beginPath();
//     //                 ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
//     //                 ctx.stroke();
//     //                 ctx.closePath();
//     //         }
//     //     })
//     // }





//     // async function getExistingShapes(roomId: string){
//     //        const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);

//     //        const messages = res.data.messages;
//     //        console.log("msg fom api index.tsdraw",messages)

//     //        const shapes = messages.map((x:{message: string}) =>{
//     //              const messageData = JSON.parse(x.message);
                 
//     //              return messageData
//     //             }
//     //         )
//     //         console.log("msgdata fom api index.tsdraw",shapes)

//     //     //      const shapes = messages.map((x: { message: string }) => {
//     //     //     const messageData = JSON.parse(x.message);
//     //     //     return messageData.shape ?? messageData;
//     //     // });

//     //        return shapes;
//     // }


// // async function getExistingShapes(roomId: string) {
// //   try {
// //     const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
// //     const messages = res.data.messages;

// //     // console.log("📩 messages from API:", messages);

// //     const shapes = messages
// //       .map((x: { message: string }, index: number) => {
// //         try {
// //           const messageData = JSON.parse(x.message);

// //           // Optional: check if it's a valid shape object
// //           if (typeof messageData === 'object' && messageData !== null && 'shape' in messageData) {
// //             return messageData.shape;
// //           } else {
// //             console.warn(`⚠️ Message #${index} is JSON but not a shape:`, messageData);
// //             return null;
// //           }
// //         } catch (error) {
// //           console.warn(`⚠️ Skipping non-JSON message #${index}:`, x.message);
// //           return null;
// //         }
// //       })
// //       .filter((x: null) => x !== null); // Remove invalid entries

// //     // console.log("✅ Parsed shapes:", shapes);

// //     return shapes;
// //   } catch (error) {
// //     console.error("❌ Error fetching shapes from backend:", error);
// //     return [];
// //   }
// // }

    //   path?: Array<{ x: number; y: number }>;

     import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";
import { HTTP_BACKEND } from "@/config";

type Shape =
  | {
    
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      undone?: boolean 
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
      undone?: boolean
    }
  |
   {
      type: "pencil";
    //   startX: number;
    //   startY: number;
    //   endX: number;
    //   endY: number;
      path : Array<{ x: number; y:number}>
      undone?: boolean
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private socket: WebSocket;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private selectedTool: Tool = "circle";
  private lastX =0;
  private lastY = 0;
  private drawing = true;
  private currentPath: Array<{ x: number; y: number }> = [];
  



  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;

    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

        destroy(){
          this.canvas.removeEventListener("mousedown", this.mouseDownHandler)
          this.canvas.removeEventListener("mouseup", this.mouseUpHandler)
          this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
     
     
     
        }

  setTool(tool: Tool) {
    this.selectedTool = tool;
    console.log("Tool updated to:", tool);
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    console.log("dekh lode",this.existingShapes);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "chat") {
        const parsedShapes = JSON.parse(message.message);
        this.existingShapes.push(parsedShapes.shape);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (const shape of this.existingShapes) {
       
        if(shape.undone) continue  //mean the shape undone is true so it should not render
      this.ctx.strokeStyle = "white";

      if (shape.type === "rect" ) {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        console.log("shapetype",shape.type);
      } else if (shape.type === "circle") {
        console.log("shapetype",shape.type);

        this.ctx.beginPath();
        this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      else if(shape.type === "pencil"){
        //    this.ctx.beginPath();
        //    this.ctx.moveTo(shape.startX,shape.startY);
        //    this.ctx.lineTo(shape.endX,shape.endY);
        //    this.ctx.stroke();
        //    this.ctx.closePath();

            const path = shape.path;
            // if(path.length < 2) continue;
              if (!path || path.length < 2) continue;
             
            this.ctx.beginPath();
            this.ctx.moveTo(path[0].x, path[0].y);
            for( let i=0;i< path.length;i++){
                  this.ctx.lineTo(path[i].x,path[i].y);
            }
            this.ctx.stroke();
            this.ctx.closePath
      }
    }
  }


    mouseDownHandler = (e: MouseEvent) => {
      this.clicked = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;

      if( this.selectedTool === "pencil"){
        //    this.ctx.beginPath();
        //    this.ctx.moveTo(this.lastX,this.lastY);
           this.drawing = true;
           this.currentPath = [{x: this.startX, y: this.startY}];
      }

    }

    
    mouseUpHandler =   (e: MouseEvent)=> {
              this.clicked = false;
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      const selectedTool = this.selectedTool;

      let shape: Shape | null = null;
      console.log("selected tool mmouseup",selectedTool)

      if (selectedTool === "rect") {
        //   alert("i choose rectangle")
        shape = {
          type: "rect",
          x: this.startX,
          y: this.startY,
          width,
          height,
        };
      } 

       else if(selectedTool === "circle") {
        const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
        const centerX = this.startX + width / 2;
        const centerY = this.startY + height / 2;

        shape = {
          type: "circle",
          centerX,
          centerY,
          radius,
        };
      }

      else if(selectedTool === "pencil" && this.drawing){
            
        //    this.ctx.closePath();

    //  shape = {
    //   type: "pencil",
    //   startX: this.startX,
    //   startY: this.startY,
    //   endX: e.clientX,
    //   endY: e.clientY,
    // }; 
           if(this.currentPath.length > 1){

           
             shape = {
                 type: "pencil",
                 path: [...this.currentPath]
             };
            }
               console.log("shape should below")
              if (shape) {
                console.log("path ka shap", shape.path);
              }
            
             this.drawing=false;
             this.currentPath = [];
      }
    

      if (!shape) {
        console.log("No shape drawn.");
        return;
      }

      this.existingShapes.push(shape);
      this.clearCanvas();

      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: this.roomId,
        })
      );
    }

    //      mouseUpHandler = (e: MouseEvent) => {
    //     this.clicked = false
    //     const width = e.clientX - this.startX;
    //     const height = e.clientY - this.startY;

    //     const selectedTool = this.selectedTool;
    //     let shape: Shape | null = null;
    //     if (selectedTool === "rect") {

    //         shape = {
    //             type: "rect",
    //             x: this.startX,
    //             y: this.startY,
    //             height,
    //             width
    //         }
    //     } else if (selectedTool === "circle") {
    //         const radius = Math.max(width, height) / 2;
    //         shape = {
    //             type: "circle",
    //             radius: radius,
    //             centerX: this.startX + radius,
    //             centerY: this.startY + radius,
    //         }
    //     }

    //     if (!shape) {
    //         return;
    //     }
    //       console.log("shape",shape)
    //     this.existingShapes.push(shape);
    //     console.log(this.existingShapes);

    //     this.socket.send(JSON.stringify({
    //         type: "chat",
    //         message: JSON.stringify({
    //             shape
    //         }),
    //         roomId: this.roomId
    //     }))
    // }


    mouseMoveHandler = (e: MouseEvent) =>{
           if (this.clicked) {


   const currentX = e.clientX;
        const currentY = e.clientY;

        const selectedTool = this.selectedTool;
      console.log("selected tool mouse move",selectedTool)

          if(selectedTool === "pencil" && this.drawing){
                 
            const newPoint = {x:currentX, y:currentY};
            this.currentPath.push(newPoint);

              const len = this.currentPath.length;

              if(len>1){
                const prev = this.currentPath[len-2];
                this.ctx.beginPath();
                this.ctx.moveTo(prev.x,prev.y);
                this.ctx.lineTo(newPoint.x, newPoint.y);
                this.ctx.stroke();
                // this.lastX = currentX;
                // this.lastY = currentY;
            }
            return;
          }

        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;

     

        this.clearCanvas();
        this.ctx.strokeStyle = "rgba(255, 255, 255)";

       if  (selectedTool === "rect") {
        //   alert("i choose rect")

          this.ctx.strokeRect(this.startX, this.startY, width, height);
          console.log(selectedTool,"rect m");

        }
           
        else if (selectedTool === "circle") {
        //   alert("i choose circle")

          const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
          const centerX = this.startX + width / 2;
          const centerY = this.startY + height / 2;

          this.ctx.beginPath();
          this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          this.ctx.stroke();
          this.ctx.closePath();
          console.log(selectedTool,"cicrlclem");
        }

         
      }
    }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

    async undo(){
                for(let i=this.existingShapes.length-1;i>=0;i--){
                            console.log("undo");
                             
                             const shape = this.existingShapes[i];

                       if(!shape.undone){
                            this.existingShapes[i].undone =true;
                            // console.log("undo ke if m aagya");
                            // break;
                            try {
                                  //  const response = await fetch(`${HTTP_BACKEND}/shapes/${shape.id}`)
                            } catch (error) {
                              
                            }
                       }

                       this.clearCanvas();
                }
     }
  
}












 // if everything is fucked


//   import { Tool } from "@/components/Canvas";
// import { getExistingShapes } from "./http";
// import { HTTP_BACKEND } from "@/config";

// type Shape =
//   | {
    
//       type: "rect";
//       x: number;
//       y: number;
//       width: number;
//       height: number;
//       undone?: boolean 
//     }
//   | {
//       type: "circle";
//       centerX: number;
//       centerY: number;
//       radius: number;
//       undone?: boolean
//     }
//   |
//    {
//       type: "pencil";
//     //   startX: number;
//     //   startY: number;
//     //   endX: number;
//     //   endY: number;
//       path : Array<{ x: number; y:number}>
//       undone?: boolean
//     };

// export class Game {
//   private canvas: HTMLCanvasElement;
//   private ctx: CanvasRenderingContext2D;
//   private existingShapes: Shape[];
//   private roomId: string;
//   private socket: WebSocket;
//   private clicked: boolean;
//   private startX = 0;
//   private startY = 0;
//   private selectedTool: Tool = "circle";
//   private lastX =0;
//   private lastY = 0;
//   private drawing = true;
//   private currentPath: Array<{ x: number; y: number }> = [];
  



//   constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
//     this.canvas = canvas;
//     this.ctx = canvas.getContext("2d")!;
//     this.existingShapes = [];
//     this.roomId = roomId;
//     this.socket = socket;
//     this.clicked = false;

//     this.init();
//     this.initHandlers();
//     this.initMouseHandlers();
//   }

//         destroy(){
//           this.canvas.removeEventListener("mousedown", this.mouseDownHandler)
//           this.canvas.removeEventListener("mouseup", this.mouseUpHandler)
//           this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
     
     
     
//         }

//   setTool(tool: Tool) {
//     this.selectedTool = tool;
//     console.log("Tool updated to:", tool);
//   }

//   async init() {
//     this.existingShapes = await getExistingShapes(this.roomId);
//     console.log("dekh lode",this.existingShapes);
//     this.clearCanvas();
//   }

//   initHandlers() {
//     this.socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       if (message.type === "chat") {
//         const parsedShapes = JSON.parse(message.message);
//         this.existingShapes.push(parsedShapes.shape);
//         this.clearCanvas();
//       }
//     };
//   }

//   clearCanvas() {
//     this.ctx.fillStyle = "black";
//     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

//     for (const shape of this.existingShapes) {
       
//         if(shape.undone) continue  //mean the shape undone is true so it should not render
//       this.ctx.strokeStyle = "white";

//       if (shape.type === "rect" ) {
//         this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
//         console.log("shapetype",shape.type);
//       } else if (shape.type === "circle") {
//         console.log("shapetype",shape.type);

//         this.ctx.beginPath();
//         this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
//         this.ctx.stroke();
//         this.ctx.closePath();
//       }

//       else if(shape.type === "pencil"){
//         //    this.ctx.beginPath();
//         //    this.ctx.moveTo(shape.startX,shape.startY);
//         //    this.ctx.lineTo(shape.endX,shape.endY);
//         //    this.ctx.stroke();
//         //    this.ctx.closePath();

//             const path = shape.path;
//             // if(path.length < 2) continue;
//               if (!path || path.length < 2) continue;
             
//             this.ctx.beginPath();
//             this.ctx.moveTo(path[0].x, path[0].y);
//             for( let i=0;i< path.length;i++){
//                   this.ctx.lineTo(path[i].x,path[i].y);
//             }
//             this.ctx.stroke();
//             this.ctx.closePath
//       }
//     }
//   }


//     mouseDownHandler = (e: MouseEvent) => {
//       this.clicked = true;
//       this.startX = e.clientX;
//       this.startY = e.clientY;
//       this.lastX = e.clientX;
//       this.lastY = e.clientY;

//       if( this.selectedTool === "pencil"){
//         //    this.ctx.beginPath();
//         //    this.ctx.moveTo(this.lastX,this.lastY);
//            this.drawing = true;
//            this.currentPath = [{x: this.startX, y: this.startY}];
//       }

//     }

    
//     mouseUpHandler =   (e: MouseEvent)=> {
//               this.clicked = false;
//       const width = e.clientX - this.startX;
//       const height = e.clientY - this.startY;
//       const selectedTool = this.selectedTool;

//       let shape: Shape | null = null;
//       console.log("selected tool mmouseup",selectedTool)

//       if (selectedTool === "rect") {
//         //   alert("i choose rectangle")
//         shape = {
//           type: "rect",
//           x: this.startX,
//           y: this.startY,
//           width,
//           height,
//         };
//       } 

//        else if(selectedTool === "circle") {
//         const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
//         const centerX = this.startX + width / 2;
//         const centerY = this.startY + height / 2;

//         shape = {
//           type: "circle",
//           centerX,
//           centerY,
//           radius,
//         };
//       }

//       else if(selectedTool === "pencil" && this.drawing){
            
//         //    this.ctx.closePath();

//     //  shape = {
//     //   type: "pencil",
//     //   startX: this.startX,
//     //   startY: this.startY,
//     //   endX: e.clientX,
//     //   endY: e.clientY,
//     // }; 
//            if(this.currentPath.length > 1){

           
//              shape = {
//                  type: "pencil",
//                  path: [...this.currentPath]
//              };
//             }
//                console.log("shape should below")
//               if (shape) {
//                 console.log("path ka shap", shape.path);
//               }
            
//              this.drawing=false;
//              this.currentPath = [];
//       }
    

//       if (!shape) {
//         console.log("No shape drawn.");
//         return;
//       }

//       this.existingShapes.push(shape);
//       this.clearCanvas();

//       this.socket.send(
//         JSON.stringify({
//           type: "chat",
//           message: JSON.stringify({ shape }),
//           roomId: this.roomId,
//         })
//       );
//     }

//     //      mouseUpHandler = (e: MouseEvent) => {
//     //     this.clicked = false
//     //     const width = e.clientX - this.startX;
//     //     const height = e.clientY - this.startY;

//     //     const selectedTool = this.selectedTool;
//     //     let shape: Shape | null = null;
//     //     if (selectedTool === "rect") {

//     //         shape = {
//     //             type: "rect",
//     //             x: this.startX,
//     //             y: this.startY,
//     //             height,
//     //             width
//     //         }
//     //     } else if (selectedTool === "circle") {
//     //         const radius = Math.max(width, height) / 2;
//     //         shape = {
//     //             type: "circle",
//     //             radius: radius,
//     //             centerX: this.startX + radius,
//     //             centerY: this.startY + radius,
//     //         }
//     //     }

//     //     if (!shape) {
//     //         return;
//     //     }
//     //       console.log("shape",shape)
//     //     this.existingShapes.push(shape);
//     //     console.log(this.existingShapes);

//     //     this.socket.send(JSON.stringify({
//     //         type: "chat",
//     //         message: JSON.stringify({
//     //             shape
//     //         }),
//     //         roomId: this.roomId
//     //     }))
//     // }


//     mouseMoveHandler = (e: MouseEvent) =>{
//            if (this.clicked) {


//    const currentX = e.clientX;
//         const currentY = e.clientY;

//         const selectedTool = this.selectedTool;
//       console.log("selected tool mouse move",selectedTool)

//           if(selectedTool === "pencil" && this.drawing){
                 
//             const newPoint = {x:currentX, y:currentY};
//             this.currentPath.push(newPoint);

//               const len = this.currentPath.length;

//               if(len>1){
//                 const prev = this.currentPath[len-2];
//                 this.ctx.beginPath();
//                 this.ctx.moveTo(prev.x,prev.y);
//                 this.ctx.lineTo(newPoint.x, newPoint.y);
//                 this.ctx.stroke();
//                 // this.lastX = currentX;
//                 // this.lastY = currentY;
//             }
//             return;
//           }

//         const width = e.clientX - this.startX;
//         const height = e.clientY - this.startY;

     

//         this.clearCanvas();
//         this.ctx.strokeStyle = "rgba(255, 255, 255)";

//        if  (selectedTool === "rect") {
//         //   alert("i choose rect")

//           this.ctx.strokeRect(this.startX, this.startY, width, height);
//           console.log(selectedTool,"rect m");

//         }
           
//         else if (selectedTool === "circle") {
//         //   alert("i choose circle")

//           const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
//           const centerX = this.startX + width / 2;
//           const centerY = this.startY + height / 2;

//           this.ctx.beginPath();
//           this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
//           this.ctx.stroke();
//           this.ctx.closePath();
//           console.log(selectedTool,"cicrlclem");
//         }

         
//       }
//     }

//   initMouseHandlers() {
//     this.canvas.addEventListener("mousedown", this.mouseDownHandler);

//     this.canvas.addEventListener("mouseup", this.mouseUpHandler);

//     this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
//   }

//     async undo(){
//                 for(let i=this.existingShapes.length-1;i>=0;i--){
//                             console.log("undo");
                             
//                              const shape = this.existingShapes[i];

//                        if(!shape.undone){
//                             this.existingShapes[i].undone =true;
//                             // console.log("undo ke if m aagya");
//                             // break;
//                             try {
//                                   //  const response = await fetch(`${HTTP_BACKEND}/shapes/${shape.id}`)
//                             } catch (error) {
                              
//                             }
//                        }

//                        this.clearCanvas();
//                 }
//      }
  
// }



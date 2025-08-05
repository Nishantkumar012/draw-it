 "use client"

  import {useRef, useEffect, useState} from 'react'
  //  import { initDraw } from "../draw/index"
import { Button } from '@repo/ui/button'
import { IconButton } from './IconButton';
import { Pencil, RectangleHorizontalIcon, Circle, RectangleHorizontal, ArrowLeft } from 'lucide-react';
import { Game } from '@/draw/Game';
// import {undo} from '@/draw/Game'

// export let ToolSelect: string = "";
// export let setToolSelect: (Tool: string) => void;
  
export type Tool = "circle" | "rect" | "pencil" | "undo";


export  function Canvas({roomId,socket}: {roomId:string , socket: WebSocket}){
         const canvasRef = useRef<HTMLCanvasElement>(null)
  // const [internalToolSelect, setInternalToolSelect] = useState<string>("")
      
  
    const [selectedTool, setSelectedTool] = useState<Tool>("rect")
    const [game,setGame] = useState<Game>();
     
     

    useEffect(() => {

       //@ts-ignore
        // window.selectedTool = selectedTool;

         game?.setTool(selectedTool)
         console.log("Tool selected:", selectedTool);

        // console.log("sele Tool", selectedTool);
    }, [selectedTool, game])

    // Expose the state externally
    // ToolSelect = internalToolSelect;
    // setToolSelect = setInternalToolSelect;


         useEffect(()=>{
       if(canvasRef.current){
           

            //  const canvas =canvasRef.current;

                const g= new Game(canvasRef.current,roomId,socket)
                //  g.setTool(selectedTool)               
                setGame(g);

                   return ()=> {
                     g.destroy();
                   }

//@ts-ignore
            // initDraw(canvas,roomId,socket,window.selectTool);
       } 

    },[canvasRef])
return (
  <div className="w-screen h-screen overflow-hidden relative">
    <canvas ref={canvasRef} width={2000} height={1000}></canvas>
    <div
        // className="flex w-[50vh] p-3 justify-between rounded bg-white/10  backdrop-blue-md"
        className="flex w-[50vh] p-3 bg-white/30  "
    
    >
            
     
               <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool } game={game}/>
    </div> 
     
  </div>
)

}
   

    {/* <IconButton icon="pencil"/>
<Button onClick={() => setInternalToolSelect('Circle')}>Circle</Button>
                <Button onClick={() => setInternalToolSelect('Rectangle')}>Rectangle</Button>
                <Button onClick={() => setInternalToolSelect('Square')}>Square</Button>
          */}
 
  // style={{
      //   position: "absolute",
      //   left: 500,
      //   top: 10,
      //   zIndex: 10,
      // }}

  function Topbar ({selectedTool, setSelectedTool,game} : {
        selectedTool: Tool,
        setSelectedTool: (s: Tool) => void,
        game: Game | undefined
  }){
       return <div className='flex justify-between w-[40vh] p-3 bg-white/60 backdrop-blur rounded-xl'
        style={{
        position: "absolute",
        left: 500,
        top: 10,
        zIndex: 10,
      }}>
             <IconButton icon={<Pencil/>} onClick={()=>{setSelectedTool("pencil")
              //  console.log("pencil pressed")
                
              }}
                activated={selectedTool === "pencil"}/> 
             <IconButton icon={<RectangleHorizontal/>}  onClick={()=>{setSelectedTool("rect")
             }} activated={selectedTool === "rect"}/> 
             <IconButton icon={<Circle/>} onClick={()=>{setSelectedTool("circle")
             }} activated={selectedTool === "circle"}/> 
             {/* <IconButton icon={<ArrowLeft/>} onClick={()=>{game?undo()}}/> */}
              <IconButton 
           icon={<ArrowLeft />}
           onClick={() => {
             game?.undo(); // Call the undo method from your Game instance
           } }           />

       </div>
  }
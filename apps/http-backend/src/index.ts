import express, { Request, response, Response } from 'express'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/backend-common/config'
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from '@repo/common/types';
import {prismaClient} from '@repo/db/client';
import bcrypt from 'bcrypt'
import { usermiddleware } from './middleware';
import cors from "cors";


const app = express();
const PORT = 5000;



app.use(express.json());
app.use(cors());

app.post('/signup', async(req: Request, res: Response) => {
    
      const response = CreateUserSchema.safeParse(req.body);

      if(!response.success){
           res.json({
             message: "Incorrect inputs"
           })
           return ;
      }

      const {email,password,name} = response.data;

        try {
               const existingUser = await prismaClient.user.findFirst({
                where:{
                     email
                }
               })

               if(existingUser){
                   return res.status(409).json({message: "User already  exists"})
               }

                 const hashedPassword = await bcrypt.hash(password,10);

                 const user = await prismaClient.user.create({
                     data: {
                         email,
                         password: hashedPassword,
                         name,
                     }
                 });

                 return res.status(201).json({user});
        } catch (error) {
             
              console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

     
})

app.post('/signin', async (req: Request, res: Response) => {
   
         const response = SignInSchema.safeParse(req.body);

         if(!response.success){
                 res.json({
             message: "Incorrect inputs"
           })
           return ;
         }

         const { email,password}  = response.data

         
         try {
                
              const user = await prismaClient.user.findFirst({
                where: {
                     email
                }
              })

            if(!user){
                return res.status(401).json({message:"User does not exists"})
            }
         
             const isMatch = await bcrypt.compare(password, user.password); 
               
              if(!isMatch){
                   return res.status(401).json({message: "Invalid credentials"});
              }

              const token = jwt.sign({userId:user.id},JWT_SECRET);

              return res.json({token});

         } catch (error) {
               console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
         }
   
  
})

  app.post('/room', usermiddleware,async (req:Request,res:Response) =>{
          
          const response = CreateRoomSchema.safeParse(req.body);

        
         if(!response.success){
                 res.json({
             message: "Incorrect inputs"
           })
           return ;
         }
           

         const {name} = response.data;

        //  const slug = slugify(name);
        const slug = name;

         try {
                     const existingRoom = await prismaClient.room.findUnique({
                        where: {
                            slug
                        }
                     })
             
                        if (existingRoom) {
      return res.status(409).json({ message: 'Room with same name (slug) already exists' });
    }

            if (!req.userId) {
                return res.status(400).json({ message: 'User ID is missing from request' });
            }

             const room = await prismaClient.room.create({
                  
                 data:{

                   slug,
                   adminId: req.userId
                 }
             });
           return res.status(201).json({ roomId: room.id, slug });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }

  })

    // app.get('/chats/:roomId', usermiddleware, async(req:Request,res:Response)=>{
    app.get('/chats/:roomId',  async(req:Request,res:Response)=>{
              
           const roomId = Number(req.params.roomId);
           console.log(req.params.roomId)
           console.log("stage 1")

           if(!roomId){
                return res.status(400).json({message: 'Invalid or missing roomId'})
                   
           }
                  console.log("stage 2")
                   
           try {
                     const room = await prismaClient.room.findUnique({
                         where: {
                             id: roomId,
                         }
                     })
                  console.log("stage 3")
                           
                     if(!room){
                          return res.status(404).json({message: 'Room not found'})
                          
                        }
                        console.log("stage 4")


                     const messages = await prismaClient.chat.findMany({
                          where: {
                             roomId: roomId
                            },
                        //   include: {
                        //      user: {
                        //         select: {
                        //             id: true,
                        //             name: true,
                        //         },
                        //      },
                        //   },
                          orderBy: {
                            id: 'asc'
                          },
                          take: 1000
                     })
                  console.log("stage 5")
                              
                     return res.json({messages});

           } catch (error) {
                 console.error(error);
                 res.json({
                     message: []
                 })
    // return res.status(500).json({ message: 'Internal server error' });
 
           }

    })


   app.get("/room/:slug", async (req, res)=>{
           const slug = req.params.slug;
           
           const room = await prismaClient.room.findFirst({
               where: {
                   slug
               }
           });

           res.json({
               room
           })
   })



   app.patch("/shapes/:id", async(req,res)=>{
             
            console.log("Raw shape id param:", req.params.id);

         const shapeId = Number(req.params.id);
         console.log(shapeId);

        if (isNaN(shapeId)) {
    return res.status(400).json({ message: "Invalid shape ID" });
}

         try {
                 const updated = await prismaClient.chat.update({
                    where: {id: shapeId},
                    data: {undone:true}
                 })
            return res.json({ message: 'Shape undone successfully', shape: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
   })

   


app.listen(PORT, () => {
    console.log(`Hello world at ${PORT}`)
})
// function slugify(name: string) {
//     return name
//         .toString()
//         .toLowerCase()
//         .trim()
//         .replace(/\s+/g, '-')           // Replace spaces with -
//         .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//         .replace(/\-\-+/g, '-');        // Replace multiple - with single -
// }


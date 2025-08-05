"use client"
 import { Button } from "@repo/ui/button";
 import {Input} from "@repo/ui/input"
import React from 'react'

function AuthPage({isSignin}: {
    isSignin:boolean
}) {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='bg-teal-500 p-10 m-10 flex flex-col gap-y-2'>
              <Input placeholder="Email"
               className=" border rounded-md"/>
               <Input placeholder="Password"
               className="  border rounded-md text-red-700"
                />
           {/* <button>{isSignin?"signin":"signup"}</button> */}
           <Button variant="primary" size="lg" children="PRess" className="bg-blue-600 rounded py-2"/>
        </div>
    </div>
  )
}

export default AuthPage
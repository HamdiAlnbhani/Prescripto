import React, { useState,useContext,useEffect } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

  const {backendUrl,token,setToken}=useContext(AppContext)

  const navigate =useNavigate()

  const [state,setState]=useState('Sing Up')

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')

  const aonSubmitHandler=async(event)=>{
    event.preventDefault()

    try {

      if (state==='Sing Up') {

        const {data} =await axios.post(backendUrl + '/api/user/register',{name,password,email})
        
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
          
        }else{
          toast.error(data.message)
        }
      }else{
         const {data} =await axios.post(backendUrl + '/api/user/login',{password,email})
        
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
          
        }else{
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token){

      navigate('/')
       
    }
  },[token])
  return (
   <form onSubmit={aonSubmitHandler} className='min-h-[80vh] flex items-center ' action="">
    <div  className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 bourder rounded-xl text-zinc-600 text-sm shadow-lg '>
      <p className='text-2xl font-semibold'>{state ==='Sing Up'?"Create Account" :"Login"}</p>
      <p>Please {state ==='Sing Up'?"sing up" :"log in"} to book appointment</p>

      {
        state==="Sing Up" && <div className='w-full'>
        <p>Full Name</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name.name} />
      </div>
      }

     
       <div className='w-full'>
        <p>Email</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email.email} />
      </div>

       <div className='w-full'>
        <p>Password</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password.password} />
      </div>
      <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>{state ==='Sing Up'?"Create Account" :"Login"}</button>
       {
        state ==='Sing Up'
        ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
        : <p>Create an new account? <span onClick={()=>setState('Sing Up')} className='text-primary underline cursor-pointer'>click here</span></p>
       }
    </div>

   </form>
  )
}

export default Login
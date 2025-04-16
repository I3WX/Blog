"use client"
import SubTableItem from '@/Components/AdminComponents/SubTableItem'
import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const page = () => {

  const[emails,setEmails] = React.useState([])
  const fetchEmail =async()=>{
    const res = await axios.get("/api/email")
    setEmails(res.data.emails)
  }
  const deleteEmail = async (mongoId)=>{
    const res = await axios.delete('/api/email',{
      params:{
        id:mongoId
      }
    })
    if (res.data.success){
      toast.success(res.data.msg)
      fetchEmail()
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchEmail()
  },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16' >
      <h1>All Subscription</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto border border-gray scrollbar-hide'>
        <table className=' w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Email Subscription
              </th>
              <th scope='col' className=' hidden  sm:block px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item,index)=>{
              return <SubTableItem key={index} mongoId={item._id} deleteEmail={deleteEmail} email={item.email} date={item.date}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
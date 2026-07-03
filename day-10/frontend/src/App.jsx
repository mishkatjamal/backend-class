import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {

  const [allnotes, setallnotes] = useState([])
const fetchNotes =async ()=>{
  const notes = await axios.get("https://backend-class-fbun.onrender.com/notes")
  setallnotes(notes.data.notes)  
}




  useEffect(() => {
  fetchNotes()
  }, [])
  
  //* form submit handler
  // * POST
function submitHandler(e){
  e.preventDefault()
  const {title,description,image} = e.target.elements

  axios.post("https://backend-class-fbun.onrender.com/api/notes",{
    title:title.value,
    description:description.value,
    image:image.value
  })
  .then((res)=>{
    console.log(res.data);
    fetchNotes()
    e.target.reset();
    
  })
}

// * DELETE
function deleteHandler(noteId){
  axios.delete("https://backend-class-fbun.onrender.com/api/notes/"+noteId)
  .then((res)=>{
    console.log(res.data);
    fetchNotes()
  })
}

// * PATCH
// * update note description
function updateHandler(noteId,description){
axios.patch("https://backend-class-fbun.onrender.com/api/notes/"+noteId,{description:description})
.then((res)=>{
  console.log(res.data);
  fetchNotes()
  
})
}

  return (
    <div className='w-full flex flex-row-reverse gap-5 p-5 relative'>
       {/* form */}
    <div className='w-1/3 h-fit shadow-2xl px-5 py-10 rounded-xl sticky top-10 right-0'>
      <form onSubmit={submitHandler}
      className='flex flex-col w-ful gap-4 '
      >
        <input className='bg-gray-100 border text-black rounded-4xl px-4 py-2' name='title' type="text" placeholder='Enter your title'/>
        <input className='bg-gray-100 border text-black rounded-4xl px-4 py-2' name='description' type="text" placeholder='Enter your description'/>
        <input className='bg-gray-100 border text-black rounded-4xl px-4 py-2' name='image' type="text" placeholder='Enter your Image url'/>

        <button className='bg-black text-white rounded-4xl px-4 py-2' type='submit'>Submit</button>
      </form>
    </div>

    <div className='w-full flex flex-wrap gap-5 p-5'>
      {allnotes.map((elem,indx)=>{
        return <div key={indx} className='w-1/4 bg-white p-3 text-black rounded-2xl shadow-2xl border border-gray-300'>
          {/* images */}
          <img src={elem.image} 
          className='h-70 w-full object-cover rounded-2xl'
           />
           {/* title */}
          <h1 className='mt-3 text-4xl'>{elem.title}</h1>
          {/* description */}
          <p>{elem.description}</p>

          {/* button */}
          <div className='flex justify-between mt-4'>
            {/* edit btn  */}
            <button onClick={()=>{
              const newDes = prompt("enter new description",elem.description)
              if (newDes !== null) {
                updateHandler(elem._id,newDes)
              }
            }}
            className='w-fit px-5 py-2 rounded-4xl bg-black text-white hover:px-7 hover:bg-white hover:text-black hover:border  transition-all'>Edit</button>

            {/* delete btn */}
            <button onClick={()=>{
              deleteHandler(elem._id)
            }}
             className='w-fit px-5 py-2 rounded-4xl bg-black text-white hover:px-7 hover:bg-white hover:text-black hover:border  transition-all'>Delete</button>
          </div>          
        </div>
      })}
    </div>

    </div>
  )
}

export default App
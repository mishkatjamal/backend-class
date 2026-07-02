import React, { useEffect, useState } from 'react'
import axios, { all } from 'axios'

const App = () => {
  const [notes, setnotes] = useState([])

  const fetchNotes = async () => {
    const allnote = await axios.get("http://localhost:3000/api/notes")

    setnotes(allnote.data.notes)

  }



  useEffect(() => {
    fetchNotes()
  }, [])

  // form submit for send data to DB
  // submit data to the db
  function submitHandler(e) {
    e.preventDefault()


    const { title, description } = e.target.elements
    // console.log(e.target.elements.description.value);

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        console.log(res.data);
        fetchNotes()
          e.target.reset();
      })



  }


  // delete data from DB
  function deleteHandler(noteId) {

    axios.delete("http://localhost:3000/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data);
        fetchNotes()

      })
  }

  // update note description
  function editHandler(noteId, description) {

    axios.patch("http://localhost:3000/api/notes/" + noteId, { description: description })
      .then((res) => {
        console.log(res.data);
        fetchNotes()
      })
  }


  return (
    <>
      {/* form */}
      <div className='w-full flex justify-center'>

        <form
         onSubmit={submitHandler}
          className='w-fit px-5 py-3 flex flex-col gap-5 shadow-2xl rounded-4xl mt-5 border'>

          <input name='title' className='border border-black px-5 py-2 rounded-4xl' type="text" placeholder='enter your title' />

          <input name='description' className='border border-black px-5 py-2 rounded-4xl' type="text" placeholder='enter your description' />

          {/* button */}
          <button
            className='border border-black px-5 py-2 rounded-4xl w-fit' type='submit'>submit</button>

        </form>
      </div>
      {/* form */}

      {/* cards */}
      <div className='flex flex-wrap w-full gap-4 p-5'>
        {notes.map((elem, indx) => {
          return <div key={indx} className='w-1/5 bg-black text-white p-3 rounded-2xl flex flex-col items-center justify-between'>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl'>{elem.title}</h2>
            <p className='text-center'>{elem.description}</p>
            </div>
            
            <div className='flex gap-3 mt-2'>
              {/* delete btn */}
            <button onClick={() => { deleteHandler(elem._id) }}
              className='w-fit px-3 py-2 rounded-2xl bg-white text-black'
            >delete</button>

            {/* edit description */}
            <button onClick={() => {
              const newDes = prompt("enter new description", elem.description)
              if (newDes !== null) {
                editHandler(elem._id, newDes)
              }
            }}
              className='w-fit px-3 py-2 rounded-2xl bg-white text-black'>edit</button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
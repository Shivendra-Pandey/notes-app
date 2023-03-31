import { FaRegStickyNote } from "react-icons/fa";
import { useState,useEffect } from "react";
function Notes(){

    function NoteCard({notetitle, notecontent,id}){
        return (
            <>
            <div className=" w-64 h-60 rounded-lg shadow-lg hover:shadow-2xl m-auto bg-slate-200 overflow-scroll py-2 text-justify px-2 mx-4 my-4 font-poppins  hover:bg-slate-200 duration-100 transition ease-in-out">
                <h1 className="text-xl px-2 py-2 h-[20%] font-semibold">{notetitle}</h1>
                <p className="text-md px-2 py-2 h-[60%] text-justify break-words">{notecontent}</p>
                <div className="flex h-[15%] my-2">
                <button className="mx-1 px-1 bg-red-500 text-white hover:bg-red-400 hover:text-black rounded-lg" onClick={()=>deleteNote(id)}>Delete</button>
                <button className="mx-1  bg-blue-600 text-white hover:bg-blue-500 hover:text-black rounded-lg px-4" onClick={()=>{setTitle(notetitle) ; setContent(notecontent) ; seteditshow(true) ;setId(id)}}>Edit</button>
                </div>
              </div>
           </>
        );
    }

    const [show , setshow] = useState(false)
    const [editshow , seteditshow] = useState(false)
    const [notes,setnotes] = useState(null)
    const [title , setTitle] = useState('')
    const [content,setContent] = useState('')
    const [Id, setId]= useState('')
    const note = {title , content}

    const fetchNotes = async () => {
        const response = await fetch('http://localhost:4000/api/notes/')
        const data = await response.json()
        if(response.ok){
            setnotes(data)
        }
    }

    const createNote = async ()=>{
        const response = await fetch('http://localhost:4000/api/notes/' , {
            method : 'POST',
            body : JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setTitle('')
        setContent('')
        fetchNotes()
        console.log(response.json);
    }

    const editNote = async (id)=>{
       
        const response = await fetch(`http://localhost:4000/api/notes/${id}` , {
            method : 'PATCH',
            body : JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setTitle('')
        setContent('')
        fetchNotes()
        console.log(response.json);
    }


    const deleteNote = async (id)=>{
        await fetch(`http://localhost:4000/api/notes/${id}` , {
            method : 'DELETE',
        })
        fetchNotes()
    }


    useEffect(()=>{
        fetchNotes()
    },[])

    return (
        <>
        
        { show && !editshow &&
            <div className="w-2/3 h-2/3 md:h-2/3 md:w-1/3 shadow-2xl flex flex-col items-center text-start 
            relative mx-auto my-auto py-10">
                <h1 className="text-xl font-bold my-2">CREATE NOTE</h1>
                <label className="my-2 font-semibold text-lg">Title</label>
                <input type="text" className="w-2/3 border-slate-500 border-solid border-[1px] focus:outline-none my-2" value={title} onChange = {(e)=>{setTitle(e.target.value)}}></input>
                <label className="my-2 font-semibold text-lg">Content</label>
                <textarea type="text" size="40" className="h-1/3 w-2/3 flex flex-wrap border-slate-500 border-solid border-[1px] focus:outline-none my-2 resize-none" value={content} onChange = {(e)=>{setContent(e.target.value)}}></textarea>
               <div className="flex space-x-2">
               <button className="bg-green-500 my-2 py-2 px-2 rounded-xl hover:bg-green-700 hover:text-white  " onClick={() => {createNote();setshow(false)}} >Add Note</button>
                <button className="bg-red-500 my-2 py-2 px-5 rounded-xl hover:bg-red-700 hover:text-white " onClick={() => setshow(false)} >Cancel</button>
                </div>
            </div>
        }
        
        {
           editshow && 
            <div className="w-2/3 h-2/3 md:h-2/3 md:w-1/3 shadow-2xl flex flex-col items-center text-start 
            relative mx-auto my-auto py-10">
                <h1 className="text-xl font-bold my-2">EDIT NOTE</h1>
                <label className="my-2 font-semibold text-lg">Title</label>
                <input type="text" className="w-2/3 border-slate-500 border-solid border-[1px] focus:outline-none my-2" value={title} onChange = {(e)=>{setTitle(e.target.value)}}></input>
                <label className="my-2 font-semibold text-lg">Content</label>
                <textarea type="text" size="40" className="h-1/3 w-2/3 flex flex-wrap border-slate-500 border-solid border-[1px] focus:outline-none my-2 resize-none" value={content} onChange = {(e)=>{setContent(e.target.value)}}></textarea>
               <div className="flex space-x-2">
               <button className="bg-green-500 my-2 py-2 px-2 rounded-xl hover:bg-green-700 hover:text-white  " onClick={() => {editNote(Id);seteditshow(false)}} >Save</button>
               </div>
           </div>
        }
        
        { !show && !editshow && <div className="px-10">
        <div className="my-10 underline text-3xl text-center font-bold font-roboto" >MY NOTES</div>
        <div className="flex flex-col md:flex-row items-center md:flex-wrap md:justify-center">
        
        {
            
          notes && notes.map((e,i)=>(
                <NoteCard notetitle={e.title} notecontent={e.content} key={i} id={e._id}/>
          ))
        }
        
        </div>
        <button className=" rounded-full md:p-4 p-2 border-2 border-black bg-slate-200 flex items-center absolute right-4 bottom-4" onClick={()=>setshow(true)}><FaRegStickyNote className="w-5 h-5  md:h-7 md:w-7 " /></button>
        </div>
        }
       
        </>
    );
}

export default Notes
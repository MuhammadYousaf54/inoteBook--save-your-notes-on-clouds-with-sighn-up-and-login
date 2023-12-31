import React ,{useContext,useState}from 'react'
import noteContext from './context/notes/noteContext'

const AddNote = () => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const handleClick =(e)=>{
        e.preventDefault();
addNote(note.title, note.description, note.tag);
setNote({title:"", description:"", tag:""})
    }
    const clickChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
    <h1 >Add a note</h1>
      <div className="container my-3" >
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title"  name="title"  aria-describedby="emailHelp"value={note.title} onChange={clickChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description'value={note.description} onChange={clickChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={clickChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
</>
  )
}

export default AddNote

import React,{useContext} from 'react';
import noteContext from './context/notes/noteContext'

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const {note,updateNote,} = props;
    
  return (
    <div className="col-md-3" >
   <div className="card my-3">
    <div className='card-body'>
    <div className="d-flex align-item-center">
    <h5 className="card-title mx-1">{note.title}</h5>
      <i className="fa-sharp fa-solid fa-trash mx-1 my-3" onClick={()=>{deleteNote(note._id);props.showAlert("delete note successfully","success");}}></i>
    <i className="fa-solid fa-pen-to-square mx-1 my-3"onClick={()=>{updateNote(note)}}></i>
      </div>
    <p className="card-text">{note.description}</p>
    
  </div>
</div>
</div>
  )
}

export default NoteItem;

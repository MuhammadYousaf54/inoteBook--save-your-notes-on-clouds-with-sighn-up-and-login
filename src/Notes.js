import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import noteContext from "./context/notes/noteContext";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem("token")){
      getNotes();

    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const ref = useRef("null");
  const refClose = useRef("null");

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
    });
  };

  const handleClick = (e) => {
    console.log("updating notes", note);
    editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click();
    props.showAlert("update note successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    value={note.title}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={note.description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>This is Your Note</h2>
        {notes &&
          notes.map((notes) => {
            return (
              <NoteItem
                key={notes._id}
                updateNote={updateNote}
                showAlert={props.showAlert}
                note={notes}
              />
            );
          })}
      </div>
    </>
  );
};

export default Notes;

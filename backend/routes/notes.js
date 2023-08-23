const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Note = require('../models/Note');




// route: 1 get all note using : Get "/api/notes/getuser" 
router.get("/fetchallnote",fetchuser, async (req,res)=>{
    try {
        
   
    const note = await Note.find({user:req.user.id})
    res.json(note) } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
});
// route: Add a  note using : post "/api/notes/addnote" 
router.post("/addnote",fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({min: 5}),
], async (req,res)=>{

    try {
        
    
    const errors = validationResult(req);
    const {title , description,tag} = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });


 }
 const note = new Note({
    title, description, tag, user: req.user.id
 })
 const savednote = await note.save();
    res.json(savednote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      } }
);
// Route 3 for update our note using path /api/notes/updatenote:id
router.put('/updatenote/:id',fetchuser, async(req,res)=>{
  try {
    
 
const {title, description, tag} = req.body;
const newNote = {}

if(title){newNote.title = title}
if(description){newNote.description = description}
if(tag){newNote.tag = tag}

let note = await Note.findById(req.params.id);

if(!note){return res.status(400).send('not found');}
if(note.user.toString() !== req.user.id){
  return res.status(404).send('only user can update the note')
}
note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
res.json({note});
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}

});
//Rout4 for deleted the note /api/notes/deletenote:id
router.delete('/deletenote/:id',fetchuser, async(req,res)=>{

try {
  

//find the notes for delete
let note = await Note.findById(req.params.id);
if(!note){return res.status(400).send("invalid note")}
// only user can delete this
if(note.user.toString() !== req.user.id){
  return res.status(400).send("invalid note")
}

note = await Note.findByIdAndDelete(req.params.id)
res.json({"sucess":"note is deleted ",note:note})

} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})

module.exports = router
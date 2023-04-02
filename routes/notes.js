const express = require("express");
const router = express.Router();
const fetchuser = require("../Authenticate/fetchUser");
const { body, validationResult } = require("express-validator");
const note = require("../models/Notes");


// Endpoint 1: Fetching Notes. Using GET request. Login Requied.
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    console.log("ali");
    userId = req.user.id;
    console.log(userId);
    const notes = await note.find({ user: userId });
    res.send(notes);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});


// Endpoint 2: Adding Notes. Using POST request. Login Requied.
router.post( "/addnote", fetchuser,
  [
    body("title", "Title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // IF some validation rule is break it throws error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // const {title, description, tag} = req.body
      console.log("hlo");
      userId = req.user.id;

      const Note = await note.create({
        user: userId,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      res.send(Note);
    } catch (error) {
      res.status(400).send("Something went wrong");
    }
  }
);


// Endpoint 3: Updating Notes. Using PUT request. Login Requied.
router.put( "/updatenote/:id", fetchuser, async (req, res) => {
    try{
    userId = req.user.id
    const {title, description, tag} = req.body

    // Creating a new note Object 
    let newNote = {};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}
    
    console.log(userId);
    // Updating the note
    let Note = await note.findById(req.params.id)
    if (!Note) {
        res.status(401).send("Not found")
    }
        // Validating the user
        if(userId.toString() !== Note.user.toString()){
            res.status(401).send("Not Allowed")
        }

    Note = await note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.send(Note)}
    catch (error) {
        res.status(400).send("Something went wrong");
      }

})


// Endpoint 4: Deleting Notes. Using DELETE request. Login Requied.
router.delete( "/deletenote/:id", fetchuser, async (req, res) => {
    try{
    userId = req.user.id

    console.log("hlo")
    let Note = await note.findById(req.params.id)
    if(!Note){
        res.status(400).send("Not found")
    }

    if(userId.toString() !== Note.user.toString()){
        res.send("Not Allowed")
    }

    Note = await note.findByIdAndDelete(req.params.id)
    res.send("Deleted")}
    catch (error) {
        res.status(400).send("Something went wrong");
      }
})


module.exports = router;

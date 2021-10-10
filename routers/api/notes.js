// Dependencies
const express = require('express');

// Middlewares
const checkLogin = require('../../middlewares/auth/checkLogin');
const {
    createNoteValidation,
    updateNoteValidation,
} = require('../../middlewares/notes/noteValidators');
const checkAccess = require('../../middlewares/notes/checkAccess');
const { serveNotes } = require('../../middlewares/notes/serveResults');

// Controllers
const {
    saveNote,
    getANote,
    getAllNotes,
    updateANote,
    deleteANote,
    deleteAllNotes,
    pinANote,
    bookmarkANote,
} = require('../../controllers/notesControllers');

// Create express router
const notesRouter = express.Router();

// Get all notes
notesRouter.get('/', checkLogin, getAllNotes, serveNotes);

// Get a note
notesRouter.get('/:id', checkLogin, checkAccess, getANote);

// Create a note
notesRouter.post('/', checkLogin, createNoteValidation, saveNote);

// Update a note
notesRouter.put('/:id', checkLogin, checkAccess, updateNoteValidation, updateANote);

// Delete all notes
notesRouter.delete('/all', checkLogin, deleteAllNotes);

// Delete a note
notesRouter.delete('/:id', checkLogin, checkAccess, deleteANote);

// Pin a note
notesRouter.put('/pin/:bool/:id/', checkLogin, checkAccess, pinANote);

// Bookmark a note
notesRouter.put('/bookmark/:bool/:id/', checkLogin, checkAccess, bookmarkANote);

// Export the router object
module.exports = notesRouter;

const noteController= require("./controller/notesController")
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler:noteController.addNotes ,
  },
  {
    method:"GET",
    path:'/notes',
    handler:noteController.fetchNotes
  },
  {
    method:"GET",
    path:'/notes/{noteId}',
    handler:noteController.fetchNote
  },
  {
    method:"PUT",
    path:'/notes/{noteId}',
    handler:noteController.editNote
  },{
    method:"DELETE",
    path:"/notes/{noteId}",
    handler:noteController.deleteNote
  }
];
 
module.exports = routes;
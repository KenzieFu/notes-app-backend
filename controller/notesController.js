const { nanoid } = require("nanoid");

const notes = require("../data/notes")

exports.addNotes = async(request,h)=>{
  const {title,tags,body} = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote={
    id:id,
    title:title,
    createdAt:createdAt,
    body:body,
    tags:tags,
    updatedAt:updatedAt

  } 
  notes.push(newNote);


  const isSuccess = notes.filter ((note)=>note.id ===id).length >0;

  if(isSuccess){
    const response = h.response({
      status:'success',
      message:"Catatan berhasil ditambahkan",
      data:{
        noteId:id
      }
    })
    response.code(201);
    return response;
  }
  const response = h.response(
    {
      status:"fail",
      message:"Catatan Gagal Ditambahkan",
      
    }
  );
  response.code(500);
  return response;
}

exports.fetchNotes =async (request,h)=>{
  const response = h.response({
    status:'success',
    message:"Berhasil Mengambil data",
    data:{
      notes
    }
  });
 response.code(200);
  return response;
}

exports.fetchNote = async(request,h)=>{
  const {noteId}  = request.params;
  console.log(noteId)
  const note = notes.filter(note=>note.id == noteId)[0];

  if(note){
    const response = h.response({
      status:'success',
      message:'Berhasil Menemukan note',
      data:{
        note
      }
    })
    response.code(200);
    return response;
  }

  const response = h.response ({
    status:'fail',
    message:"Failed to fetch Note"
  });
  response.code(404);
  return response;

}

exports.editNote = async(request,h)=>{
  const { noteId} = request.params;
  const {title,tags,body} = request.payload;
  const updatedAt = new Date().toISOString()
  const index = notes.findIndex(note=>note.id ===noteId);
  


  if(index !=-1){
    notes[index]={
      ...notes[index],
      title,
      tags,updatedAt,body
    }
    const response = h.response({
      status:"Success",
      message:"Catatan Berhasil di perbaharui"
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status:'fail',
    message:'Gagal Memperbaharui catatan. Id catatan tidak ditemukan'
  })
  response.code(404);
  return response;
}

exports.deleteNote=(request,h)=>{
  const {noteId} = request.params;
  const  index = notes.findIndex(note=>note.id === noteId);
  if(index != -1){
    notes.splice(-1);
    const response = h.response({
      status:"Success",
      message:"Gagal menghapus note"
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status:'fail',
    message:'Gagal Menghapus note, id tidak ditemukan'
  })
  response.code(404);
  return response;
}
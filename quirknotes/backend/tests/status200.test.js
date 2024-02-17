test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // delete every other notes
  const deleteNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  await deleteNotesRes.json();
  
  // get all notes
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const getAllNotesBody = await getAllNotesRes.json();


  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // delete every other notes
  const deleteNotesRes1 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  await deleteNotesRes1.json();

  // create 2 new notes
  const note1 = {title: "Note1", content: "asdf" };
  const note2 = {title: "Note2", content: "asdfasdf" };

  const postNote1Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note1),
  });
  const postNote1Body = await postNote1Res.json();

  const postNote2Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note2),
  });
  const postNote2Body = await postNote2Res.json();

  // get all notes
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const getAllNotesBody = await getAllNotesRes.json();

  // delete these 2 notes
  const deleteNotesRes2 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  await deleteNotesRes2.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(2);
  expect(getAllNotesBody.response[0].title).toBe("Note1");
  expect(getAllNotesBody.response[1].title).toBe("Note2");
});

test("/deleteNote - Delete a note", async () => {
  // create a note
  const noteToBeDeleted = {
    title: "NoteToBeDeleted",
    content: "I am leaving you, I am so so sorry..."
  };

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteToBeDeleted),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  // delete a note
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  // create a new note
  const oldNote = {title: "Old Title", content: "Make your own future"};
  const newNote = {title: "New Title", content: "Make your own past"};

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oldNote),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  // patch the note
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });

  const patchNoteBody = await patchNoteRes.json();

  // delete the note (avoid influencing the database)
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with just title", async () => {
  // create a new note
  const oldNote = {title: "Old Title", content: "Don't change this"};
  const newNote = {title: "New Title"};

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oldNote),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  // patch the note
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });

  const patchNoteBody = await patchNoteRes.json();

  // delete the note (avoid influencing the database)
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with just content", async () => {
  // create a new note
  const oldNote = {title: "Don't change this", content: "Old Content"};
  const newNote = {content: "New Content"};

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oldNote),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  // patch the note
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });

  const patchNoteBody = await patchNoteRes.json();

  // delete the note (avoid influencing the database)
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/deleteAllNotes - Delete one note", async () => {
  // delete every other notes
  const deleteNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  await deleteNotesRes.json();

  // create a new note
  const Note = {title: "Day1", content: "Happy Cat!"};

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Note),
  });
  const postNoteBody = await postNoteRes.json();

  // delete all notes
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // delete every other notes
  const deleteNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  await deleteNotesRes.json();

  // create 3 new notes
  const Note1 = {title: "Day1", content: "Happy Cat!"};
  const Note2 = {title: "Day2", content: "Happy Dog!"};
  const Note3 = {title: "Day3", content: "Happy Mouse!"};

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Note1),
  });
  const postNoteBody1 = await postNoteRes1.json();

  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Note2),
  });
  const postNoteBody2 = await postNoteRes2.json();

  const postNoteRes3 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Note3),
  });
  const postNoteBody3 = await postNoteRes3.json();

  // delete all notes
  const delete3NotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const deleteNoteBody = await delete3NotesRes.json();

  expect(postNoteRes1.status).toBe(200);
  expect(postNoteBody1.response).toBe("Note added succesfully.");

  expect(postNoteRes2.status).toBe(200);
  expect(postNoteBody2.response).toBe("Note added succesfully.");

  expect(postNoteRes3.status).toBe(200);
  expect(postNoteBody3.response).toBe("Note added succesfully.");

  expect(delete3NotesRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // post a note
  const Note = {title: "Color", content: "We want to test the color"};
  
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Note),
  });

  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId

  // change the color of the note
  const color = "#FF0000"
  console.log(postNoteBody.insertedId)
  const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: color,
      }),
  })

  // delete a note
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const deleteNoteBody = await deleteNoteRes.json();

  const updateNoteColorBody = await updateNoteColorRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(updateNoteColorRes.status).toBe(200);
  expect(updateNoteColorBody.message).toBe("Note color updated successfully.");
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});
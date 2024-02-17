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

  const deleteNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  await deleteNotesRes.json();
  
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

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const getAllNotesBody = await getAllNotesRes.json();

  // delete these 2 notes again
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
  // delete a note
  const noteId = postNoteBody.insertedId;
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
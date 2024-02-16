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

// test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
//   const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     }
//   });

//   await deleteAllNotesRes.json();
//   expect(deleteAllNotesRes.status).toBe(200);

//   const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
//   const getAllNotesBody = await getAllNotesRes.json();

//   expect(getAllNotesRes.status).toBe(200);
//   // Check if the body is an empty array, indicating zero notes for getAllNotes
//   // expect(getAllNotesBody).toEqual();
//   expect(getAllNotesBody.response.length).toBe();
// });

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {

  const deleteNotesRes1 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  await deleteNotesRes1.json();

  const note1 = {title: "Note 1", content: "Content 1" };
  const note2 = {title: "Note 2", content: "Content 2" };

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
 
  const deleteNotesRes2 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  await deleteNotesRes2.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.length).toBe(2);
  expect(getAllNotesBody[0].title).toBe("Note 1");
  expect(getAllNotesBody[1].title).toBe("Note 2");
});

// test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
//   // Clear the database before the test
//   await fetch(`${SERVER_URL}/deleteAllNotes`, {
//     method: "DELETE",
//   });

//   await fetch(`${SERVER_URL}/postNote`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ title: "First", content: "Content1" }),
//   });

//   // Add the second note
//   await fetch(`${SERVER_URL}/postNote`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ title: "Second", content: "Content2" }),
//   });

//   const response = await fetch(`${SERVER_URL}/getAllNotes`);
//   const data = await response.json();

//   // Check that the HTTP status code is 200
//   expect(response.status).toBe(200);

//   // Check that the response contains exactly two notes
//   expect(data.response.length).toBe(2);
// });

//   const postNoteBody_1 = await postNoteRes_1.json();
  
//   expect(postNoteRes_1.status).toBe(200);
//   expect(postNoteBody_1.response).toBe("Note added succesfully.");
  
//   const response = await fetch(`${SERVER_URL}/getAllNotes`);
//   const body = await response.json();
//   expect(response.status).toBe(200);
//   expect(body).toEqual();
// });

// test("/deleteNote - Delete a note", async () => {
//   // Assuming you have a note to delete. Insert it first.
//   const note = await Note.create({ title: "To Delete", content: "Delete me" });
  
//   const response = await request(app).delete(`/deleteNote/${note._id}`);
//   expect(response.statusCode).toBe(200);
//   // Further assertions can be made based on your API's response structure
// });

// test("/patchNote - Patch with content and title", async () => {
//   // Code here
//   expect(false).toBe(true);
// });

// test("/patchNote - Patch with just title", async () => {
//   // Code here
//   expect(false).toBe(true);
// });

// test("/patchNote - Patch with just content", async () => {
//   // Code here
//   expect(false).toBe(true);
// });

// test("/deleteAllNotes - Delete one note", async () => {
//   // Code here
//   expect(false).toBe(true);
// });

// test("/deleteAllNotes - Delete three notes", async () => {
//   // Code here
//   expect(false).toBe(true);
// });

// test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
//   // Code here
//   expect(false).toBe(true);
// });
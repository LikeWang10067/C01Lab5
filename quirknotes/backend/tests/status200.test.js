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
  const response = await fetch(`${SERVER_URL}/getAllNotes`);
  const body = await response.json();

  expect(response.status).toBe(200);
  // Check if the body is an empty array, indicating zero notes for getAllNotes
  expect(body).toEqual({"response": []});
});

// test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
//   // Insert two notes into the database before the request
//   await Note.insertMany([{ title: "Note 1", content: "Content 1" }, { title: "Note 2", content: "Content 2" }]);
  
//   const response = await request(app).get('/getAllNotes');
//   expect(response.statusCode).toBe(200);
//   expect(response.body.length).toBe(2);
//   // Optionally, check for content of the notes
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
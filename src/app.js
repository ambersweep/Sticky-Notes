const stickynotes = document.getElementById("app");
const noteButton = stickynotes.querySelector(".add__note");

//inserts note on page when new note is made
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  stickynotes.insertBefore(noteElement, noteButton);
});

//calls on add note when add note button is clicked
noteButton.addEventListener("click", () => addNote());

//gets notes from local storage. if no notes returns empty array
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// saves a note to local storage and turns it into stringified JSON
function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

//creates a new note on screen
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = ". . . ✏️";

  //calls on update handler
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  //calls on delete handler on double click
  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you want to delete this note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

//adds note to notes Object
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: (Math.random() * 1000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  stickynotes.insertBefore(noteElement, noteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

//updates note in local storage
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

//deletes note from screen and local storage
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  stickynotes.removeChild(element);
}

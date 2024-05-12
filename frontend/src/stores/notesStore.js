import { defineStore } from 'pinia'
export const useNotesStore = defineStore('allNotes', {
  state: () => ({
    notes: []
  }),
  // Mutations to update the notes
  actions: {
    setNotes(data) {
      if (!this.notes.length) {
        this.notes.push(data)
      }
    },
    addNotes(newNote) {
      // this.notes[0].push(newNote)
      // adding the latest created note to the start of an array
      this.notes[0].unshift(newNote)
    },
    removeNotes(noteId) {
      this.notes[0] = this.notes[0].filter((note) => note._id !== noteId)
    },
    updateNotes(noteId, noteTitle, noteContent) {
      const updateNote = this.notes[0].find((note) => note._id === noteId)
      updateNote.title = noteTitle
      updateNote.content = noteContent
    },
    updateNotePrivacy(noteId, notePrivacy) {
      const updateNote = this.notes[0].find((note) => note._id === noteId)
      updateNote.privacy = notePrivacy
    }
  }
})

import { defineStore } from 'pinia'
export const useNotesStore = defineStore('allNotes', {
  state: () => ({
    notes: []
  }),
  // Mutations to update the tasks
  actions: {
    setNotes(data) {
      if (!this.notes.length) {
        this.notes.push(data)
      }
    },
    addNotes(newNote) {
      this.notes[0].push(newNote)
    },
    removeNotes(noteId) {
      this.notes = this.notes.filter((note) => note.id !== noteId)
    }
  }
})

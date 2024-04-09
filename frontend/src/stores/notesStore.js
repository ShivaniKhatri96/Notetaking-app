import { defineStore } from 'pinia'
export const useNotesStore = defineStore('allNotes', {
  state: () => ({
    notes: []
  }),
  // Mutations to update the tasks
  actions: {
    addNotes(note) {
      this.notes.push(...note)
    },
    removeNotes(noteId) {
      this.notes = this.notes.filter((note) => note.id !== noteId)
    }
  }
})

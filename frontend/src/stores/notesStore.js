import { defineStore } from 'pinia';
export const useNotesStore = defineStore('allNotes', {
    state: () => ({
      notes: [],
    }),
      // Mutations to update the tasks
      actions: {
        addNote(note) {
            this.notes.push(note);
        },
        removeNote(noteId) {
            this.notes = this.notes.filter((note) => note.id !== noteId);
        }
      }
  })
  
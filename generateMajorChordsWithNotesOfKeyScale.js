import { Interval, Key, Note } from '@tonaljs/tonal'
import { addNoteEvent } from './addNoteEvent.js'
import { createTrack } from './createTrack.js'
import { saveMIDI } from './saveMIDI.js'

const track = createTrack()

const key = Key.majorKey('C')

for (const noteName of key.scale) {
  const rootNote = Note.get(noteName + '4')
  const note2 = Note.transpose(rootNote, Interval.fromSemitones(4))
  const note3 = Note.transpose(rootNote, Interval.fromSemitones(7))
  addNoteEvent(track, [rootNote.name, note2, note3])
}

await saveMIDI('midi.mid', track)

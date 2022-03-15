import { nOutOfWithDuplicates } from '@sanjo/array'
import { Scale } from '@tonaljs/tonal'
import { addNoteEvent } from './addNoteEvent.js'
import { createTrack } from './createTrack.js'
import { saveMIDI } from './saveMIDI.js'

const track = createTrack()

const numberOfNotes = 2

const scale = Scale.get('C major')
const toneSequences = nOutOfWithDuplicates(numberOfNotes, scale.notes)
for (const toneSequence of toneSequences) {
  for (const tone of toneSequence) {
    addNoteEvent(track, [tone + '4'])
  }
}

await saveMIDI('midi.mid', track)

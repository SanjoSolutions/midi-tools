import fs from 'fs/promises'
import MIDIWriter from 'midi-writer-js'
import { Scale } from '@tonaljs/tonal'
import { nOutOfWithDuplicates } from '@sanjo/array'

const track = new MIDIWriter.Track()
track.addEvent(new MIDIWriter.ProgramChangeEvent({ instrument: 1 }))

function addNote(tone) {
  const note = new MIDIWriter.NoteEvent({
    pitch: [tone],
    duration: '8',
    velocity: 100,
  })
  track.addEvent(note)
}

const numberOfNotes = 2

const scale = Scale.get('C major')
const toneSequences = nOutOfWithDuplicates(numberOfNotes, scale.notes)
for (const toneSequence of toneSequences) {
  for (const tone of toneSequence) {
    addNote(tone + '4')
  }
}

await saveMIDI('midi.mid', track)

async function saveMIDI(fileName, track) {
  const write = new MIDIWriter.Writer(track)
  const data = write.buildFile()
  await fs.writeFile(fileName, data)
}

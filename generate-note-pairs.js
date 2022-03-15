import fs from 'fs/promises'
import MIDIWriter from 'midi-writer-js'
import { Scale } from '@tonaljs/tonal'

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

const scale = Scale.get('C major')
for (const tone1 of scale.notes) {
  for (const tone2 of scale.notes) {
    addNote(tone1 + '4')
    addNote(tone2 + '4')
  }
}

await saveMIDI('midi.mid', track)

async function saveMIDI(fileName, track) {
  const write = new MIDIWriter.Writer(track)
  const data = write.buildFile()
  await fs.writeFile(fileName, data)
}

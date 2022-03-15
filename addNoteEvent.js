import MIDIWriter from 'midi-writer-js'

export function addNoteEvent(track, pitch) {
  const note = new MIDIWriter.NoteEvent({
    pitch,
    duration: '8',
    velocity: 100,
  })
  track.addEvent(note)
}

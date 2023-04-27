import MIDIWriter from 'midi-writer-js'

export function addNoteEvent(track, pitch, duration = '8', wait = '0') {
  const note = new MIDIWriter.NoteEvent({
    pitch,
    duration,
    wait,
    velocity: 100,
  })
  track.addEvent(note)
}

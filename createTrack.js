import MIDIWriter from 'midi-writer-js'

export function createTrack() {
  const track = new MIDIWriter.Track()
  track.addEvent(new MIDIWriter.ProgramChangeEvent({ instrument: 1 }))
  return track
}

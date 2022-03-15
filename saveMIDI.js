import fs from 'fs/promises'
import MIDIWriter from 'midi-writer-js'

export async function saveMIDI(fileName, track) {
  const write = new MIDIWriter.Writer(track)
  const data = write.buildFile()
  await fs.writeFile(fileName, data)
}

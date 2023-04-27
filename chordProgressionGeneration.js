import { last } from "@sanjo/array"
import { Scale } from "@tonaljs/tonal"
import { addNoteEvent } from "./addNoteEvent.js"
import { createTrack } from "./createTrack.js"
import { saveMIDI } from "./saveMIDI.js"

const scale = Scale.get("C major")

const canFollow = new Map([
  [1, new Set([2, 3, 4, 5, 6, 7])],
  [2, new Set([1, 5, 7])],
  [3, new Set([6])],
  [4, new Set([1, 5, 7])],
  [5, new Set([1, 3, 6])],
  [6, new Set([2, 4])],
  [7, new Set([1, 3, 6])],
])

function nOutOfWithDuplicates(n) {
  let sequences = [[]]
  for (let i = 1; i <= n; i++) {
    const nextSequences = []
    for (const sequence of sequences) {
      let array
      if (sequence.length === 0) {
        array = [1]
      } else {
        const set = canFollow.get(last(sequence))
        if (sequence.length < n - 1) {
          set.delete(1)
        }
        array = Array.from(set)
      }
      for (const element of array) {
        nextSequences.push([...sequence, element])
      }
    }
    sequences = nextSequences
  }
  return sequences
}

const track = createTrack()

let isFirstSequence = true

for (let length = 2; length <= 8; length++) {
  const sequences = nOutOfWithDuplicates(length)

  for (const sequence of sequences) {
    let isFirstNumber = true
    for (const number of sequence) {
      const pitch = [
        scale.notes[number - 1] + "4",
        scale.notes[(number + 2 - 1) % 7] + "4",
        scale.notes[(number + 4 - 1) % 7] + "4",
      ]
      addNoteEvent(track, pitch, "4", isFirstSequence || !isFirstNumber ? '0' : '4')

      isFirstNumber = false
    }

    isFirstSequence = false
  }
}

await saveMIDI("midi.mid", track)

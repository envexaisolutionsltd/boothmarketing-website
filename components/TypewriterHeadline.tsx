'use client'

import { useEffect, useState } from 'react'

const phrases = [
  'copying data between systems.',
  'chasing customer enquiries.',
  'preparing repetitive documents.',
  'updating spreadsheets manually.',
  'checking the same information twice.',
] as const

type Phase = 'holding' | 'deleting' | 'typing'
type Frame = { phrase: number; characters: number; phase: Phase }

const initialFrame: Frame = { phrase: 0, characters: phrases[0].length, phase: 'holding' }

function advance(frame: Frame): Frame {
  const phrase = phrases[frame.phrase]
  if (frame.phase === 'holding') return { ...frame, phase: 'deleting' }
  if (frame.phase === 'deleting') {
    if (frame.characters > 0) return { ...frame, characters: frame.characters - 1 }
    return { phrase: (frame.phrase + 1) % phrases.length, characters: 0, phase: 'typing' }
  }
  if (frame.characters < phrase.length) return { ...frame, characters: frame.characters + 1 }
  return { ...frame, phase: 'holding' }
}

function delayFor(frame: Frame) {
  if (frame.phase === 'holding') return 2300
  if (frame.phase === 'deleting') return frame.characters === 0 ? 300 : 45
  return 65
}

export default function TypewriterHeadline() {
  const [frame, setFrame] = useState<Frame>(initialFrame)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(preference.matches)
    sync()
    preference.addEventListener?.('change', sync)
    return () => preference.removeEventListener?.('change', sync)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const timeout = window.setTimeout(() => setFrame(advance), delayFor(frame))
    return () => window.clearTimeout(timeout)
  }, [frame, reducedMotion])

  const text = reducedMotion ? phrases[0] : phrases[frame.phrase].slice(0, frame.characters)

  return (
    <span className="relative grid min-w-0 text-[#c6c6c6]">
      {/* All phrases share one grid cell, reserving the tallest wrapped layout at every width. */}
      {phrases.map(phrase => (
        <span key={phrase} aria-hidden="true" className="invisible col-start-1 row-start-1 block min-w-0">
          on {phrase}
        </span>
      ))}
      <span aria-hidden="true" className="col-start-1 row-start-1 block min-w-0">
        on <span className="text-[#e6e6e6]">{text}</span>
        {!reducedMotion && <span className="ml-1 inline-block h-[.75em] w-[2px] animate-pulse bg-[#d92f3c] align-middle" />}
      </span>
      <span className="sr-only">on repetitive manual work.</span>
    </span>
  )
}

'use client'
import { useEffect, useState } from 'react'

const phrases = [
  'copying data between systems.',
  'chasing customer enquiries.',
  'preparing repetitive documents.',
  'updating spreadsheets manually.',
  'checking the same information twice.',
]

export default function TypewriterHeadline() {
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const phrase = phrases[index]
    const delay = deleting ? (length === 0 ? 300 : 45) : (length >= phrase.length ? 2300 : 65)
    const timer = window.setTimeout(() => {
      if (!deleting && length >= phrase.length) {
        setDeleting(true)
      } else if (deleting && length === 0) {
        setIndex(i => (i + 1) % phrases.length)
        setDeleting(false)
      } else {
        setLength(n => Math.max(0, Math.min(phrase.length, n + (deleting ? -1 : 1))))
      }
    }, delay)
    return () => window.clearTimeout(timer)
  }, [index, length, deleting, reducedMotion])

  const visible = reducedMotion ? phrases[0] : phrases[index].slice(0, length)

  return (
    <span className="block relative min-h-[3.1em] sm:min-h-[2.1em] lg:min-h-[1.2em] text-[#c6c6c6]">
      <span className="sr-only">on repetitive manual work.</span>
      <span aria-hidden="true">
        on <span className="text-[#e6e6e6]">{visible}</span>
        {!reducedMotion && <span className="ml-1 inline-block h-[.75em] w-[2px] animate-pulse bg-[#d92f3c] align-middle" />}
      </span>
    </span>
  )
}

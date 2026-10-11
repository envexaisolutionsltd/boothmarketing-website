const phrases = [
  'copying data between systems.',
  'chasing customer enquiries.',
  'preparing repetitive documents.',
  'updating spreadsheets manually.',
  'checking the same information twice.',
]

/**
 * CSS-driven animation: works without client-side hydration or JavaScript timers.
 * Reduced-motion users see the first complete phrase.
 */
export default function TypewriterHeadline() {
  return (
    <span className="booth-rotating-headline relative grid min-w-0 text-[#c6c6c6]">
      {phrases.map((phrase, index) => (
        <span
          key={phrase}
          aria-hidden="true"
          className="booth-rotating-phrase col-start-1 row-start-1 block min-w-0"
          style={{ animationDelay: `${index * 4}s` }}
        >
          on <span className="text-[#e6e6e6]">{phrase}</span>
          <span className="booth-rotating-cursor ml-1 inline-block h-[.75em] w-[2px] bg-[#d92f3c] align-middle" />
        </span>
      ))}
      <span className="sr-only">on repetitive manual work.</span>
    </span>
  )
}

import Link from 'next/link'

type BoothLogoProps = {
  className?: string
  priorityLabel?: string
}

export default function BoothLogo({ className = 'w-[108px] sm:w-[148px]', priorityLabel = 'Booth Marketing home' }: BoothLogoProps) {
  return <Link href="/" aria-label={priorityLabel} className="inline-flex min-w-0 items-center"><img src="/booth-marketing-logo.png" alt="Booth Marketing" className={`block h-auto max-w-full object-contain ${className}`} /></Link>
}

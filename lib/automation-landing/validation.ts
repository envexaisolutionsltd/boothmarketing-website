export type AuditField = 'fullName' | 'businessName' | 'email' | 'phone' | 'challenge'
export type AuditValues = Record<AuditField, string>
export type AuditErrors = Partial<Record<AuditField, string>>
export const emptyAuditValues: AuditValues = { fullName: '', businessName: '', email: '', phone: '', challenge: '' }
const count = (s: string) => Array.from(s).length
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
export function validateAudit(values: AuditValues): AuditErrors {
  const errors: AuditErrors = {}
  const name = values.fullName.trim()
  const business = values.businessName.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const challenge = values.challenge.trim()
  if (count(name) < 2 || count(name) > 100) errors.fullName = 'Enter your full name (2–100 characters).'
  if (count(business) < 2 || count(business) > 150) errors.businessName = 'Enter your business name (2–150 characters).'
  if (!emailPattern.test(email) || count(email) > 254) errors.email = 'Enter a valid email address (up to 254 characters).'
  if (count(phone) > 30) errors.phone = 'Keep the phone number to 30 characters or fewer.'
  if (count(challenge) < 10 || count(challenge) > 1500) errors.challenge = 'Describe the challenge in 10–1,500 characters.'
  return errors
}

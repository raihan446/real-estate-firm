import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Check, Mail, MapPin, Phone } from 'lucide-react'
import { createRateLimiter } from '../lib/rateLimit'

const sanitize = (value: string) => value.replace(/[<>]/g, '').trim()
export const inquirySchema = z.object({
  name: z.string().transform(sanitize).pipe(z.string().min(2, 'Please enter your full name.').max(100)),
  email: z.string().transform(sanitize).pipe(z.string().email('Please enter a valid email address.').max(254)),
  phone: z.string().transform(sanitize).pipe(z.string().max(30, 'Phone number is too long.')).optional(),
  propertyType: z.enum(['Villa', 'Penthouse', 'Investment Estate']).optional(),
  message: z.string().transform(sanitize).pipe(z.string().min(10, 'Please add a message of at least 10 characters.').max(2000)),
})
export type InquiryValues = z.input<typeof inquirySchema>
type FormStatus = 'idle' | 'loading' | 'success' | 'rate-limited' | 'error'

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const limiter = useRef(createRateLimiter(3, 60_000))
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryValues>({ resolver: zodResolver(inquirySchema), defaultValues: { name: '', email: '', phone: '', propertyType: undefined, message: '' } })
  const submit = handleSubmit(values => {
    if (!limiter.current.isAllowed()) { setStatus('rate-limited'); return }
    setStatus('loading')
    window.setTimeout(() => { void values; reset(); setStatus('success') }, 850)
  }, () => setStatus('error'))
  const message = status === 'loading' ? 'Sending your private inquiry.' : status === 'success' ? 'Thank you. Your inquiry has been received.' : status === 'rate-limited' ? 'Too many inquiries. Please wait one minute before trying again.' : status === 'error' ? 'Please review the highlighted fields and try again.' : ''
  return <section id="contact" className="contact section"><div className="contact-info"><p className="eyebrow">Private client services</p><h2>Begin a <i>conversation.</i></h2><p className="body-copy">Your next chapter deserves an exceptional beginning. Our advisors are ready when you are.</p><div className="contact-details"><p><MapPin size={18}/><span>18 Grosvenor Square<br/>London W1K 6LF</span></p><p><Phone size={18}/><a href="tel:+442079460228">+44 (0) 20 7946 0228</a></p><p><Mail size={18}/><a href="mailto:private@aurarealestate.com">private@aurarealestate.com</a></p></div><div className="map" aria-label="AURA Real Estate office location map"><span>Mayfair, London</span><b>+</b></div></div><form className="inquiry-form" onSubmit={submit} noValidate><h3>Private inquiry</h3><div className="form-row"><label>Name<input {...register('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder=" " /></label><label>Email<input {...register('email')} type="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder=" " /></label></div><div className="form-row"><label>Phone<input {...register('phone')} type="tel" placeholder=" " /></label><label>Preferred property<select {...register('propertyType')} defaultValue=""><option value="" disabled>Select type</option><option>Villa</option><option>Penthouse</option><option>Investment Estate</option></select></label></div><label>How may we help?<textarea {...register('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} rows={5} placeholder=" " /></label><div className="field-errors" aria-live="polite" aria-atomic="true"><span id="name-error">{errors.name?.message}</span><span id="email-error">{errors.email?.message}</span><span id="message-error">{errors.message?.message}</span></div><p className={`form-message ${status === 'success' ? 'success' : status === 'error' || status === 'rate-limited' ? 'error' : ''}`} aria-live="polite" aria-atomic="true">{status === 'success' && <Check size={17}/>} {message}</p><button className="button button-dark submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Sending inquiry…' : 'Send private inquiry'}</button><p className="form-note">By submitting, you consent to our processing of your information in accordance with our privacy notice.</p></form></section>
}

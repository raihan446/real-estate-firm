import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ContactSection, inquirySchema } from './ContactSection'

describe('ContactSection', () => {
  it('rejects invalid inquiry data through the Zod schema', () => {
    expect(inquirySchema.safeParse({ name: 'A', email: 'bad', phone: '', message: 'short' }).success).toBe(false)
  })
  it('announces validation feedback for an empty form', async () => {
    const user = userEvent.setup()
    render(<ContactSection />)
    await user.click(screen.getByRole('button', { name: 'Send private inquiry' }))
    expect(await screen.findByText('Please review the highlighted fields and try again.')).toBeInTheDocument()
    expect(screen.getByText('Please enter your full name.')).toBeInTheDocument()
  })
})

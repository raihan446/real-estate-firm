import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('Header mobile drawer', () => {
  it('traps focus, supports Escape, restores focus, and releases scroll lock', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const trigger = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Mobile navigation' })
    expect(document.body.style.overflow).toBe('hidden')
    const close = within(dialog).getByRole('button', { name: 'Close navigation menu' })
    expect(close).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(within(dialog).getByRole('link', { name: 'Make an inquiry' })).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })
})

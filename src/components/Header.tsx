import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [{ href: '#about', label: 'Our Story' }, { href: '#properties', label: 'Properties' }, { href: '#contact', label: 'Private Client' }]
const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFirstItem = window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 0)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return }
      if (event.key !== 'Tab' || !menuRef.current) return
      const items = [...menuRef.current.querySelectorAll<HTMLElement>(focusableSelector)]
      const first = items[0]; const last = items.at(-1)
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => { window.clearTimeout(focusFirstItem); document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = originalOverflow; previousFocusRef.current?.focus() }
  }, [open])

  const closeMenu = () => setOpen(false)
  return <header className="header"><a className="brand" href="#top" aria-label="Aura Real Estate home">AURA<span>REAL ESTATE</span></a><nav className="nav" aria-label="Main navigation">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav><a className="header-cta" href="#contact">Make an inquiry</a><button ref={triggerRef} className="menu-button" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>{open && <div className="mobile-menu" id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Mobile navigation"><div className="mobile-menu__panel"><button data-autofocus className="close" type="button" onClick={closeMenu} aria-label="Close navigation menu"><X /></button><a className="brand" href="#top" onClick={closeMenu} aria-label="Aura Real Estate home">AURA<span>REAL ESTATE</span></a><nav aria-label="Mobile navigation">{links.map(link => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}<a className="mobile-menu__cta" href="#contact" onClick={closeMenu}>Make an inquiry</a></nav></div></div>}</header>
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks, site, waLink } from '@/lib/site';
import { Icon } from './Icons';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Image src="/logo.jpeg" alt="Logo AGROPHARMA TCHAD" width={120} height={120} priority style={{ height: 46, width: 'auto' }} />
          <span className="brand-text">
            <strong>AGROPHARMA TCHAD</strong>
            <span>Le choix de la qualité</span>
          </span>
        </Link>

        <nav className={`nav ${open ? 'open' : ''}`}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-cta">
          <a href={waLink()} className="btn btn-primary btn-desktop" target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} /> Devis gratuit
          </a>
          <button
            className={`menu-toggle ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

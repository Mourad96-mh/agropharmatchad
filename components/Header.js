'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/site';
import { useContent } from '@/components/content/ContentProvider';
import { Icon } from './Icons';

export default function Header() {
  const { categories, wa } = useContent();
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState(false);
  const pathname = usePathname();
  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const closeAll = () => {
    setOpen(false);
    setSubmenu(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={closeAll}>
          <Image src="/logo.jpeg" alt="Logo AGROPHARMA TCHAD" width={120} height={120} priority style={{ height: 46, width: 'auto' }} />
          <span className="brand-text">
            <strong>AGROPHARMA TCHAD</strong>
            <span>Le choix de la qualité</span>
          </span>
        </Link>

        <nav className={`nav ${open ? 'open' : ''}`}>
          {navLinks.map((l) => {
            // Le menu « Produits » déroule la liste des gammes.
            if (l.href === '/produits') {
              return (
                <div key={l.href} className={`nav-item has-dropdown ${submenu ? 'open' : ''}`}>
                  <span className="nav-item-row">
                    <Link
                      href={l.href}
                      className={isActive(l.href) ? 'active' : ''}
                      onClick={closeAll}
                    >
                      {l.label}
                    </Link>
                    <button
                      type="button"
                      className="nav-caret"
                      aria-label="Afficher les gammes de produits"
                      aria-expanded={submenu}
                      onClick={() => setSubmenu((v) => !v)}
                    >
                      <Icon name="chevron" size={16} />
                    </button>
                  </span>
                  <div className="nav-dropdown">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/produits/${c.slug}`}
                        className={pathname === `/produits/${c.slug}` ? 'active' : ''}
                        onClick={closeAll}
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                className={isActive(l.href) ? 'active' : ''}
                onClick={closeAll}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-cta">
          <a href={wa()} className="btn btn-primary btn-desktop" target="_blank" rel="noopener noreferrer">
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

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, clearToken } from './api';

// Habillage de l'admin : garde d'authentification + navigation.
// Rendu en plein écran (overlay) pour masquer l'en-tête / pied de page du site public.
export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isLogin = pathname === '/admin/login';

  // Masque l'en-tête / pied de page du site public tant que l'admin est affiché.
  useEffect(() => {
    document.body.classList.add('admin-active');
    return () => document.body.classList.remove('admin-active');
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token && !isLogin) {
      router.replace('/admin/login');
      return;
    }
    if (token && isLogin) {
      router.replace('/admin');
      return;
    }
    setReady(true);
  }, [pathname, isLogin, router]);

  if (isLogin) {
    return <div className="admin-root admin-auth">{children}</div>;
  }

  if (!ready) {
    return (
      <div className="admin-root admin-auth">
        <p>Chargement…</p>
      </div>
    );
  }

  function logout() {
    clearToken();
    router.replace('/admin/login');
  }

  const navItems = [
    { href: '/admin', label: 'Tableau de bord' },
    { href: '/admin/produits', label: 'Produits' },
    { href: '/admin/conseils', label: 'Conseils' },
    { href: '/admin/parametres', label: 'Paramètres' },
  ];

  return (
    <div className="admin-root admin-layout">
      <aside className="admin-nav">
        <div className="admin-brand">
          AGROPHARMA <span>Admin</span>
        </div>
        <nav>
          {navItems.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={pathname === it.href ? 'active' : ''}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <button className="admin-logout" onClick={logout}>
          Se déconnecter
        </button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

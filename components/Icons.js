// Icônes SVG inline (pas de dépendance externe).
export function Icon({ name, className = '', size = 24 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  };
  switch (name) {
    case 'seed':
      return (
        <svg {...props}>
          <path d="M4 20c8 0 12-5 12-12 0-1-.1-2-.3-3C9 5 4 9 4 16v4Z" />
          <path d="M4 20C4 12 9 8 16 8" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 3 5 6v5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'drop':
      return (
        <svg {...props}>
          <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
          <path d="M9 15a3 3 0 0 0 3 3" />
        </svg>
      );
    case 'bag':
      return (
        <svg {...props}>
          <path d="M7 4h10l2 4v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8l2-4Z" />
          <path d="M5 8h14M10 12h4" />
        </svg>
      );
    case 'tool':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.5 2.5-1.4-1.4 2.5-2.5Z" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...props}>
          <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L19 12l4 1.5V17a2 2 0 0 1-2 2A16 16 0 0 1 5 6a2 2 0 0 1 0-2Z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.5 4 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.3-.2Z" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...props}>
          <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props}>
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'chevron':
      return (
        <svg {...props}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...props}>
          <path d="M4 20C4 10 11 4 20 4c0 9-6 16-16 16Z" />
          <path d="M9 15c3-3 6-4 9-5" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...props}>
          <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
          <circle cx="7" cy="18" r="1.5" />
          <circle cx="17" cy="18" r="1.5" />
        </svg>
      );
    case 'star':
      return (
        <svg {...props}>
          <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.5 9.2l5.9-.9L12 3Z" />
        </svg>
      );
    case 'users':
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" />
        </svg>
      );
    case 'quote':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M7 6c-2.2 0-4 1.8-4 4v8h7v-7H6c0-1.1.9-2 2-2V6Zm10 0c-2.2 0-4 1.8-4 4v8h7v-7h-4c0-1.1.9-2 2-2V6Z" />
        </svg>
      );
    case 'map':
      return (
        <svg {...props}>
          <path d="m9 4 6 2 5-2v14l-5 2-6-2-5 2V6l5-2Z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case 'book':
      return (
        <svg {...props}>
          <path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2V5Z" />
          <path d="M4 19a2 2 0 0 1 2-2h13" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...props}>
          <path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z" />
        </svg>
      );
    default:
      return null;
  }
}

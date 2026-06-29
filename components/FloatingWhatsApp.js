'use client';

import { useContent } from '@/components/content/ContentProvider';
import { Icon } from './Icons';

export default function FloatingWhatsApp() {
  const { wa } = useContent();
  return (
    <a
      href={wa()}
      className="fab-wa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
    >
      <Icon name="whatsapp" size={30} />
    </a>
  );
}

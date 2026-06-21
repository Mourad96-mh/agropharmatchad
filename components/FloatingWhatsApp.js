import { waLink } from '@/lib/site';
import { Icon } from './Icons';

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      className="fab-wa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
    >
      <Icon name="whatsapp" size={30} />
    </a>
  );
}

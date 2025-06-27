import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Link
        href="https://wa.me/573001234567" // reemplazá con tu número real
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--hoverColor)] hover:bg-green-600 shadow-lg transition-transform duration-200 hover:scale-105"
      >
        <FaWhatsapp size={24} className="text-white" />
      </Link>
    </div>
  );
}

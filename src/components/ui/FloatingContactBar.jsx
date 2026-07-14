import { useState } from 'react';
import './FloatingContactBar.css';
import { contactInfo } from '../../data/content';

function FloatingContactBar() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneDigits = contactInfo.phone ? contactInfo.phone.replace(/\D/g, '') : '0909123456';
  const contacts = [
    {
      icon: '💬',
      label: 'Messenger',
      href: 'https://m.me/Nghe Con Lớn',
      color: '#0084FF',
    },
    {
      icon: '💚',
      label: 'Zalo',
      href: `https://zalo.me/${phoneDigits}`,
      color: '#009EFF',
    },
    {
      icon: '☎️',
      label: 'Hotline',
      href: `tel:${phoneDigits}`,
      color: '#FF6B6B',
    },
  ];

  return (
    <div className="floating-contact-bar">
      {isOpen && (
        <div className="floating-contact-items">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="floating-contact-item"
              style={{ backgroundColor: contact.color }}
              title={contact.label}
            >
              <span className="fs-5">{contact.icon}</span>
              <span className="floating-contact-label">{contact.label}</span>
            </a>
          ))}
        </div>
      )}

      <button
        className="floating-contact-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open contact options"
      >
        <span className="fs-4">💬</span>
      </button>
    </div>
  );
}

export default FloatingContactBar;

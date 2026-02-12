import React from 'react';
import Image from 'next/image';
import '@/styles/components/projectdetails/LightBox.css';

interface LightboxProps {
  imageSrc: string | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <Image src={imageSrc} alt="Agrandissement" fill style={{ objectFit: 'contain' }} unoptimized/>
        <button className="lightbox-close" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};

export default Lightbox;
import React, { useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { RxCross2 } from "react-icons/rx";
import { createPortal } from 'react-dom';
import '@/styles/components/projectdetails/ProjectGallery.css';
import { useT } from '@/hooks/useT';

interface ProjectGalleryProps {
  gallery: string[];
}

const ArrowIcon: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => {
  const rotate = direction === 'left' ? 180 : 0;

  return (
    <svg
      className="gallery-modal__arrowIcon"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M9 18l6-6-6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ gallery }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const { t } = useT();

  const openImage = useMemo(() => {
    if (openIndex === null) return null;
    return gallery?.[openIndex] ?? null;
  }, [openIndex, gallery]);

  const close = useCallback(() => setOpenIndex(null), []);

  const goPrev = useCallback((e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setOpenIndex((idx) => {
      if (idx === null) return null;
      return (idx - 1 + gallery.length) % gallery.length;
    });
  }, [gallery.length]);

  const goNext = useCallback((e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setOpenIndex((idx) => {
      if (idx === null) return null;
      return (idx + 1) % gallery.length;
    });
  }, [gallery.length]);

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openIndex, close, goPrev, goNext]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="gallery-section">
      <h3 className="section-title">{t("projects.project.preview")}</h3>

      <div className="gallery-grid">
        {gallery.map((imgUrl, index) => (
          <button
            key={index}
            type="button"
            data-cursor="pointer"
            className={`gallery-item item-${index}`}
            onClick={() => setOpenIndex(index)}
            aria-label={`Ouvrir l'image ${index + 1}`}
          >
            <Image src={imgUrl} alt={`Vue ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} unoptimized/>
          </button>
        ))}
      </div>

      {openImage &&
        createPortal(
          <div
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Galerie d'images"
            onClick={close}
          >
            <button
              type="button"
              data-cursor="pointer"
              className="gallery-modal__close"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Fermer"
            >
              <RxCross2 />
            </button>

            {gallery.length > 1 && (
              <button
                type="button"
                data-cursor="pointer"
                className="gallery-modal__nav gallery-modal__nav--left"
                onClick={goPrev}
                aria-label="Image précédente"
              >
                <ArrowIcon direction="left" />
              </button>
            )}

            <div className="gallery-modal__image-wrapper">
              <Image
                className="gallery-modal__image"
                src={openImage}
                alt="Image en grand"
                onClick={(e) => e.stopPropagation()}
                fill
                sizes="90vw"
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </div>

            {gallery.length > 1 && (
              <button
                type="button"
                data-cursor="pointer"
                className="gallery-modal__nav gallery-modal__nav--right"
                onClick={goNext}
                aria-label="Image suivante"
              >
                <ArrowIcon direction="right" />
              </button>
            )}
          </div>,
          document.body
        )}
    </section>
  );
};

export default ProjectGallery;
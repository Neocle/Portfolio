"use client";

import React, { useState, useEffect, useRef } from 'react';
import '@/styles/components/common/Navbar.css';
import { FaRegMoon, FaBars, FaTimes, FaCheck } from 'react-icons/fa';
import { useT } from '@/hooks/useT';
import TransitionLink from '@/components/common/TransitionLink';
import { useTransition } from '@/hooks/useTransition';

const SUPPORTED_LANGUAGES = [
  { code: 'fr', label: 'navbar.languages.fr_FR' },
  { code: 'en', label: 'navbar.languages.en_US' },
  { code: 'es', label: 'navbar.languages.es_ES' },
  { code: 'de', label: 'navbar.languages.de_DE' },
];

const Navbar: React.FC = () => {
  const { t, changeLanguage, currentLanguage } = useT();
  const { triggerTransition } = useTransition();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleLangChange = (lang: string) => {
    if (lang === currentLanguage) return;

    setIsLangOpen(false);

    triggerTransition(() => {
      changeLanguage(lang);
    });
  };

  const handleThemeChange = () => {
    triggerTransition(() => {
      const root = document.documentElement;
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <TransitionLink href={`/${currentLanguage}`} className="logo" data-cursor="pointer" onClick={closeMenu}>
        LA::<span className="blue-text">main();</span>
      </TransitionLink>

      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <TransitionLink href={`/${currentLanguage}/about`} data-cursor="pointer" onClick={closeMenu}>{t("navbar.sections.about")}</TransitionLink>
        <TransitionLink href={`/${currentLanguage}/projects`} data-cursor="pointer" onClick={closeMenu}>{t("navbar.sections.projects")}</TransitionLink>
        <TransitionLink href={`/${currentLanguage}/exp`} data-cursor="pointer" onClick={closeMenu}>{t("navbar.sections.experiences")}</TransitionLink>
        <TransitionLink href={`/${currentLanguage}/contact`} data-cursor="pointer" onClick={closeMenu}>{t("navbar.sections.contact")}</TransitionLink>
      </div>

      <div className="nav-actions">
        <div className="lang-selector" ref={langMenuRef}>
          <button
            className={`icon-btn lang-trigger ${isLangOpen ? 'active' : ''}`}
            onClick={() => setIsLangOpen(!isLangOpen)}
            data-cursor="pointer"
          >
            {'// ' + currentLanguage}
          </button>

          {isLangOpen && (
            <div className="lang-dropdown">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                  data-cursor="pointer"
                  className={currentLanguage === lang.code ? 'selected-lang' : ''}
                >
                  {t(lang.label)}
                  {currentLanguage === lang.code && <FaCheck size={10} style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="icon-btn theme-toggle"
          onClick={() => handleThemeChange()}
          aria-label="theme toggle"
          data-cursor="pointer"
        >
          <FaRegMoon size={18} />
        </button>

        <button
          className="icon-btn mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
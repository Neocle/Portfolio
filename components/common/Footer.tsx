import React from 'react';
import '@/styles/components/common/Footer.css';
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useT } from '@/hooks/useT';

const Footer: React.FC = () => {
  const { t } = useT();

  return (
    <footer className="footer-centered">
      <div className="footer-socials">
        <a
          href="https://www.linkedin.com/in/loïs-alirol"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          data-cursor="pointer"
        >
          <FaLinkedin size={28}/>
        </a>

        <a
          href="https://github.com/Neocle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          data-cursor="pointer"
        >
          <FaGithub size={28}/>
        </a>

        <a
          href="https://discord.com/users/515958203838627856"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          data-cursor="pointer"
        >
          <FaDiscord size={28}/>
        </a>

        <a
          href="https://www.instagram.com/lois.alr43"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          data-cursor="pointer"
        >
          <FaInstagram size={28}/>
        </a>
      </div>

      <div className="footer-copyright">
        © {new Date().getFullYear()} Loïs Alirol. {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;

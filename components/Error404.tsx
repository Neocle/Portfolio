"use client "

import { useT } from '@/hooks/useT';
import React from 'react';
import CustomCursor from './common/CustomCursor';
import StarsCanvas from './common/StarCanvas';
import { FaCode } from 'react-icons/fa';
import TransitionLink from './common/TransitionLink';
import { useTitle } from '@/hooks/useTitle';

const Error404: React.FC = () => {
  const { t } = useT();
  useTitle(`${t("not-found.title")} | Loïs Alirol`);

  return (
    <>
      <CustomCursor />
      <StarsCanvas />

      <main className="notfound-container">
        <div className="notfound-hero">
          <h1 className="notfound-code">404</h1>
          <p className="notfound-title">
            {t("404-error.title")}
          </p>
        </div>

        <p className="notfound-description">
          {t("404-error.description")}
        </p>

        <TransitionLink href="/" className="notfound-link">
          <FaCode/>
          {t("404-error.button")}
        </TransitionLink>
      </main>
    </>
  );
};

export default Error404;

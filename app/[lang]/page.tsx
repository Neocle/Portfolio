"use client"

import CustomCursor from "@/components/common/CustomCursor";
import StarsCanvas from "@/components/common/StarCanvas";
import TransitionLink from "@/components/common/TransitionLink";
import Hero from "@/components/home/Hero";
import NextLink from "@/components/home/NextLink";
import { useT } from "@/hooks/useT";
import { useTitle } from "@/hooks/useTitle";

import '@/styles/pages/Home.css'

export default function Page() {
  const { t, tRich } = useT();

  useTitle(`${t("home.page-title")} | Loïs Alirol`);

  return (
    <>
      <CustomCursor />
      <StarsCanvas />
      
      <main className="main-content">
        <Hero name="LOIS ALIROL" />
        
        <section className="description-container">
          <p className="description-long">
            { tRich('home.description.value', {
              projects: <TransitionLink href="/projects" className="description-links">{ t('home.description.projects-link') }</TransitionLink>,
              contact: <TransitionLink href="/contact" className="description-links">{ t('home.description.contact-link') }</TransitionLink>
            })}
          </p>
          
          <NextLink />
        </section>
      </main>
    </>
  );
};
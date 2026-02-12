import React from 'react';
import Typewriter from './TypeWriter';
import '@/styles/components/home/Hero.css'

interface HeroProps {
  name: string;
}

const Hero: React.FC<HeroProps> = ({ name }) => (
  <section className="hero-center">
    <h1 className="title">{name}</h1>
    <Typewriter />
  </section>
);

export default Hero;
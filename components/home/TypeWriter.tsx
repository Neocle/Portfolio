"use client"

import React, { useState, useEffect } from 'react';
import { useT } from '@/hooks/useT';

const Typewriter: React.FC = () => {
    const { t } = useT();

    const textToType = t("home.subtitle");

    const [subIndex, setSubIndex] = useState(0);
    const isFinished = subIndex === textToType.length;
    useEffect(() => {
        if (subIndex < textToType.length) {
            const timeout = setTimeout(() => {
                setSubIndex((prev) => prev + 1);
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [subIndex, textToType.length]);

    return (
        <p className="description">
        {textToType.substring(0, subIndex)}
        {!isFinished && <span className="blinking-cursor">|</span>}
        </p>
    );
};

export default Typewriter;
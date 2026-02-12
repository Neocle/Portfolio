import React from 'react';
import '@/styles/components/common/PageTransition.css';

const PageTransition: React.FC<{ show?: boolean }> = ({ show }) => {
  return (
    <div className={`page-transition${show ? ' show' : ''}`}></div>
  );
};

export default PageTransition;

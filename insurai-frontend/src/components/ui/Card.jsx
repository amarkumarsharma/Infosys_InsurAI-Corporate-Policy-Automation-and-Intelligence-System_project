import React from 'react';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  ...props
}) => {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300';

  const variants = {
    default: 'bg-white dark:bg-slate-800 shadow-md hover:shadow-lg',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 shadow-md hover:shadow-lg',
    glass: 'backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 shadow-lg',
    dark: 'bg-slate-900 text-white shadow-lg',
    neon: 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50',
  };

  const hoverEffect = hover ? (variants[variant].includes('shadow-lg') ? '' : 'hover:shadow-lg') : '';

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverEffect} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;

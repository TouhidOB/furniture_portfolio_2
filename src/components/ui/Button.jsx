import React from 'react';
import { Link } from 'react-router-dom';

export function Button({
  children,
  variant = 'champagne',
  size = 'md',
  to = null,
  href = null,
  onClick = null,
  className = '',
  type = 'button',
  icon: Icon = null,
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed tracking-wider text-xs uppercase";

  const sizeStyles = {
    sm: "px-4 py-2 text-[11px]",
    md: "px-6 py-3.5 text-xs",
    lg: "px-8 py-4 text-xs tracking-widest",
  };

  const variantStyles = {
    champagne: "bg-champagne text-obsidian hover:bg-champagne-light shadow-sm hover:shadow active:scale-[0.98]",
    obsidian: "bg-graphite text-ivory hover:bg-graphite-light border border-graphite-border active:scale-[0.98]",
    ivory: "bg-ivory text-obsidian hover:bg-white active:scale-[0.98]",
    outline: "border border-champagne/60 text-champagne hover:bg-champagne hover:text-obsidian active:scale-[0.98]",
    outlineWhite: "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10 active:scale-[0.98]",
    ghost: "text-ivory hover:text-champagne bg-transparent active:scale-[0.98]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
        {Icon && <Icon className="ml-2 w-4 h-4" />}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
        {Icon && <Icon className="ml-2 w-4 h-4" />}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4" />}
    </button>
  );
}

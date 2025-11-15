
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90 focus:ring-2 focus:ring-ring',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90 focus:ring-2 focus:ring-ring',
    outline: 'border border-border text-foreground hover:bg-accent focus:ring-2 focus:ring-ring',
    ghost: 'text-foreground hover:bg-accent focus:ring-2 focus:ring-ring'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <i className="ri-loader-4-line animate-spin mr-2"></i>
      )}
      {children}
    </button>
  );
}

import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  withRing?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading, withRing = true, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md',
      outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
      ghost: 'text-indigo-600 hover:bg-indigo-50',
      link: 'text-indigo-600 underline-offset-4 hover:underline',
      gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-12 px-8 text-lg',
    };

    const focusStyles = withRing ? 'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' : '';

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          focusStyles,
          isLoading && 'opacity-70 cursor-not-allowed',
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
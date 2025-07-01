import React from 'react';
import { cn } from '../../utils/cn';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  variant?: 'default' | 'filled' | 'outline';
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border-gray-200',
      filled: 'bg-gray-50 border-transparent focus:bg-white',
      outline: 'bg-transparent border-gray-300',
    };

    return (
      <select
        className={cn(
          'flex h-11 w-full rounded-lg border-2 px-4 py-2 text-base transition-all duration-200',
          'ring-offset-white appearance-none',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variants[variant],
          error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export { Select };
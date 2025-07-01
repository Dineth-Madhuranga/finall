import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outline';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, variant = 'default', type, ...props }, ref) => {
    const variants = {
      default: 'bg-white border-gray-200',
      filled: 'bg-gray-50 border-transparent focus:bg-white',
      outline: 'bg-transparent border-gray-300',
    };

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-lg border-2 px-4 py-2 text-base transition-all duration-200',
            'ring-offset-white placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            variants[variant],
            error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
            icon && 'pl-10',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
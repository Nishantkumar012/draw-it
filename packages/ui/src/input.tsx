import React from 'react';

interface InputProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  variant = 'primary',
  size = 'md',
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      className={`
        ${className || ''}
        ${
          variant === 'primary'
            ? 'bg-background border border-input text-foreground'
            : variant === 'secondary'
            ? 'bg-secondary text-secondary-foreground border border-input'
            : variant === 'outline'
            ? 'bg-transparent border border-input'
            : 'bg-transparent text-muted-foreground'
        }
        ${
          size === 'lg'
            ? 'px-4 py-2 text-base'
            : size === 'sm'
            ? 'px-2 py-1 text-sm'
            : 'p-2  text-md'
        }
        rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring
      `}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

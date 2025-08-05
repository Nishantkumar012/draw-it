   

   import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};



// // "use client";

// // import { ReactNode } from "react";

// // interface ButtonProps {
// //   children: ReactNode;
// //   className?: string;
// //   appName: string;
// // }

// // export const Button = ({ children, className, appName }: ButtonProps) => {
// //   return (
// //     <button
// //       className={className}
// //       onClick={() => alert(`Hello from your ${appName} app!`)}
// //     >
// //       {children}
// //     </button>
// //   );
// // };


// "use client";

// import { ReactNode } from "react";

// interface ButtonProps {
//   variant: "primary" | "outline" | "secondary";
//   className?: string;
//   onClick?: () => void;
//   size: "lg" | "sm";
//   children: ReactNode;
// }

// export const Button = ({ size, variant, className, onClick, children  }: ButtonProps) => {
//   return (
//     <button
//       className={`${className}
//         ${variant === "primary" ? "bg-primary" : variant == "secondary" ? "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80" : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"}
//         ${size === "lg" ? "px-4 py-2" : "px-2 py-1"}
//       `}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };
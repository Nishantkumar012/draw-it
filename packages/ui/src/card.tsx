import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg border border-gray-100';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};







// // import { type JSX } from "react";

// // export function Card({
// //   className,
// //   title,
// //   children,
// //   href,
// // }: {
// //   className?: string;
// //   title: string;
// //   children: React.ReactNode;
// //   href: string;
// // }): JSX.Element {
// //   return (
// //     <a
// //       className={className}
// //       href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
// //       rel="noopener noreferrer"
// //       target="_blank"
// //     >
// //       <h2>
// //         {title} <span>-&gt;</span>
// //       </h2>
// //       <p>{children}</p>
// //     </a>
// //   );
// // }


// import { type JSX } from "react";

// export function Card({
//   className,
//   title,
//   children,
//   href,
// }: {
//   className?: string;
//   title: string;
//   children: React.ReactNode;
//   href: string;
// }): JSX.Element {
//   return (
//     <a
//       className={className}
//       href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
//       rel="noopener noreferrer"
//       target="_blank"
//     >
//       <h2>
//         {title} <span>-&gt;</span>
//       </h2>
//       <p>{children}</p>
//     </a>
//   );
// }
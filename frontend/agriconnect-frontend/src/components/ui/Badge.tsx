import React from 'react';

type BadgeVariant = 'green' | 'emerald' | 'amber' | 'gray' | 'white';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-[#176a22] text-white',
  emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border border-amber-200',
  gray: 'bg-[#f1f5ea] text-[#40493d] border border-[#e0e4d9]',
  white: 'bg-white text-[#181d16] border border-[#e0e4d9] shadow-sm',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gray',
  children,
  className = '',
}) => {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
};

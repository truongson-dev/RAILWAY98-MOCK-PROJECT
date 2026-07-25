import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[#181d16]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707a6c]">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={[
            'w-full py-3 bg-[#f1f5ea] border rounded-xl text-sm text-[#181d16]',
            'placeholder-[#818d7c] focus:outline-none focus:ring-2 focus:ring-[#176a22] focus:bg-white transition-all',
            icon ? 'pl-10 pr-4' : 'px-4',
            error ? 'border-red-400' : 'border-[#d7dcd1]',
            className,
          ].join(' ')}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};

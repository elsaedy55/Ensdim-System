import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-8 py-3 rounded-xl transition-all duration-200 font-medium inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-[#D63A3A] text-white hover:bg-[#c23333] shadow-lg hover:shadow-xl shadow-[#D63A3A]/30',
    secondary: 'bg-transparent text-[#6D5DF6] border-2 border-[#6D5DF6] hover:bg-[#6D5DF6]/10',
    outline: 'bg-transparent text-[#101418] border border-[#E5E5E5] hover:border-[#6D5DF6] hover:text-[#6D5DF6]',
    text: 'bg-transparent text-[#6D5DF6] hover:text-[#3B2A78] hover:underline'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

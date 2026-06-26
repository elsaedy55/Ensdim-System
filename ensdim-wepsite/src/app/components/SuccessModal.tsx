import { useEffect } from 'react';
import { X } from 'lucide-react';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  children?: React.ReactNode;
}

export function SuccessModal({ open, onClose, title, message, children }: SuccessModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl border border-[#E5E5E5] shadow-2xl max-w-sm w-full p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 end-3 w-8 h-8 rounded-full flex items-center justify-center text-[#4F555E] hover:bg-[#FAFAFA] active:scale-90 transition-all"
        >
          <X size={16} />
        </button>

        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 20 20" fill="none" className="w-7 h-7 text-green-600 no-mirror">
            <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#101418] mb-2">{title}</h2>
        <p className="text-sm text-[#4F555E]">{message}</p>
        {children}
      </div>
    </div>
  );
}

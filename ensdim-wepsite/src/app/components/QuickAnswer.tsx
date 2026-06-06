interface QuickAnswerProps {
  question: string;
  answer: string;
  className?: string;
}

export function QuickAnswer({ question, answer, className = '' }: QuickAnswerProps) {
  return (
    <section
      className={`py-10 bg-[#EEEAFE]/40 border-y border-[#6D5DF6]/10 ${className}`}
      aria-label="Quick Answer"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6D5DF6] mb-2">
          Direct Answer
        </p>
        <h2 className="text-base font-bold text-[#101418] mb-2">{question}</h2>
        <p className="text-sm text-[#3a3a4a] leading-relaxed">{answer}</p>
      </div>
    </section>
  );
}

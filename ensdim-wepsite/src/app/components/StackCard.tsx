import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

type StepIcon = (props: { size?: number; className?: string }) => JSX.Element;

export const STACK_TILT = [-1.6, 1.3, -1, 1.6, -1.3, 1];

export function StackCard({
  index,
  total,
  Icon,
  title,
  description,
}: {
  index: number;
  total: number;
  Icon: StepIcon;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.42'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [STACK_TILT[index % STACK_TILT.length], 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        y,
        rotate,
        top: `${76 + index * 10}px`,
      }}
      className={`sticky rounded-2xl border border-[#EBEBEB] bg-white p-6 shadow-[0_20px_45px_-18px_rgba(16,20,24,0.25)] ${
        index === total - 1 ? '' : 'mb-5'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 bg-[#F4F2FF] rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon size={22} className="text-[#6D5DF6]" />
        </div>
        <span className="text-3xl font-bold text-[#6D5DF6]/15 leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="text-base font-bold text-[#101418] mb-2">{title}</h3>
      <p className="text-sm text-[#4F555E] leading-relaxed">{description}</p>
    </motion.div>
  );
}

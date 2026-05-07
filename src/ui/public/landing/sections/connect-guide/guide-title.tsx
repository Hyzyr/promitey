import { FormatText } from '@/components/ui/format-text';
import { cn } from '@/lib/utils';

export const GuideTitle = ({ title }: { title: string }) => {
  return (
    <h2
      className={cn(
        'px-0 text-center font-manrope text-neutral-600 mdx:px-4',
        'font-bold xl:font-normal',
        'text-[24px] mdx:text-[32px] lg:text-[37px] xl:text-[40px]',
        'leading-[1.1] tracking-[-0.48px] xl:tracking-[-0.8px]',
        'whitespace-nowrap xl:whitespace-pre',
      )}
    >
      <FormatText text={title} />
    </h2>
  );
};
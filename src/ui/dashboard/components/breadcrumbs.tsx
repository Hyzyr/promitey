import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  children: React.ReactNode;
}

export const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  return (
    <div className="inline-flex items-center gap-1 text-lg font-medium text-neutral-600">
      <ChevronRight className="h-6 w-6" />
      <span>{children}</span>
    </div>
  );
};

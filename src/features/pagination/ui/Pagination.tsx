import { Button } from '@/shared/ui';
import { classnames } from '@/shared/lib/styling';
import styles from './Pagination.module.scss';

interface PaginationProps {
  pages: number;
  currentPage: number;
  disabled: boolean;
  limit?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const getPagesToRender = (
  maxPages: number,
  currentPage: number,
  limit: number
) => {
  const pagesToRender = [];
  const half = Math.floor(limit / 2);

  let start = Math.max(currentPage - half, 1);
  let end = Math.min(currentPage + half, maxPages);

  if (currentPage <= half) {
    start = 1;
    end = Math.min(limit, maxPages);
  } else if (currentPage >= maxPages - half) {
    start = Math.max(maxPages - limit + 1, 1);
    end = maxPages;
  }

  if (start > 1) {
    pagesToRender.push({ content: '1', to: 1 });
    if (start > 2) {
      pagesToRender.push({
        content: '...',
        to: Math.max(1, currentPage - limit),
      });
    }
  }

  for (let i = start; i <= end; i += 1) {
    pagesToRender.push({ content: i.toString(), to: i });
  }

  if (end < maxPages) {
    if (end < maxPages - 1) {
      pagesToRender.push({
        content: '...',
        to: Math.min(maxPages, currentPage + limit),
      });
    }

    pagesToRender.push({ content: maxPages.toString(), to: maxPages });
  }

  return pagesToRender;
};

export const Pagination = ({
  pages,
  currentPage,
  disabled,
  onPageChange,
  limit = 5,
  className,
}: PaginationProps) => {
  const pagesToRender = getPagesToRender(pages, currentPage, limit);

  return (
    !!pages && (
      <div className={classnames(styles.pagination, className)}>
        {pagesToRender.map(({ content, to }, index) => (
          <Button
            key={index}
            disabled={disabled}
            className={styles.btn}
            active={currentPage === to}
            onClick={() => onPageChange(to)}
          >
            {content}
          </Button>
        ))}
      </div>
    )
  );
};

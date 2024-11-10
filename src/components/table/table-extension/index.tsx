import styles from '../index.module.scss';

interface TableExtensionProps {
  increasePage: () => void;
  decreasePage: () => void;
  currentPage: number;
  totalPages: number;
  disableIncrease?: boolean;
  disableDecrease?: boolean;
}

export function TableExtension({
  increasePage,
  decreasePage,
  currentPage,
  totalPages,
  disableDecrease,
  disableIncrease,
}: TableExtensionProps) {
  return (
    <div className={styles['table_extension']}>
      <div className={styles['pagination_info']}>
        Page {currentPage} of {totalPages}
      </div>

      <div>
        <button onClick={decreasePage} disabled={currentPage <= 1 || disableDecrease}>
          {'Previous'}
        </button>
        <button
          onClick={increasePage}
          disabled={currentPage == totalPages || currentPage > totalPages || disableIncrease}
        >
          {'Next'}
        </button>
      </div>
    </div>
  );
}

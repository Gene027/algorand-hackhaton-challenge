import Skeleton from 'react-loading-skeleton';

import styles from '../index.module.scss';
import { useEffect, useRef, useState } from 'react';
import { TableColumn } from '../../../interface/table-column.interface';
import { LOADING_STATUS } from '../../../enums/loading.enum';

interface TableBodyProps {
  columns: TableColumn[];
  data: object[];
  rowClickHandler?: (rowData: object) => void;
  headers: string[];
  status?: LOADING_STATUS;
  pageNumber: number;
  censorItems?: boolean;
}

export function TableBody({
  columns,
  data,
  rowClickHandler = () => null,
  headers,
  status = LOADING_STATUS.IDLE,
  pageNumber,
  censorItems,
}: TableBodyProps) {
  const renderCell = (row: any, index: number, pageNumber: number) => {
    const key = columns[index].key;
    return columns[index].render(key ? row[key] : row, row, index, pageNumber);
  };
  const trRefs = useRef<Array<HTMLTableRowElement | null>>([]);
  const [cloudTop, setCloudTop] = useState(0);

  const getBlurValue = (index: number) => {
    const value = index - 2;

    return value < 1 ? 0 : value;
  };

  const calculateTrHeights = () => {
    let trHeights = 0;
    trRefs.current.slice(0, 3).forEach((value) => (trHeights += value?.offsetHeight || 0));
    setCloudTop(trHeights);
  };

  useEffect(() => {
    calculateTrHeights();
  }, [data]);

  useEffect(() => {
    window.addEventListener('resize', calculateTrHeights);
  }, []);

  return (
    <tbody>
      {(status === LOADING_STATUS.SUCCESS || status === LOADING_STATUS.IDLE) &&
        data?.length > 0 &&
        data.map((row, index) => (
          <tr
            className={`${styles['table_row']} hover:bg-[#f9fafb]`}
            key={index}
            style={{
              filter: censorItems ? `blur(${getBlurValue(index)}px)` : undefined,
            }}
            ref={(ref) => (trRefs.current[index] = ref) as any}
          >
            {columns.map((column, index) => (
              <td
                key={index}
                className={styles['col']}
                data-label={headers[index]}
                onClick={() => {
                  column?.disableClick ? null : rowClickHandler(row);
                }}
                style={{
                  cursor: column?.disableClick ? 'default' : 'pointer',
                }}
              >
                {renderCell(row, index, pageNumber)}
              </td>
            ))}
          </tr>
        ))}

      {status === LOADING_STATUS.PENDING &&
        Array.from({ length: 5 }).map((_, index) => (
          <tr className={styles['table_row']} key={index}>
            {columns.map((column, index) => (
              <td key={index} className={styles['col']} data-label={headers[index]}>
                <Skeleton className={styles['table_column_skeleton']} />
              </td>
            ))}
          </tr>
        ))}

      {censorItems && (
        <div
          className={styles['cloud_cover']}
          style={{
            top: `${cloudTop}px`,
            height: `calc(100% - ${cloudTop}px)`,
          }}
        ></div>
      )}
    </tbody>
  );
}

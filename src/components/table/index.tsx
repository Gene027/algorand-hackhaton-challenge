import { LOADING_STATUS } from '../../enums/loading.enum';
import { TableColumn, TableHeaderColumn } from '../../interface/table-column.interface';

import styles from './index.module.scss';
import { TableBody } from './table-body';
import { TableHeader } from './table-header';

interface TableProps {
  headers: string[] | TableHeaderColumn[];
  columns: TableColumn[];
  data: object[];
  rowClickHandler?: (rowData: any) => void;
  children?: React.ReactNode;
  status?: LOADING_STATUS;
  currentPage: number;
  censorItems?: boolean;
}

export function Table({
  headers,
  columns,
  data,
  rowClickHandler,
  children,
  status = LOADING_STATUS.IDLE,
  currentPage,
  censorItems,
}: TableProps) {
  return (
    <div className={styles['table_wrapper']}>
      <table className={styles['table']}>
        {data?.length === 0 && status === LOADING_STATUS.IDLE ? (
          <p className={styles['empty_table']}>No Data To Display</p>
        ) : (
          <>
            <TableHeader headers={headers} />
            <TableBody
              columns={columns}
              data={data}
              headers={headers.map((header) =>
                typeof header === 'string' ? header : header.value,
              )}
              rowClickHandler={rowClickHandler}
              status={status}
              pageNumber={currentPage}
              censorItems={censorItems}
            />
          </>
        )}
      </table>
      {children}
    </div>
  );
}

import classNames from 'classnames';

import styles from '../index.module.scss';
import { TableHeaderColumn } from '../../../interface/table-column.interface';

interface TableHeaderProps {
  headers: string[] | TableHeaderColumn[];
}

export function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead>
      <tr className={`${styles['table_header']} `}>
        {headers.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <td className={classNames(styles['col'])} key={index}>
                {item}
              </td>
            );
          } else {
            return (
              <td className={classNames(styles['col'], item.className)} key={index}>
                {item.value}
              </td>
            );
          }
        })}
      </tr>
    </thead>
  );
}

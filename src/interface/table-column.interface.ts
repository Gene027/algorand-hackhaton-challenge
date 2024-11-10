/**
 * cell is the value in the cell, rowData is the entire row i.e an item in the res data array, index is the index of the row
 * key is the key in the item object
 */
export interface TableColumn<T = any> {
  key?: string;
  render: (
    cell: any,
    rowData?: T,
    pageNumber?: number,
    index?: number,
  ) => JSX.Element | string | number;
  className?: string;
  disableClick?: boolean;
}

export interface TableHeaderColumn {
  value: string;
  className?: string;
}

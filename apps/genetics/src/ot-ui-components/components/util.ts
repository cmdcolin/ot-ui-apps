import { Column, Item } from './OtTable';

export const getComparator = (
  columns: Column[],
  sortBy: string,
  order?: 'asc' | 'desc'
) => {
  const column = columns.find(col => col.id === sortBy);

  if (column && column.comparator) {
    let cb = column.comparator;
    return order === 'asc'
      ? (a: Item, b: Item) => cb(a, b)
      : (a: Item, b: Item) => -cb(a, b);
  }

  const comparatorValue = order === 'desc' ? 1 : -1;

  return (a: Item, b: Item) => {
    if (a[sortBy] === b[sortBy]) {
      return 0;
    }

    if (a[sortBy] === undefined || a[sortBy] === '' || a[sortBy] < b[sortBy]) {
      return comparatorValue;
    }

    if (b[sortBy] === undefined || b[sortBy] === '' || a[sortBy] > b[sortBy]) {
      return -comparatorValue;
    }

    return 0;
  };
};

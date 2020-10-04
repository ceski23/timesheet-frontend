export const filterUniqueDates = (data: Date[]) => {
  const lookup = new Set();

  return data.filter(date => {
    const serialised = date.getTime();
    if (lookup.has(serialised)) return false;
    lookup.add(serialised);
    return true;
  });
};


export function groupBy<T>(xs: T[], key: keyof T) {
  return xs.reduce(function(rv, x) {
    // @ts-ignore
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

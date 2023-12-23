
function replaceAll(target: string, search: string, replacement: string) {
  return target.replace(new RegExp(search, 'g'), replacement);
};

export type Customer = {
  CustomerID: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
};

export async function SearchCustomers(name: string): Promise<Customer[]> {
  /**
   * Escaping single quotes should be done by doubling it
   * See: https://stackoverflow.com/a/4483742
   */
  const query = replaceAll(name, `\'`, `''`);
  const res = await fetch(`https://services.odata.org/v4/northwind/northwind.svc/Customers?$filter=((startswith(tolower(ContactName),'${query}')))&$count=true`);
  const data = await res.json() as { value: Customer[] };
  return data.value;
}

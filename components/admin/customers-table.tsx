interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  orders: number;
  totalSpent: number;
  status: string;
}

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {customers.map((customer) => (
          <div key={customer.id} className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm">{customer.name}</p>
                <p className="text-xs text-muted-foreground">
                  {customer.company}
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 flex-shrink-0">
                {customer.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span>
                <span className="font-semibold text-foreground">
                  {customer.orders}
                </span>{" "}
                commandes
              </span>
              <span>
                <span className="font-semibold text-foreground">
                  ${customer.totalSpent.toLocaleString()}
                </span>{" "}
                total
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Nom
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Entreprise
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Email
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Commandes
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Total Dépensé
              </th>
              <th className="text-left px-4 lg:px-6 py-3 font-semibold text-sm">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-border hover:bg-secondary/50 transition"
              >
                <td className="px-4 lg:px-6 py-4">
                  <div>
                    <p className="font-semibold text-sm">{customer.name}</p>
                    <p className="text-xs text-foreground/60">{customer.id}</p>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-sm">
                  {customer.company}
                </td>
                <td className="px-4 lg:px-6 py-4 text-sm text-foreground/70">
                  {customer.email}
                </td>
                <td className="px-4 lg:px-6 py-4 font-semibold text-sm">
                  {customer.orders}
                </td>
                <td className="px-4 lg:px-6 py-4 font-semibold text-sm">
                  ${customer.totalSpent.toLocaleString()}
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

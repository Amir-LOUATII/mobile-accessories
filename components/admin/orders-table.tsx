interface OrderItem {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: string;
  date: string;
}

interface OrdersTableProps {
  orders: OrderItem[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Livré":
      return "bg-green-100 text-green-800";
    case "Expédié":
      return "bg-blue-100 text-blue-800";
    case "En cours":
      return "bg-yellow-100 text-yellow-800";
    case "En attente":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* Mobile Cards */}
      <div className="sm:hidden divide-y divide-border">
        {orders.map((order) => (
          <div key={order.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">{order.id}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-xs text-muted-foreground">{order.email}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${order.total.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {order.items} articles
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{order.date}</p>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                ID Commande
              </th>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Client
              </th>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Articles
              </th>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Total
              </th>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Statut
              </th>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border hover:bg-secondary/50 transition"
              >
                <td className="px-4 md:px-6 py-4 font-semibold text-sm">
                  {order.id}
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div>
                    <p className="font-semibold text-sm">{order.customer}</p>
                    <p className="text-xs text-foreground/60">{order.email}</p>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 text-sm">{order.items}</td>
                <td className="px-4 md:px-6 py-4 font-semibold text-sm">
                  ${order.total.toLocaleString()}
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-sm text-foreground/70">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

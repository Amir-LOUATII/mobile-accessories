interface Order {
  rawId?: number;
  id: string;
  customer: string;
  amount: number;
  status: string;
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface RecentOrdersTableProps {
  orders: Order[];
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "livré":
      return "bg-green-100 text-green-800";
    case "expédié":
      return "bg-blue-100 text-blue-800";
    case "en cours":
      return "bg-yellow-100 text-yellow-800";
    case "en attente":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="bg-secondary p-4 sm:p-6 border-b border-border">
        <h2 className="text-lg sm:text-xl font-bold">Commandes Récentes</h2>
      </div>

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
              <span className="text-muted-foreground">{order.customer}</span>
              <span className="font-semibold">
                ${order.amount.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 flex justify-end">
              <Link 
                href={`/admin/orders/${order.rawId || order.id}`}
                className="text-xs font-medium text-primary flex items-center hover:underline"
              >
                Voir détails <ChevronRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>
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
                Montant
              </th>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Statut
              </th>
              <th className="text-right px-4 md:px-6 py-3 font-semibold text-sm">
                Action
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
                <td className="px-4 md:px-6 py-4 text-sm">{order.customer}</td>
                <td className="px-4 md:px-6 py-4 font-semibold text-sm">
                  ${order.amount.toLocaleString()}
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-right">
                  <Link 
                    href={`/admin/orders/${order.rawId || order.id}`}
                    className="text-sm font-medium text-primary hover:underline flex items-center justify-end"
                  >
                    Détails <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

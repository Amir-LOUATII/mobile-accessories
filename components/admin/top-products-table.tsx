import { Product } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

interface TopProductsTableProps {
  products: Product[];
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="bg-secondary p-4 sm:p-6 border-b border-border">
        <h2 className="text-lg sm:text-xl font-bold">Meilleurs Produits</h2>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden divide-y divide-border">
        {products.map((product) => (
          <div key={product.id} className="p-4 space-y-1">
            <p className="font-semibold text-sm truncate">{product.name}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{product.category}</span>
              <span className="font-semibold text-foreground">
                {formatPrice(product.basePrice)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Stock: {product.stock}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Nom du Produit
              </th>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Catégorie
              </th>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Stock
              </th>
              <th className="text-left px-4 md:px-6 py-3 font-semibold text-sm">
                Prix
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border hover:bg-secondary/50 transition"
              >
                <td className="px-4 md:px-6 py-4 font-semibold text-sm">
                  {product.name}
                </td>
                <td className="px-4 md:px-6 py-4 text-sm">
                  {product.category}
                </td>
                <td className="px-4 md:px-6 py-4 text-sm">{product.stock}</td>
                <td className="px-4 md:px-6 py-4 font-semibold text-sm">
                  {formatPrice(product.basePrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

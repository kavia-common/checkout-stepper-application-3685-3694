import React from "react";

function currency(n) {
  return `$${n.toFixed(2)}`;
}

// PUBLIC_INTERFACE
export default function CartStep({ items }) {
  /** Displays a mock cart list and totals. */
  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const shipping = subtotal > 100 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h2 className="text-lg font-semibold text-gray-800">Cart Summary</h2>
        <div className="mt-4 divide-y">
          {items.map((it) => (
            <div key={it.id} className="py-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{it.name}</div>
                <div className="text-sm text-gray-500">
                  Qty: {it.qty} • {currency(it.price)}
                </div>
              </div>
              <div className="font-semibold text-gray-900">
                {currency(it.price * it.qty)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{currency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : currency(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span>{currency(tax)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span>{currency(total)}</span>
        </div>
      </div>
    </div>
  );
}

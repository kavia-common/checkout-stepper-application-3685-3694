import React from "react";

// PUBLIC_INTERFACE
export default function Confirmation({ name }) {
  /** Simple order confirmation screen. */
  return (
    <div className="card p-8 text-center space-y-3">
      <div className="mx-auto w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl">✓</div>
      <h2 className="text-xl font-semibold text-gray-900">Order Confirmed</h2>
      <p className="text-gray-600">
        Thank you{name ? `, ${name}` : ""}! Your order has been placed successfully.
      </p>
      <p className="text-sm text-gray-500">A confirmation email will be sent shortly.</p>
    </div>
  );
}

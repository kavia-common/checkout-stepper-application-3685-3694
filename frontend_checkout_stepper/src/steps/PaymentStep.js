import React from "react";

// PUBLIC_INTERFACE
export default function PaymentStep({ data, onChange, errors }) {
  /** Mock payment form with basic validation. No external services. */
  const handle = (e) => onChange({ ...data, [e.target.name]: e.target.value });

  const Field = ({ label, name, type = "text", placeholder, maxLength }) => (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="input"
        placeholder={placeholder}
        value={data[name] || ""}
        onChange={handle}
        maxLength={maxLength}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && <p id={`${name}-error`} className="error-text">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="card p-4 space-y-4">
      <Field label="Card Number" name="cardNumber" placeholder="4242 4242 4242 4242" maxLength={19} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Expiry (MM/YY)" name="expiry" placeholder="12/28" maxLength={5} />
        <Field label="CVC" name="cvc" placeholder="123" maxLength={4} />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700">i</span>
        This is a demo. No real payment is processed.
      </div>
    </div>
  );
}

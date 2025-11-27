import React from "react";

// PUBLIC_INTERFACE
export default function AddressStep({ data, onChange, errors }) {
  /** Address form with basic validation messaging. */
  const handle = (e) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const Field = ({ label, name, type = "text", placeholder }) => (
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
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="error-text">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="card p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full Name" name="name" placeholder="Jane Doe" />
        <Field label="Email" name="email" type="email" placeholder="jane@example.com" />
      </div>
      <Field label="Address" name="address" placeholder="123 Ocean Ave" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="City" name="city" placeholder="Seattle" />
        <Field label="State" name="state" placeholder="WA" />
        <Field label="ZIP" name="zip" placeholder="98101" />
      </div>
    </div>
  );
}

import React, { useMemo, useState } from "react";
import "./index.css";
import "./App.css";
import Stepper from "./components/Stepper";
import CartStep from "./steps/CartStep";
import AddressStep from "./steps/AddressStep";
import PaymentStep from "./steps/PaymentStep";
import Confirmation from "./steps/Confirmation";

// PUBLIC_INTERFACE
function App() {
  /** Main checkout app with a 3-step stepper: Cart → Address → Payment, plus confirmation. */
  const steps = useMemo(
    () => [
      { key: "cart", label: "Cart" },
      { key: "address", label: "Address" },
      { key: "payment", label: "Payment" },
    ],
    []
  );

  // Mock cart items
  const [cartItems] = useState([
    { id: "1", name: "Ocean Breeze T-Shirt", price: 24.99, qty: 2 },
    { id: "2", name: "Amber Accent Mug", price: 16.5, qty: 1 },
  ]);

  const [active, setActive] = useState(0);
  const [address, setAddress] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const validateAddress = () => {
    const e = {};
    if (!address.name?.trim()) e.name = "Full name is required.";
    if (!address.email?.trim() || !/^\S+@\S+\.\S+$/.test(address.email))
      e.email = "A valid email is required.";
    if (!address.address?.trim()) e.address = "Address is required.";
    if (!address.city?.trim()) e.city = "City is required.";
    if (!address.state?.trim()) e.state = "State is required.";
    if (!address.zip?.trim() || !/^\d{5}(-\d{4})?$/.test(address.zip))
      e.zip = "A valid ZIP is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    const digits = (s) => (s || "").replace(/\D/g, "");
    const cardDigits = digits(payment.cardNumber);
    if (cardDigits.length < 13 || cardDigits.length > 19)
      e.cardNumber = "Enter a valid card number.";
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) e.expiry = "Use MM/YY format.";
    if (!/^\d{3,4}$/.test(payment.cvc)) e.cvc = "Enter a valid CVC (3-4 digits).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const canProceed = () => {
    if (active === 0) return cartItems.length > 0;
    if (active === 1) return validateAddress();
    if (active === 2) return validatePayment();
    return false;
  };

  const onNext = () => {
    if (!canProceed()) return;
    if (active < steps.length - 1) {
      setActive((a) => a + 1);
      setErrors({});
    } else {
      // Finalize
      setConfirmed(true);
    }
  };

  const onBack = () => {
    if (confirmed) {
      setConfirmed(false);
      return;
    }
    setErrors({});
    setActive((a) => Math.max(0, a - 1));
  };

  const nextLabel = active < steps.length - 1 ? "Next" : "Pay & Confirm";

  return (
    <div className="min-h-screen app-gradient flex items-center justify-center p-4">
      <div className="container-max">
        <div className="card p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
              <p className="text-sm text-gray-500">Ocean Professional</p>
            </div>
            <div className="hidden md:block text-right">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                Modern UI
              </span>
            </div>
          </div>

          {!confirmed && (
            <>
              <Stepper steps={steps} activeIndex={active} />
              <div className="mt-6">
                {active === 0 && <CartStep items={cartItems} />}
                {active === 1 && (
                  <AddressStep data={address} onChange={setAddress} errors={errors} />
                )}
                {active === 2 && (
                  <PaymentStep data={payment} onChange={setPayment} errors={errors} />
                )}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={onBack}
                  disabled={active === 0}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onNext}
                >
                  {nextLabel}
                </button>
              </div>
            </>
          )}

          {confirmed && (
            <>
              <Confirmation name={address.name} />
              <div className="mt-6 flex items-center justify-center">
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setConfirmed(false);
                    setActive(0);
                  }}
                >
                  Back to Cart
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <span>
            Primary: <span className="text-[var(--primary)] font-semibold">#2563EB</span> •
            Secondary: <span className="text-[var(--secondary)] font-semibold">#F59E0B</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;

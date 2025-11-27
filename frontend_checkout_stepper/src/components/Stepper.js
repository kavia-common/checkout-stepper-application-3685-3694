import React from "react";

// PUBLIC_INTERFACE
export default function Stepper({ steps = [], activeIndex = 0 }) {
  /** Render a horizontal stepper with active, completed, and upcoming states. */
  return (
    <div className="stepper" role="navigation" aria-label="Checkout steps">
      {steps.map((s, idx) => {
        const isActive = idx === activeIndex;
        const isCompleted = idx < activeIndex;
        const isUpcoming = idx > activeIndex;

        return (
          <div
            key={s.key || s.label}
            className={[
              "step",
              isActive ? "step-active" : "",
              isCompleted ? "step-completed" : "",
              isUpcoming ? "step-upcoming" : "",
            ].join(" ")}
            aria-current={isActive ? "step" : undefined}
          >
            <div className="flex items-center w-full">
              {idx !== 0 && (
                <div
                  className={[
                    "step-line",
                    isCompleted ? "bg-blue-400" : "bg-gray-200",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}
              <div className="step-circle shrink-0">
                {isCompleted ? "✓" : idx + 1}
              </div>
              {idx !== steps.length - 1 && (
                <div
                  className={[
                    "step-line",
                    idx < activeIndex - 1 ? "bg-blue-400" : "bg-gray-200",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="step-label">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}

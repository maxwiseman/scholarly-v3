"use client";

import React, { useState } from "react";
import { StepOne } from "./step-1";

export default function Page(): React.ReactElement {
  const [step, setStep] = useState(1);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      {step === 1 && (
        <StepOne
          onSubmit={() => {
            setStep(2);
          }}
        />
      )}
    </main>
  );
}

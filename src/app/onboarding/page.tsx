"use client";

import React, { useState } from "react";
import { StepOne } from "./step-1";
import { StepTwo } from "./step-2";

export default function Page(): React.ReactElement {
  const [step, setStep] = useState(2);

  return (
    <main className="flex w-full justify-center p-8">
      {step === 1 && (
        <StepOne
          onSubmit={() => {
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <StepTwo
          onSubmit={() => {
            setStep(3);
          }}
        />
      )}
    </main>
  );
}

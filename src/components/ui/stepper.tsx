"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const stepperVariants = cva("flex items-center flex-1 justify-between", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    size: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

const stepVariants = cva("flex items-center transition-all duration-200", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

const stepIndicatorVariants = cva(
  "flex items-center justify-center rounded-full border-2 font-medium transition-all duration-200",
  {
    variants: {
      state: {
        incomplete: "border-muted bg-background text-muted-foreground",
        current: "border-primary bg-primary text-primary-foreground",
        complete: "border-primary bg-primary text-primary-foreground",
      },
      size: {
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
    },
    defaultVariants: {
      state: "incomplete",
      size: "md",
    },
  }
);

const stepContentVariants = cva("transition-all duration-200", {
  variants: {
    orientation: {
      horizontal: "ml-3 min-w-0",
      vertical: "mt-2 text-center",
    },
    state: {
      incomplete: "text-muted-foreground",
      current: "text-foreground font-medium",
      complete: "text-muted-foreground",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    state: "incomplete",
  },
});

const stepSeparatorVariants = cva(
  "flex-1 bg-muted transition-all duration-200",
  {
    variants: {
      orientation: {
        horizontal: "h-0.5 flex-1",
        vertical: "w-0.5 h-8 mx-auto my-2",
      },
      state: {
        incomplete: "bg-muted",
        complete: "bg-primary",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      state: "incomplete",
    },
  }
);

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  currentStep: number;
  steps: StepData[];
}

export interface StepData {
  id: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
}

export interface StepProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepVariants> {
  step: StepData;
  index: number;
  currentStep: number;
  totalSteps: number;
  isLast?: boolean;
}

export interface StepIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepIndicatorVariants> {
  step: StepData;
  index: number;
  currentStep: number;
}

export interface StepContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepContentVariants> {
  step: StepData;
  index: number;
  currentStep: number;
}

export interface StepSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepSeparatorVariants> {
  index: number;
  currentStep: number;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, orientation, size, currentStep, steps, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stepperVariants({ orientation, size }), className)}
        {...props}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <Step
              step={step}
              index={index}
              currentStep={currentStep}
              totalSteps={steps.length}
              orientation={orientation}
              size={size}
              isLast={index === steps.length - 1}
            />
            {index < steps.length - 1 && orientation === "horizontal" && (
              <StepSeparator
                index={index}
                currentStep={currentStep}
                orientation={orientation}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
Stepper.displayName = "Stepper";

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (
    {
      className,
      step,
      index,
      currentStep,
      totalSteps,
      orientation,
      size,
      isLast,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(stepVariants({ orientation, size }), className)}
        {...props}
      >
        <div
          className={cn(
            "flex items-center",
            orientation === "vertical" ? "flex-col" : "flex-row"
          )}
        >
          <StepIndicator
            step={step}
            index={index}
            currentStep={currentStep}
            size={size}
          />
          <StepContent
            step={step}
            index={index}
            currentStep={currentStep}
            orientation={orientation}
          />
        </div>
        {orientation === "vertical" && !isLast && (
          <StepSeparator
            index={index}
            currentStep={currentStep}
            orientation={orientation}
          />
        )}
      </div>
    );
  }
);
Step.displayName = "Step";

const StepIndicator = React.forwardRef<HTMLDivElement, StepIndicatorProps>(
  ({ className, step, index, currentStep, size, ...props }, ref) => {
    const stepNumber = index + 1;
    const isComplete = stepNumber < currentStep;
    const isCurrent = stepNumber === currentStep;
    const state = isComplete
      ? "complete"
      : isCurrent
      ? "current"
      : "incomplete";

    return (
      <div
        ref={ref}
        className={cn(stepIndicatorVariants({ state, size }), className)}
        {...props}
      >
        {isComplete ? (
          <Check
            className={cn(
              "stroke-current",
              size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
            )}
          />
        ) : step.icon ? (
          React.isValidElement(step.icon) ? (
            React.cloneElement(step.icon as React.ReactElement<any>, {
              className: cn(
                "stroke-current",
                size === "sm"
                  ? "h-4 w-4"
                  : size === "lg"
                  ? "h-6 w-6"
                  : "h-5 w-5",
                (step.icon as React.ReactElement<any>).props?.className
              ),
            })
          ) : (
            step.icon
          )
        ) : (
          <span>{stepNumber}</span>
        )}
      </div>
    );
  }
);
StepIndicator.displayName = "StepIndicator";

const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(
  ({ className, step, index, currentStep, orientation, ...props }, ref) => {
    const stepNumber = index + 1;
    const isComplete = stepNumber < currentStep;
    const isCurrent = stepNumber === currentStep;
    const state = isComplete
      ? "complete"
      : isCurrent
      ? "current"
      : "incomplete";

    return (
      <div
        ref={ref}
        className={cn(stepContentVariants({ orientation, state }), className)}
        {...props}
      >
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            {step.title}
            {step.optional && (
              <span className="text-xs text-muted-foreground ml-2">
                (Optional)
              </span>
            )}
          </p>
          {step.description && (
            <p className="text-xs text-muted-foreground">{step.description}</p>
          )}
        </div>
      </div>
    );
  }
);
StepContent.displayName = "StepContent";

const StepSeparator = React.forwardRef<HTMLDivElement, StepSeparatorProps>(
  ({ className, index, currentStep, orientation, ...props }, ref) => {
    const stepNumber = index + 1;
    const isComplete = stepNumber < currentStep;
    const state = isComplete ? "complete" : "incomplete";

    return (
      <div
        ref={ref}
        className={cn(stepSeparatorVariants({ orientation, state }), className)}
        {...props}
      />
    );
  }
);
StepSeparator.displayName = "StepSeparator";

export {
  Stepper,
  Step,
  StepIndicator,
  StepContent,
  StepSeparator,
  stepperVariants,
  stepVariants,
  stepIndicatorVariants,
  stepContentVariants,
  stepSeparatorVariants,
};

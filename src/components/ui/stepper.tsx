"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

const stepperVariants = cva("flex items-center flex-1 justify-between", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    size: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-4",
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
  "flex items-center justify-center rounded-full font-semibold relative overflow-hidden",
  {
    variants: {
      state: {
        incomplete: "border-2 border-muted bg-background text-muted-foreground",
        current:
          "border-0 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30",
        complete:
          "border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/20",
      },
      size: {
        sm: "h-9 w-9 text-sm",
        md: "h-11 w-11 text-base",
        lg: "h-14 w-14 text-lg",
      },
    },
    defaultVariants: {
      state: "incomplete",
      size: "md",
    },
  },
);

const stepContentVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "ml-4 min-w-0",
      vertical: "mt-3 text-center",
    },
    state: {
      incomplete: "text-muted-foreground/70",
      current: "text-foreground",
      complete: "text-muted-foreground",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    state: "incomplete",
  },
});

const stepSeparatorVariants = cva("flex-1 relative overflow-hidden", {
  variants: {
    orientation: {
      horizontal: "h-1 flex-1 rounded-full",
      vertical: "w-1 h-10 mx-auto my-3 rounded-full",
    },
    state: {
      incomplete: "bg-muted/50",
      complete: "bg-gradient-to-r from-emerald-500 to-primary",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    state: "incomplete",
  },
});

export interface StepperProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
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
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepVariants> {
  step: StepData;
  index: number;
  currentStep: number;
  totalSteps: number;
  isLast?: boolean;
}

export interface StepIndicatorProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepIndicatorVariants> {
  step: StepData;
  index: number;
  currentStep: number;
}

export interface StepContentProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepContentVariants> {
  step: StepData;
  index: number;
  currentStep: number;
}

export interface StepSeparatorProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepSeparatorVariants> {
  index: number;
  currentStep: number;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, orientation, size, currentStep, steps, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(stepperVariants({ orientation, size }), className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
      </motion.div>
    );
  },
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
    ref,
  ) => {
    const stepNumber = index + 1;
    const isCurrent = stepNumber === currentStep;

    return (
      <motion.div
        ref={ref}
        className={cn(stepVariants({ orientation, size }), className)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: index * 0.1,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <motion.div
          className={cn(
            "flex items-center",
            orientation === "vertical" ? "flex-col" : "flex-row",
          )}
          animate={isCurrent ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 0.5 }}
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
        </motion.div>
        {orientation === "vertical" && !isLast && (
          <StepSeparator
            index={index}
            currentStep={currentStep}
            orientation={orientation}
          />
        )}
      </motion.div>
    );
  },
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
      <motion.div
        ref={ref}
        className={cn(stepIndicatorVariants({ state, size }), className)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background pulse for current step */}
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Check
                className={cn(
                  "stroke-current stroke-3",
                  size === "sm"
                    ? "h-4 w-4"
                    : size === "lg"
                      ? "h-6 w-6"
                      : "h-5 w-5",
                )}
              />
            </motion.div>
          ) : step.icon ? (
            <motion.div
              key="icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {React.isValidElement(step.icon)
                ? React.cloneElement(step.icon as React.ReactElement<any>, {
                    className: cn(
                      "stroke-current",
                      size === "sm"
                        ? "h-4 w-4"
                        : size === "lg"
                          ? "h-6 w-6"
                          : "h-5 w-5",
                      (step.icon as React.ReactElement<any>).props?.className,
                    ),
                  })
                : step.icon}
            </motion.div>
          ) : (
            <motion.span
              key="number"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {stepNumber}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
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
      <motion.div
        ref={ref}
        className={cn(stepContentVariants({ orientation, state }), className)}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      >
        <div className="space-y-1.5">
          <motion.p
            className={cn(
              "text-sm leading-none",
              isCurrent ? "font-bold text-foreground" : "font-medium",
            )}
            animate={
              isCurrent
                ? {
                    color: [
                      "hsl(var(--foreground))",
                      "hsl(var(--primary))",
                      "hsl(var(--foreground))",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            {step.title}
            {step.optional && (
              <span className="text-xs text-muted-foreground ml-2 font-normal">
                (Optional)
              </span>
            )}
          </motion.p>
          {step.description && (
            <motion.p
              className="text-xs text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {step.description}
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  },
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
      >
        {isComplete && (
          <motion.div
            className={cn(
              "absolute inset-0 bg-gradient-to-r from-emerald-500 to-primary",
              orientation === "vertical" && "bg-gradient-to-b",
            )}
            initial={{
              scaleX: orientation === "horizontal" ? 0 : 1,
              scaleY: orientation === "vertical" ? 0 : 1,
            }}
            animate={{ scaleX: 1, scaleY: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
            style={{
              originX: 0,
              originY: 0,
              borderRadius: "inherit",
            }}
          />
        )}
        {!isComplete && (
          <motion.div
            className="absolute inset-0 bg-muted/50 rounded-inherit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    );
  },
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

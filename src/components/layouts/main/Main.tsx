import { cn } from "@/utils/ui";

type MainProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean;
  fluid?: boolean;
  ref?: React.Ref<HTMLElement>;
};

const Main = ({ fixed, className, fluid, ...props }: MainProps) => {
  return (
    <main
      data-layout={fixed ? "fixed" : "auto"}
      className={cn(
        "px-4 py-6",
        fixed && "flex grow flex-col overflow-hidden",
        !fluid && "max-w-[1500px] mx-auto",
        className
      )}
      {...props}
    />
  );
};

export default Main;

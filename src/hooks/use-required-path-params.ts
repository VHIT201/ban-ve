import { useParams } from "next/navigation";

type RequiredParams<Key extends string = string> = {
  [key in Key]: string;
};

const useRequiredPathParams = <Param extends string>(
  requiredParams: Param[],
) => {
  const routeParams = useParams() as Record<
    string,
    string | string[] | undefined
  >;
  const resolvedParams = {} as RequiredParams<(typeof requiredParams)[number]>;

  for (const param of requiredParams) {
    const value = routeParams?.[param];
    const normalizedValue = Array.isArray(value) ? value[0] : value;

    if (!normalizedValue) {
      if (typeof window === "undefined") {
        return resolvedParams;
      }

      throw new Error(
        `This component should not be rendered on a route which does not have the ${param} parameter`,
      );
    }

    resolvedParams[param] = normalizedValue;
  }

  return resolvedParams;
};

export default useRequiredPathParams;

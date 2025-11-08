import { useParams } from "react-router-dom";

type RequiredParams<Key extends string = string> = {
  readonly [key in Key]: string;
};

const useRequiredPathParams = <Param extends string>(
  requiredParams: Param[]
) => {
  const routeParams = useParams();

  for (const param of requiredParams) {
    const value = routeParams[param];
    if (!value) {
      throw new Error(
        `This component should not be rendered on a route which does not have the ${param} parameter`
      );
    }
  }

  return routeParams as RequiredParams<(typeof requiredParams)[number]>;
};

export default useRequiredPathParams;

import { ReactElement } from "react";
import { Oval } from "react-loader-spinner";

interface Props {
  color: string;
}

export const OvalBtn = ({ color }: Props): ReactElement => {
  return (
    <Oval
      height={22}
      width={22}
      color={color}
      wrapperStyle={{}}
      wrapperClass="ovalBtn"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor={color}
      strokeWidth={8}
      strokeWidthSecondary={8}
    />
  );
};

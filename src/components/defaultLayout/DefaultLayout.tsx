import { ReactNode } from "react";
import { Navigation } from "../../components/navigation/Navigation";

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

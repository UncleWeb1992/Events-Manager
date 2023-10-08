import { FC, PropsWithChildren } from "react";
import { Header } from "../ui/Header";
import { Container } from "../common/Container";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;

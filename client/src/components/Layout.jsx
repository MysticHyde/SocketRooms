import { Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "react-bootstrap/Container";

const Layout = () => {

  return (
    <>
      <Header />

      <Container fluid className="m-0 p-0">
        <Outlet />
      </Container>
    </>
  )
}

export default Layout;

import { Fragment } from "react";
import PublicHeader from "./header";
import PublicFooter from "./footer";
import "./style.scss";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <Fragment>
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </Fragment>
  );
};

export default PublicLayout;

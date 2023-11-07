import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import PublicFooter from "./footer";
import PublicHeader from "./header";

import "./style.scss";

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

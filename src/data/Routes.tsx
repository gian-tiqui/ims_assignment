import { ReactNode } from "react";
import Login from "../routes/login/Login";
import Autobase from "../routes/autobase/Autobase";

type Route = {
  name: string;
  path: string;
  component: ReactNode;
  protected: boolean;
};

export const routeMapping: Route[] = [
  {
    name: "Login",
    path: "/login",
    component: <Login />,
    protected: false,
  },
  {
    name: "Autobase",
    path: "/",
    component: <Autobase />,
    protected: true,
  },
];

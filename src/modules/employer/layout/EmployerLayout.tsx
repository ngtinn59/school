import { Outlet } from "react-router-dom";
import Toast from "../../../components/Toast";
import Footer from "../../../ui/Layout/Footer";
import Header from "./Header";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useAppSelector } from "../../../app/hooks";
import Link from "../../../components/Link";
import { EMPLOYER_ROUTES } from "../constants/routes.constant";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: <Link to={EMPLOYER_ROUTES.PROFILE}>Profile</Link>,
    children: <Outlet />,
  },
  {
    key: "2",
    label: "Tab 2",
  },
  {
    key: "3",
    label: "Tab 3",
  },
];

export function EmployerLayout() {
  const isLogin = useAppSelector((state) => state.employer.isLogin);

  return (
    <div className="relative  h-screen">
      <Toast />
      <Header />

      <div className="absolute top-11 bottom-0  w-full   flex flex-col items-center justify-between">
        <div className="flex-1 w-full">
          {isLogin ? (
            <Tabs centered defaultActiveKey="1" items={items} />
          ) : (
            <Outlet />
          )}
        </div>
        <Footer className=" w-full pt-8" />
      </div>
    </div>
  );
}

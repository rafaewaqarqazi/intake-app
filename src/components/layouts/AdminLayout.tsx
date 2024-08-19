"use client";
import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Layout, Menu } from "antd";
import {
  LayoutContent,
  LayoutSider,
  Title,
} from "@/components/antd-sub-components";
import {
  BoxPlotOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useSidebarContext } from "@/context/SidebarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const screen = useBreakpoint();
  const { isOn, toggleOn } = useSidebarContext();
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const items = useMemo(
    () => [
      {
        key: "dashboard",
        label: <Link href="/admin/dashboard">Dashboard</Link>,
        icon: <DashboardOutlined />,
      },
      {
        key: "package",
        label: <Link href="/admin/packages">Packages</Link>,
        icon: <BoxPlotOutlined />,
      },
      {
        key: "employees",
        label: <Link href="/admin/employees">Employees</Link>,
        icon: <UserOutlined />,
      },
      {
        key: "customers",
        label: <Link href="/admin/customers">Customers</Link>,
        icon: <UserOutlined />,
      },
    ],
    [],
  );
  useEffect(() => {
    const item = items.find((item) => pathname.includes(item.key));
    if (item) {
      setSelectedKey(item.key);
    }
  }, [pathname, items]);
  return (
    <Layout>
      <LayoutSider
        theme="light"
        trigger={null}
        collapsible
        collapsedWidth={!screen.sm ? 0 : 70}
        collapsed={isOn}
        breakpoint={"sm"}
        className="!fixed md:!relative z-10 top-0 bottom-0 left-0"
      >
        <Title level={3} className=" text-center !mt-3 mb-4">
          {isOn ? "MD" : "BU Mobile Detailing"}{" "}
        </Title>
        {!screen.sm && !isOn && (
          <MenuFoldOutlined
            className="text-lg absolute z-20 -right-4 top-6"
            onClick={toggleOn}
          />
        )}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
        />
      </LayoutSider>
      <Layout className="site-layout ">
        <Header />
        <LayoutContent
          style={{
            margin: "24px 16px",
            minHeight: 280,
          }}
        >
          {children}
        </LayoutContent>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

import { Outlet } from "react-router-dom";
import { SideBar } from "./Sidebar";

export function Layout() {
  return (
    <>
      <SideBar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

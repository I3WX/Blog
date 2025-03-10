import SideBar from "@/Components/AdminComponents/sideBar";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <SideBar />
      </div>
      {children}
    </>
  );
}
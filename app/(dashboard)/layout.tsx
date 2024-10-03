import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default DashboardLayout;

import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomBar from './BottomBar';
import SidebarLinks from '@/components/links/sidebar-links';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const items = SidebarLinks();

  return (
    <div className="p-2">
      <Topbar isSidebarOpen={isSidebarOpen} />
      <BottomBar />
      <Sidebar
        items={items}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main
        className={` ${isSidebarOpen ? 'lg:ml-[134px]' : 'lg:ml-[70px]'} pt-16 `}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

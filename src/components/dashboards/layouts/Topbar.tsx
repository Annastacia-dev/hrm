import AvatarDetails from '@/components/user/Avatar';
import TopSearchBar from '@/components/common/TopSearchBar';
import QuickActions from '@/components/user/QuickActions';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';
import { Button } from '@/components/ui/button';

const Topbar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav
      className={`flex border justify-between absolute top-0 left-2 mr-2 right-0 p-2  mt-2 rounded bg-gray-100 dark:bg-white/5 ${isSidebarOpen ? 'lg:ml-[134px]' : 'lg:ml-[70px]'}`}
    >
      <QuickActions />
      <div className="flex items-center lg:gap-4 gap-2">
        <TopSearchBar onSearch={() => {}} />
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
        <AvatarDetails />
      </div>
    </nav>
  );
};

export default Topbar;

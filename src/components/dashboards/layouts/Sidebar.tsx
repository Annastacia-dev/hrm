import { useState, useContext } from 'react';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { SidebarItemProps } from '@/interfaces/sidebar-items';
import logoIcon from '@/assets/icon-logo.png';
import logo from '@/assets/logo.png';
import UserContext from '@/contexts/user';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Sidebar = ({
  items,
  isOpen,
  setIsOpen,
}: {
  items: SidebarItemProps[];
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
}) => {
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { logout } = useContext(UserContext);

  return (
    <div
      className={`lg:flex hidden fixed h-[98vh] rounded ${isOpen ? 'w-32' : 'w-16'} bg-gray-100 dark:bg-white/5 border z-10`}
    >
      <div className="flex flex-col py-4 text-sm font-medium">
        <a href="/">
          {isOpen ? (
            <img src={logo} alt="logo" className="w-12 pt-5 pb-4  ml-4 " />
          ) : (
            <img src={logoIcon} alt="logo" className="w-6 pt-5 pb-4 ml-3" />
          )}
        </a>
        <button onClick={toggleSidebar} className="pt-4 pb-4 px-4">
          {isOpen ? <PanelRightOpen size={18} /> : <PanelLeftOpen size={18} />}
        </button>
        <div className="space-y-4">
          {items.map((item) => (
            <SidebarItem key={item.text} {...item} isOpen={isOpen} />
          ))}
        </div>
        <div className="absolute bottom-4 px-2">
          <Button
            variant="ghost"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            <span className={`${isOpen ? '' : 'hidden'}`}>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({
  icon,
  text,
  link,
  nestedItems,
  isOpen,
  className,
  onClick,
}: SidebarItemProps) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const nested = nestedItems && nestedItems.length > 0;

  return (
    <div className="relative">
      <a
        href={link}
        className={`flex items-center gap-3 py-2 px-4 cursor-pointer ${className}`}
        onClick={() => {
          if (nested) {
            setIsSubmenuOpen(!isSubmenuOpen);
          }
          if (onClick) onClick();
        }}
        title={text}
      >
        {icon}
        {isOpen && <span className="min-w-[100px]">{text}</span>}
      </a>
      {nested && isOpen && isSubmenuOpen && (
        <div className="flex flex-col">
          {nestedItems.map((item) => (
            <SidebarItem key={item.text} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;

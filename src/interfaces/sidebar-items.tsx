export interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  nestedItems?: SidebarItemProps[];
  isOpen?: boolean;
  link?: string;
  className?: string;
  onClick?: () => void;
}

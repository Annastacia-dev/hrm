'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import QuickActionLinks from '@/components/links/quick-action-links';

export default function QuickActions() {
  const actions = QuickActionLinks();
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const handleActionClick = (label: string) => {
    setOpenDrawer(label);
  };

  return (
    <div className='md:flex hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm">
            Quick Actions
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              onSelect={() => handleActionClick(action.label)}
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {actions.map((action) => (
        <Drawer
          key={action.label}
          open={openDrawer === action.label}
          onOpenChange={() => setOpenDrawer(null)}
        >
          <DrawerContent>{action.drawerContent}</DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}

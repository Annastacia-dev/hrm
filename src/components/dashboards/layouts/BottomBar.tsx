import SidebarLinks from '@/components/links/sidebar-links';

const BottomBar = () => {
  const items = SidebarLinks();

  console.log(items[0]);

  return (
    <div className="fixed bottom-0 w-full bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-900 md:hidden px-2 py-2 z-50">
      <div className="flex justify-around">
        {items.map((item) => (
          <a key={item.text} href={item.link}>
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;

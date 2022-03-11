import { Drawer, MenuToggle } from '@darwin-portfolio/react/ui';
import { useCycle } from 'framer-motion';

const Sidebar = () => {
  const [showSidebar, toggleShowSidebar] = useCycle(false, true);
  return (
    <Drawer show={showSidebar} side="left">
      <MenuToggle onToggle={toggleShowSidebar} />
    </Drawer>
  );
};

export default Sidebar;

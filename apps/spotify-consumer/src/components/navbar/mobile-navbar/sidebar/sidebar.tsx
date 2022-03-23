import { Drawer, MenuToggle } from '@darwin-portfolio/react/ui';
import { useHistory } from 'react-router-dom';
import { useCycle } from 'framer-motion';
import { Tokens, User } from '../../../../types';
import ProfileSection from '../../profile-section/profile-section';
import SidebarElement from './sidebar-element/sidebar-element';
import classes from './sidebar.module.css';

interface SidebarProps {
  user?: User;
  tokens?: Tokens;
  onSignIn: () => void;
  onSignOut: () => void;
}

const elements = [
  { id: 0, name: 'Home', to: '/' },
  { id: 1, name: 'Library', to: '/library' },
];

const Sidebar = ({ user, tokens, onSignIn, onSignOut }: SidebarProps) => {
  const [showSidebar, toggleShowSidebar] = useCycle(false, true);
  const history = useHistory();

  return (
    <Drawer show={showSidebar} side="left">
      <ul className={classes['elements']} data-testid="sidebar">
        <SidebarElement>
          <ProfileSection
            textColor="#222831"
            user={user}
            tokens={tokens}
            onSignIn={onSignIn}
          />
        </SidebarElement>
        {elements.map(({ id, name, to }) => (
          <SidebarElement
            key={id}
            name={name}
            show={
              to === '/library' ? !!tokens?.spotify && !!tokens?.firebase : true
            }
            shouldAddEffectOnMouseActivity
            onToggleSidebar={toggleShowSidebar}
            onElementClick={() => history.push(to)}
          />
        ))}
        {!!tokens?.spotify && !!tokens?.firebase && (
          <SidebarElement
            name="Sign Out"
            onElementClick={onSignOut}
            shouldAddEffectOnMouseActivity
            onToggleSidebar={toggleShowSidebar}
          />
        )}
      </ul>
      <MenuToggle onToggle={toggleShowSidebar} />
    </Drawer>
  );
};

export default Sidebar;

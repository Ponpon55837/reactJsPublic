import React, { useContext, createContext } from 'react';
import { useImmer } from 'use-immer';
import DefaultSidebarNavItems from '@/data/default-sidebar-nav-items';
import { flatten, find, reject, map } from 'lodash';

const defaultState = {
  menuVisible: false,
  navItems: DefaultSidebarNavItems,
  user: null,
};

const LocalStateContext = createContext();

const useLocalState = () => {
  const [state, produce] = useContext(LocalStateContext);

  const toggleSidebar = ({ value }) => {
    produce(draft => {
      draft.menuVisible = value !== undefined ? value : !draft.menuVisible;
    });
  };

  const toggleSidebarDropdown = (item) => {
    produce(draft => {
      const items = flatten(map(draft.navItems, 'items'));

      const itemFound = find(items, item);
      itemFound.open = !item.open;

      reject(items, item).forEach((i) => (i.open = false));
    });
  };

  const setUser = (user) => {
    produce(draft => {draft.user = user});

    if (user) {
      produce(draft => {draft.navItems = user.result});
    }
  };

  return {
    ...state,
    toggleSidebar,
    toggleSidebarDropdown,
    setUser,
  };
};

const LocalStateProvider = ({ children }) => {
  const [state, produce] = useImmer({ ...defaultState });
  return (
    <LocalStateContext.Provider value={[state, produce]}>
      {children}
    </LocalStateContext.Provider>
  );
};

export default useLocalState;
export { LocalStateProvider };

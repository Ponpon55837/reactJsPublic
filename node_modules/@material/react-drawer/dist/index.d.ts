import React from 'react';
import { MDCDismissibleDrawerFoundation, MDCModalDrawerFoundation } from '@material/drawer';
import DrawerHeader from './Header';
import DrawerContent from './Content';
import DrawerSubtitle from './Subtitle';
import DrawerTitle from './Title';
import DrawerAppContent from './AppContent';
import { FocusTrap } from 'focus-trap';
declare type RefCallback<T> = (node: T) => void;
export interface DrawerProps extends React.HTMLProps<HTMLElement> {
    className?: string;
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    tag?: string;
    dismissible?: boolean;
    modal?: boolean;
    innerRef?: RefCallback<HTMLElement> | React.RefObject<HTMLElement>;
}
interface DrawerState {
    classList: Set<string>;
}
declare class Drawer extends React.Component<DrawerProps, DrawerState> {
    previousFocus: HTMLElement | null;
    foundation?: MDCDismissibleDrawerFoundation | MDCModalDrawerFoundation;
    focusTrap?: FocusTrap;
    drawerElement: React.RefObject<HTMLDivElement>;
    state: DrawerState;
    static defaultProps: Partial<DrawerProps>;
    componentDidMount(): void;
    private initFoundation;
    componentDidUpdate(prevProps: DrawerProps & React.HTMLProps<HTMLElement>): void;
    componentWillUnmount(): void;
    private initializeFocusTrap;
    readonly classes: string;
    readonly adapter: {
        addClass: (className: string) => void;
        removeClass: (className: string) => void;
        hasClass: (className: string) => boolean;
        elementHasClass: (element: HTMLElement, className: string) => boolean;
        saveFocus: () => void;
        restoreFocus: () => void;
        focusActiveNavigationItem: () => void;
        notifyClose: (() => void) | undefined;
        notifyOpen: (() => void) | undefined;
        trapFocus: () => void;
        releaseFocus: () => void;
    };
    handleKeyDown: (evt: React.KeyboardEvent<HTMLElement>) => void;
    handleTransitionEnd: (evt: React.TransitionEvent<HTMLElement>) => void;
    attachRef: (node: HTMLElement) => void;
    render(): JSX.Element;
    renderScrim(): JSX.Element;
}
export default Drawer;
export { DrawerHeader, DrawerSubtitle, DrawerTitle, DrawerContent, DrawerAppContent, };

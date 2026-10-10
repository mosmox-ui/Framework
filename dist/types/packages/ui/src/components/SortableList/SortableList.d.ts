import { type HTMLAttributes, type ReactNode } from 'react';
import './SortableList.css';
export type SortableListSize = 'sm' | 'default' | 'lg';
export type SortableListVariant = 'plain' | 'divided' | 'bordered' | 'card';
export type SortableListItem<T = unknown> = {
    key: string;
    title: ReactNode;
    description?: ReactNode;
    content?: ReactNode;
    leading?: ReactNode;
    trailing?: ReactNode;
    meta?: ReactNode;
    disabled?: boolean;
    data?: T;
};
export type SortableListRenderState = {
    index: number;
    dragging: boolean;
    over: boolean;
    disabled: boolean;
};
export type SortableListReorderContext = {
    activeKey: string;
    overKey: string;
    fromIndex: number;
    toIndex: number;
};
export type SortableListProps<T = unknown> = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
    items: SortableListItem<T>[];
    renderItem?: (item: SortableListItem<T>, state: SortableListRenderState) => ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    size?: SortableListSize;
    variant?: SortableListVariant;
    fullWidth?: boolean;
    onReorder?: (items: SortableListItem<T>[], context: SortableListReorderContext) => void;
    dragHandleLabel?: (item: SortableListItem<T>, index: number) => string;
    emptyState?: ReactNode;
};
export declare function SortableList<T = unknown>({ items, renderItem, header, footer, size, variant, fullWidth, onReorder, dragHandleLabel, emptyState, className, style, ...rest }: SortableListProps<T>): import("react").JSX.Element;

import React from 'react';
interface ScrollItem {
    title: string;
    id: string;
    isActive: boolean;
    topic?: string;
    parent?: string;
}
interface Tree {
    unsorted: ScrollItem[];
    [key: string]: any;
}
interface ScrollSpyState {
    addNode: (instance: HTMLDivElement | null) => void;
    nodes: ScrollItem[];
    sortedNodeTree: Tree;
}
interface ScrollSpyProviderProps {
    children?: React.ReactNode;
    threshold?: number;
    options?: IntersectionObserverInit;
}
export default function ScrollSpyProvider({ children, options, }: ScrollSpyProviderProps): JSX.Element;
export declare const useScrollSpy: () => (instance: HTMLDivElement | null) => void;
export declare const useScrollSpyState: () => ScrollSpyState;
export {};

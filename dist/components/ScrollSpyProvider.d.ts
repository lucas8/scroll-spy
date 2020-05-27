import React from 'react';
interface ScrollSpyRef {
    title: string;
    topic?: string;
    parentTopic?: string;
}
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
    nodes: ScrollItem[];
    sortedNodeTree: Tree;
}
interface ScrollSpyProviderProps {
    children?: React.ReactNode;
    threshold?: number;
    options?: IntersectionObserverInit;
}
export default function ScrollSpyProvider({ children, options }: ScrollSpyProviderProps): JSX.Element;
export declare const useScrollSpy: () => (instance: HTMLDivElement | null, options: ScrollSpyRef) => void;
export declare const useScrollSpyState: () => ScrollSpyState;
export {};

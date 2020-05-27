/// <reference types="react" />
export default function ScrollSpyProvider({ children, options }: ScrollSpyProviderProps): JSX.Element;
export declare const useScrollSpy: () => (instance: HTMLDivElement | null, options: ScrollSpyRef) => void;
export declare const useScrollSpyState: () => ScrollSpyState;

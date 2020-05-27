import React from 'react';
interface ScrollSpyComponentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: React.ReactNode;
    title: string;
    id: string;
    inheritedTopic?: string;
    parentTopic?: string;
}
export default function Section({ children, title, id, inheritedTopic, parentTopic, ...rest }: ScrollSpyComponentProps): JSX.Element;
export {};

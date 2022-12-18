import * as react from 'react';
import * as _storybook_theming from '@storybook/theming';

declare const Section: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
}, react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
declare const Heading: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
}, react.DetailedHTMLProps<react.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}>;
declare const Content: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
}, react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
declare const Note: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
}, react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
declare const ResultValue: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
}, react.DetailedHTMLProps<react.HTMLAttributes<HTMLElement>, HTMLElement>, {}>;
declare const ResultScale: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
}, react.DetailedHTMLProps<react.HTMLAttributes<HTMLElement>, HTMLElement>, {}>;
declare const ValueLozenge: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
} & {
    hasWarningIcon?: boolean | undefined;
    type: 'positive' | 'negative' | 'warning' | 'info' | 'faint' | 'raw';
    width?: "fill" | "inherit" | undefined;
}, react.DetailedHTMLProps<react.HTMLAttributes<HTMLElement>, HTMLElement>, {}>;
declare const Table: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
}, react.DetailedHTMLProps<react.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, {}>;
declare const TitleCell: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
}, react.DetailedHTMLProps<react.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>, {}>;
declare const ValueCell: _storybook_theming.StyledComponent<{
    theme?: _storybook_theming.Theme | undefined;
    as?: react.ElementType<any> | undefined;
}, react.DetailedHTMLProps<react.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>, {}>;

export { Content, Heading, Note, ResultScale, ResultValue, Section, Table, TitleCell, ValueCell, ValueLozenge };

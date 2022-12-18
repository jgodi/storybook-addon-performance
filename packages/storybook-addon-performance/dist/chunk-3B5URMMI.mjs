// src/panel/task-result/parts.tsx
import { styled } from "@storybook/theming";
var Section = styled.div`
  background-color: ${(props) => props.theme.background.content};
  padding: var(--grid);
  padding-top: 0;

  > * {
    margin-top: var(--grid);
  }

  &:last-of-type {
    border-bottom-left-radius: var(--result-border-radius);
    border-bottom-right-radius: var(--result-border-radius);
  }
`;
var Heading = styled.h4`
  font-weight: bold;
`;
var Content = styled.div``;
var Note = styled.div`
  padding: calc(var(--grid) / 2);
  background-color: ${(props) => props.theme.background.hoverable};
  border-radius: var(--result-border-radius);
  font-size: small;

  &::before {
    margin-right: 1ch;
    content: 'ℹ️';
  }
`;
var ResultValue = styled.code`
  /* font-family: 'Courier'; */
`;
var ResultScale = styled.code`
  /* slightly smaller margin that other elements */
  margin-left: var(--halfGrid);
`;
var ValueLozenge = styled.code`
  ${({ hasWarningIcon = true }) => !hasWarningIcon && `&:before {
      content: '\u26A0\uFE0F';
      margin-right: 1ch;
    }`};
  padding: calc(var(--grid) / 2) var(--grid);
  border-radius: var(--result-border-radius);
  color: ${(props) => props.theme.color.light};
  font-weight: bold;
  font-size: small;
  background-color: ${({ type, theme }) => {
  switch (type) {
    case "positive":
      return theme.color.positive;
    case "negative":
      return theme.color.negative;
    case "faint":
      return theme.color.medium;
    case "warning":
      return theme.color.warning;
    case "info":
      return theme.color.seafoam;
    default:
      return theme.color.purple;
  }
}};
`;
var Table = styled.table`
  width: 100%;
`;
var TitleCell = styled.td``;
var ValueCell = styled.td`
  text-align: right;
`;

export {
  Section,
  Heading,
  Content,
  Note,
  ResultValue,
  ResultScale,
  ValueLozenge,
  Table,
  TitleCell,
  ValueCell
};

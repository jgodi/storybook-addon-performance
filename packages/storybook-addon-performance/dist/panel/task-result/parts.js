"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/panel/task-result/parts.tsx
var parts_exports = {};
__export(parts_exports, {
  Content: () => Content,
  Heading: () => Heading,
  Note: () => Note,
  ResultScale: () => ResultScale,
  ResultValue: () => ResultValue,
  Section: () => Section,
  Table: () => Table,
  TitleCell: () => TitleCell,
  ValueCell: () => ValueCell,
  ValueLozenge: () => ValueLozenge
});
module.exports = __toCommonJS(parts_exports);
var import_theming = require("@storybook/theming");
var Section = import_theming.styled.div`
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
var Heading = import_theming.styled.h4`
  font-weight: bold;
`;
var Content = import_theming.styled.div``;
var Note = import_theming.styled.div`
  padding: calc(var(--grid) / 2);
  background-color: ${(props) => props.theme.background.hoverable};
  border-radius: var(--result-border-radius);
  font-size: small;

  &::before {
    margin-right: 1ch;
    content: 'ℹ️';
  }
`;
var ResultValue = import_theming.styled.code`
  /* font-family: 'Courier'; */
`;
var ResultScale = import_theming.styled.code`
  /* slightly smaller margin that other elements */
  margin-left: var(--halfGrid);
`;
var ValueLozenge = import_theming.styled.code`
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
var Table = import_theming.styled.table`
  width: 100%;
`;
var TitleCell = import_theming.styled.td``;
var ValueCell = import_theming.styled.td`
  text-align: right;
`;

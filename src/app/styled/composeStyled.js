import styled, { css } from 'styled-components';

export const makeModifier = (prop, modifier) => (props) => props[prop] && modifier;

export default function composeStyled(element, base, ...modifiers) {
  return styled(element)`
    ${modifiers.reduce((mods, modifier) => css`${mods} ${modifier}`, base)}
  `;
}

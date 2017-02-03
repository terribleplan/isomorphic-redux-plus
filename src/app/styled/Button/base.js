import { css } from 'styled-components';
import { getters as g } from 'styled/theme';

export default css`
  background: ${g.bg};
  border: none;
  border-radius: ${g.border}px;
  color: ${g.fg};
  cursor: pointer;
  display: inline-block;
  font-size: ${g.size};
  font-weight: 500;
  height: 2.5em;
  line-height: 2.5em;
  margin: 0;
  min-width: 6em;
  padding: 0 1em;
  position: relative;
  text-transform: uppercase;
  overflow: hidden;
  outline: none;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  transition: box-shadow .2s cubic-bezier(.4,0,1,1),
              background-color .2s cubic-bezier(.4,0,.2,1),
              color .2s cubic-bezier(.4,0,.2,1);

  &:hover, &:focus {
    background: ${g.gray}
  }

  &:active {
    background: ${g.mediumGray}
  }
`;

import React, { PropTypes } from 'react';

import composeStyled from '../composeStyled';
import Ripple from '../Ripple';
import modifiers from './modifiers';
import base from './base';

const StyledButton = composeStyled('button', base, ...modifiers);

export default function Button({ children, ripple, ...props }) {
  return (
    <StyledButton {...props}>
      {children}
      {ripple && <Ripple round={props.fab || props.icon} />}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  ripple: PropTypes.bool,
  fab: PropTypes.bool,
  icon: PropTypes.bool,
  href: PropTypes.string,
  to: PropTypes.string,
};

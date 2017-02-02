import styled, { css, keyframes } from 'styled-components';
import React from 'react';
import { autobind } from 'core-decorators';
import { getters as g } from './theme';

const base = css`
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

const raised = css`
  background: ${g.gray};
  color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),
              0 3px 1px -2px rgba(0,0,0,.2),
              0 1px 5px 0 rgba(0,0,0,.12);
  &:hover, &:focus {
    background: ${g.gray};
  }
  &:active {
    background: ${g.mediumGray};
    box-shadow: 0 4px 5px 0 rgba(0,0,0,.14),
                0 1px 10px 0 rgba(0,0,0,.12),
                0 2px 4px -1px rgba(0,0,0,.2);
  }
`;

const fab = css`
  border-radius: 50%;
  font-size: 1.5rem;
  height: 3.5rem;
  margin: auto;
  min-width: 3.5rem;
  width: 3.5rem;
  padding: 0;
  overflow: hidden;
  background: ${g.gray};
  box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12),
              0 1px 1px 0 rgba(0,0,0,.24);
  position: relative;
  line-height: normal;
  &:active {
     box-shadow: 0 4px 5px 0 rgba(0,0,0,.14),
                 0 1px 10px 0 rgba(0,0,0,.12),
                 0 2px 4px -1px rgba(0,0,0,.2);
  }
`;

const icon = css`
  border-radius: 50%;
  font-size: 1.5rem;
  height: 2rem;
  margin-left: 0;
  margin-right: 0;
  min-width: 2rem;
  width: 2rem;
  padding: 0;
  overflow: hidden;
  color: inherit;
  line-height: normal;
`;

const raisedColored = (color) => css`
  background: ${g[color]};
  color: #fff;
  &:hover, &:focus {
    background: ${g[color]};
  }
  &:active {
    background: ${g[color]};
  }
`;

const colored = (color) => css`
  color: ${g[color]};
  ${(props) => props.raised || props.fab && raisedColored(color)}
`;

const ripple = css`
  position: relative;
`;

const Styled = styled.button`
  ${base}
  ${(props) => props.raised && raised}
  ${(props) => props.fab && raised && fab}
  ${(props) => props.icon && icon}
  ${(props) => props.colored && colored('primary')}
  ${(props) => props.accent && colored('accent')}
  ${(props) => props.ripple && ripple}
`;

const rippleContainerFab = css`
  border-radius: 50%;
  // Fixes clipping bug in Safari.
  -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
`;

const RippleContainer = styled.div`
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
  overflow: hidden;
  ${(props) => props.fab && rippleContainerFab}
`;

const animationCurveLinearOutSlowIn = 'cubic-bezier(0,0,.2,1)';

const rippleAnimation = keyframes`
  from {
    transform: scale(-1);
    opacity: 0;
  }
  to {
    transform: scale(2);
    opacity: 0.3;
  }
`;

const isAnimating = css`
  animation: ${rippleAnimation} 0.3s ${animationCurveLinearOutSlowIn};
`;

const Ripple = styled.div`
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  ${(props) => props.isAnimating && isAnimating}
  animation-fill-mode: forwards;
`;

export default class Button extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
    ripple: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      ripple: false,
    };
  }

  onMouseDown() {
    this.setState({ ripple: true });
  }

  onMouseUp() {
    setTimeout(() => this.setState({ ripple: false }), 50);
  }

  render() {
    const { children, ...props } = this.props;
    const rippleEffect = (
      <RippleContainer {...props}>
        <Ripple isAnimating={this.state.ripple}>{children}</Ripple>
      </RippleContainer>
    );

    return (
      <Styled
        {...props}
        onMouseDown={() => props.ripple && this.onMouseDown()}
        onMouseUp={() => props.ripple && this.onMouseUp()}
      >
        {props.ripple ? rippleEffect : children}
      </Styled>
    );
  }
}

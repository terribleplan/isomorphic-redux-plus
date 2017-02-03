import styled, { css, keyframes } from 'styled-components';
import React from 'react';

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
  animation: ${rippleAnimation} 0.3s ${animationCurveLinearOutSlowIn} forwards;
`;

const RippleEffect = styled.div`
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
  ${(props) => props.isAnimating && isAnimating}`
;

const roundRipple = css`
  border-radius: 50%;
  // Fixes clipping bug in Safari.
  -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
`;

const RippleWrap = styled.div`
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
  overflow: hidden;
  ${({ round }) => round && roundRipple}
`;

export default class Ripple extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnimating: false,
    };
  }

  onMouseDown() {
    this.setState({ isAnimating: true });
  }

  onMouseUp() {
    setTimeout(() => {
      this.setState({ isAnimating: false });
    }, 50);
  }

  render() {
    return (
      <RippleWrap
        {...this.props}
        onMouseDown={() => this.onMouseDown()}
        onMouseUp={() => this.onMouseUp()}
      >
        <RippleEffect
          {...this.state}
        />
      </RippleWrap>
    );
  }
}

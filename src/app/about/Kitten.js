import React from 'react';
import styled from 'styled-components';

import kitten from './kitten.jpg';

const Img = styled.img`
  max-width: 100%;
`;

export default function Kitten() {
  return <Img src={kitten} alt="kitten" />;
}

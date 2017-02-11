import React, { PropTypes } from 'react';
import styled from 'styled-components';

import {
  Button,
  Card,
  CardActions,
  CardContent,
} from 'styled';

import Kitten from './Kitten';

const CatCard = styled(Card)`
  flex-grow: 0;
  max-width: 312px;
`;

export default function KittenCard({ showKitten, onKittenToggle }) {
  return (
    <CatCard>
      <CardContent>
        <h4>Psst! Would you like to see a kitten?</h4>
        {showKitten && <Kitten />}
      </CardContent>
      <CardActions>
        <Button onClick={onKittenToggle}>
          {showKitten ? 'No! Take it away!' : 'Yes! Please!'}
        </Button>
      </CardActions>
    </CatCard>
  );
}

KittenCard.propTypes = {
  showKitten: PropTypes.bool,
  onKittenToggle: PropTypes.func,
};

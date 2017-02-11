import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { prefetch } from '@isogon/prefetch';
import { createStructuredSelector as select } from 'reselect';

import {
  Card,
  CardContent,
  CardList,
  CardTitle,
  Markdown,
} from 'styled';

import KittenCard from './KittenCard';
import { toggleKitten, loadAbout } from './actions';
import { getAbout, getShowKitten } from './selectors';

const CardRow = styled(CardList)`
  flex-wrap: nowrap;
`;

// eslint-disable-next-line react/prefer-stateless-function
export class About extends React.Component {
  static propTypes = {
    about: PropTypes.any.isRequired,
    showKitten: PropTypes.bool.isRequired,
    toggleKitten: PropTypes.func.isRequired,
  };

  render() {
    const props = this.props;
    return (
      <CardRow>
        <Card>
          <CardTitle>About this project:</CardTitle>
          <CardContent>
            <Markdown text={props.about} />
          </CardContent>
        </Card>
        <KittenCard
          onKittenToggle={props.toggleKitten}
          showKitten={props.showKitten}
        />
      </CardRow>
    );
  }
}

export default compose(
  prefetch(loadAbout),
  connect(select({
    about: getAbout,
    showKitten: getShowKitten,
  }), { toggleKitten })
)(About);

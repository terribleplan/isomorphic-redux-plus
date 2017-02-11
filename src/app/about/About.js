import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { prefetch } from '@isogon/prefetch';
import { createStructuredSelector as select } from 'reselect';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardList,
  CardTitle,
  renderMarkdown,
} from 'styled';

import kitten from './kitten.jpg';
import { toggleKitten, loadAbout } from './actions';
import { getAbout, getShowKitten } from './selectors';

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
      <CardList>
        <Card>
          <CardTitle>About this project:</CardTitle>
          <CardContent>
            {renderMarkdown(props.about)}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h4>Psst! Would you like to see a kittenss?</h4>
            {props.showKitten && <img src={kitten} alt="kitten" />}
          </CardContent>
          <CardActions>
            <Button onClick={props.toggleKitten}>
              {props.showKitten ? 'No! Take it away!' : 'Yes! Please!'}
            </Button>
          </CardActions>
        </Card>
      </CardList>
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

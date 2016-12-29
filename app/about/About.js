import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { loadAbout } from './actions';
import { getAbout } from './selectors';
import fetchData from 'lib/fetchData';
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

@fetchData((state, dispatch) => dispatch(loadAbout()))
@connect((state) => ({ about: getAbout(state) }))
// eslint-disable-next-line react/prefer-stateless-function
export default class About extends React.Component {
  static propTypes = {
    about: PropTypes.any.isRequired,
  };

  state = {
    showKitten: false,
  }

  @autobind
  handleToggleKitten() {
    this.setState({ showKitten: !this.state.showKitten });
  }

  render() {
    const { showKitten } = this.state;
    return (
      <CardList>
        <Card>
          <CardTitle>About this project:</CardTitle>
          <CardContent>
            {renderMarkdown(this.props.about)}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h4>Psst! Would you like to see a kitten?</h4>
            {showKitten && <img src={kitten} alt="kitten" />}
          </CardContent>
          <CardActions>
            <Button onClick={this.handleToggleKitten}>
              {showKitten ? 'No! Take it away!' : 'Yes! Please!'}
            </Button>
          </CardActions>
        </Card>
      </CardList>
    );
  }
}

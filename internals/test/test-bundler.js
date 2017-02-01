// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';
require('jsdom-global')();

// If we need to use Chai, we'll have already chaiEnzyme loaded
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const context = require.context('../../tests', true, /\.browser\.js$/);

context.keys().forEach(context);

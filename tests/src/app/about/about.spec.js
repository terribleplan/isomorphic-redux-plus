import React from 'react';
import { shallow } from 'enzyme';

import { About } from 'about/About';

const baseProps = {
  showKitten: true,
  toggleKitten: jest.fn(),
  about: 'about',
};

const renderComponent = (props) => shallow(
  <About {...baseProps} {...props} />
);

describe('<About />', () => {
  const component = renderComponent();

  it('has a KittenCard', () => {
    const kittenCard = component.find('KittenCard');

    expect(kittenCard).toBePresent();
    expect(kittenCard).toHaveProp('showKitten', baseProps.showKitten);
    expect(kittenCard).toHaveProp('onKittenToggle', baseProps.toggleKitten);
  });

  it('has about text', () => {
    const markdown = component.find('Markdown');

    expect(markdown).toBePresent();
    expect(markdown).toHaveProp('text', baseProps.about);
  });
});

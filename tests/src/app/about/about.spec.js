import React from 'react';
import { shallow } from 'enzyme';

import { About } from 'about/About';
import { Button } from 'styled';


const renderComponent = (props) => {
  const baseProps = {
    showKitten: true,
    toggleKitten: jest.fn(),
    about: 'about',
  };

  return shallow(
    <About {...baseProps} {...props} />
  );
};

describe('<About />', () => {
  describe('when [prop] showKitten is true', () => {
    const component = renderComponent({ showKitten: true });

    it('shows a kitten', () => {
      expect(component.find('img[alt="kitten"]').length).toEqual(1);
    });

    it('shows a button that says `No! Take it away!`', () => {
      expect(component.find(Button).prop('children')).toEqual('No! Take it away!');
    });
  });

  describe('when [prop] showKitten is false', () => {
    const component = renderComponent({ showKitten: false });

    it('does not show a kitten', () => {
      expect(component.find('img[alt="kitten"]').length).toEqual(0);
    });

    it('shows a button that says `Yes! Please!`', () => {
      expect(component.find(Button).prop('children')).toEqual('Yes! Please!');
    });
  });

  describe('when the toggle kitten Button is clicked', () => {
    const toggleKitten = jest.fn();
    const component = renderComponent({ toggleKitten });

    beforeEach(() => component.find(Button).simulate('click'));

    it('triggers [prop] toggleKitten', () => {
      expect(toggleKitten.mock.calls.length).toEqual(1);
    });
  });
});

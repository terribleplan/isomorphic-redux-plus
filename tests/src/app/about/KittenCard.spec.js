import React from 'react';
import { shallow } from 'enzyme';

import KittenCard from 'about/KittenCard';
import Kitten from 'about/Kitten';
import { Button } from 'styled';

const baseProps = {
  showKitten: true,
  onKittenToggle: jest.fn(),
};

const renderComponent = (props) => shallow(
  <KittenCard {...baseProps} {...props} />
);

describe('<KittenCard />', () => {
  describe('when [prop] showKitten is true', () => {
    const component = renderComponent({ showKitten: true });

    it('shows a kitten', () => {
      expect(component.find(Kitten)).toBePresent();
    });

    it('shows a button that says `No! Take it away!`', () => {
      expect(component.find(Button)).toHaveProp('children', 'No! Take it away!');
    });
  });

  describe('when [prop] showKitten is false', () => {
    const component = renderComponent({ showKitten: false });

    it('does not show a kitten', () => {
      expect(component.find(Kitten)).not.toBePresent();
    });

    it('shows a button that says `Yes! Please!`', () => {
      expect(component.find(Button)).toHaveProp('children', 'Yes! Please!');
    });
  });

  describe('when the toggle kitten Button is clicked', () => {
    const onKittenToggle = jest.fn();
    const component = renderComponent({ onKittenToggle });

    beforeEach(() => component.find(Button).simulate('click'));

    it('triggers [prop] onKittenToggle', () => {
      expect(onKittenToggle).toHaveBeenCalled();
    });
  });
});

import React from 'react';
import { mount } from 'enzyme';

import { About } from 'about/About';
import { Button } from 'styled';

describe('<About />', () => {
  const toggleKitten = sinon.spy();
  const baseProps = {
    showKitten: true,
    toggleKitten,
    about: 'about',
  };

  const props = (newProps) => ({ ...baseProps, ...newProps });

  describe('when [prop] showKitten is true', () => {
    const wrapper = mount(<About {...props({ showKitten: true })} />);

    it('shows a kitten', () => {
      expect(wrapper.find('img[alt="kitten"]')).to.have.length(1);
    });

    it('shows a button that says `No! Take it away!`', () => {
      expect(wrapper.find(Button).text()).to.equal('No! Take it away!');
    });
  });

  describe('when [prop] showKitten is false', () => {
    const wrapper = mount(<About {...props({ showKitten: false })} />);

    it('does not show a kitten', () => {
      expect(wrapper.find('img[alt="kitten"]')).to.have.length(0);
    });

    it('shows a button that says `Yes! Please!`', () => {
      expect(wrapper.find(Button).text()).to.equal('Yes! Please!');
    });
  });

  describe('when the toggle kitten Button is clicked', () => {
    const wrapper = mount(<About {...props()} />);

    it('triggers [prop] toggleKitten', () => {
      wrapper.find(Button).simulate('click');
      expect(toggleKitten).to.have.been.calledOnce;
    });
  });
});

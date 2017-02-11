import About from 'about/About';
import * as about from 'about';

describe('about exports', () => {
  it('exports About', () => {
    expect(about.About).toBe(About);
  });
});

import { About } from 'about/About';

describe('/', () => {
  let route;

  const about = 'Hello, world!';

  beforeEach(() =>
    renderRoute('/', (mock) => {
      mock.onGet('/about').reply(() => [200, { text: about }]);
    }).then((r) => (route = r)));

  it('renders <About />', () => {
    expect(route.find(About)).toBePresent();
    expect(route.find(About)).toHaveProp('about', about);
  });
});

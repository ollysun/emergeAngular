import { BackofficePage } from './app.po';

describe('backoffice App', function() {
  let page: BackofficePage;

  beforeEach(() => {
    page = new BackofficePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

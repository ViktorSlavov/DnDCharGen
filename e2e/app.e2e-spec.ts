import { DndCharGenPage } from './app.po';

describe('dnd-char-gen App', function() {
  let page: DndCharGenPage;

  beforeEach(() => {
    page = new DndCharGenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

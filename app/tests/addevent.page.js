import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class AddEventPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADD_EVENT}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to add event, then checks to see that the commit was successful. */
  async addEvent() {
    await t.typeText('#title', 'Makiki Park Clean Up');
    await t.click('#submit-button');
  }
}

export const addEventPage = new AddEventPage();

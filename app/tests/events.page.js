import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class EventsPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.EVENTS}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /* Inputs text to determine if entry is valid */
  async enterField() {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.SEARCHBAR}`, 'clean up');
  }
}

export const eventsPage = new EventsPage();

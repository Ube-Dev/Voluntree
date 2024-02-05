import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class HomePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME_PAGE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /* Inputs text to determine if entry is valid */
  async enterField() {
    await this.isDisplayed();
    await t.click(`#${COMPONENT_IDS.SEARCHBAR}`);
    await t.typeText(`#${COMPONENT_IDS.SEARCHBAR}`, 'clean up');
  }
}

export const homePage = new HomePage();

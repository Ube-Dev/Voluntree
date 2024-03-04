import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class EditUserProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.EDIT_USER_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const editUserProfilePage = new EditUserProfilePage();

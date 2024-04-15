import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class EditOrgProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.EDIT_ORGANIZATION_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const editOrgProfilePage = new EditOrgProfilePage();

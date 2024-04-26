import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class AdminUserModerationPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADMIN_USER_MODERATION}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok({ timeout: 5000 });
  }
}

export const adminUserModerationPage = new AdminUserModerationPage();

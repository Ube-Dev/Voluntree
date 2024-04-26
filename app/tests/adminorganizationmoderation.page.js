import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class AdminOrganizationModerationPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADMIN_ORGANIZATION_MODERATION}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok({ timeout: 5000 });
  }
}

export const adminOrganizationModerationPage = new AdminOrganizationModerationPage();

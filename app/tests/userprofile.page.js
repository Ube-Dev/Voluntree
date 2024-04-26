import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class UserProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.USER_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok({ timeout: 5000 });
  }

  /* Go to Edit User Profile page */
  async gotoEditUserProfile() {
    await t.expect(Selector(`#${COMPONENT_IDS.USER_PROFILE_EDIT_PROFILE}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.USER_PROFILE_EDIT_PROFILE}`);
  }
}

export const userProfilePage = new UserProfilePage();

import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class OrgProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ORGANIZATION_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok({ timeout: 5000 });
  }

  /* Go to Edit Org Profile page */
  async gotoEditOrgProfile() {
    await t.expect(Selector(`#${COMPONENT_IDS.ORGANIZATION_PROFILE_EDIT_PROFILE}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.ORGANIZATION_PROFILE_EDIT_PROFILE}`);
  }
}

export const orgProfilePage = new OrgProfilePage();

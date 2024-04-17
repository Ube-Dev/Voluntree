import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
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

  /* Updates organization profile with new fields. */
  async updateProfile() {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_NAME}`, 'LE SSERAFIM');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_IMAGE}`, 'img link');
  }
}

export const editOrgProfilePage = new EditOrgProfilePage();

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
    const imgLink = '\'https://www.billboard.com/wp-content/uploads/2023/04/LE-SSERAFIM-press-credit-SOURCE-MUSIC-2023-billboard-exclusive-1548.jpg\'';
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_NAME}`, 'LE SSERAFIM');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_IMAGE}`, imgLink);
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_MISSION}`, 'beating the can\'t sing allegations');
    await t.click(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_SUBMIT} input.btn.btn-primary`);
  }
}

export const editOrgProfilePage = new EditOrgProfilePage();

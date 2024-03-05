import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
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

  /* Update user profile */
  async updateProfile() {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_FIRST_NAME}`, 'John');
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_LAST_NAME}`, 'Doe');
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_PROFILE_PICTURE_URL}`, 'https://i.pinimg.com/736x/df/3e/2f/df3e2ff88a1453362c743b01dd8fb2f8.jpg');
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_ADDRESS}`, '2500 Campus Road');
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_PHONE}`, '123-456-7890');
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_EMAIL}`, 'john@foo.com');
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_CITY}`, 'Honolulu');
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_STATE}`, 'HI');
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_COUNTRY}`, 'United States');
    await t.typeText(`#${COMPONENT_IDS.EDIT_USER_PROFILE_ZIP_CODE}`, '96822');
    await t.click(`#${COMPONENT_IDS.EDIT_USER_PROFILE_SUBMIT} input.btn.btn-primary`);
  }
}

export const editUserProfilePage = new EditUserProfilePage();

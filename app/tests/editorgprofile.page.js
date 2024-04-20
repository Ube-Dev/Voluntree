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

  /* Updates organization profile with new fields and verifies that the update went through. */
  async updateProfile() {
    const imgLink = 'https://www.billboard.com/wp-content/uploads/2023/04/LE-SSERAFIM-press-credit-SOURCE-MUSIC-2023-billboard-exclusive-1548.jpg'; // For updating image URL
    // For updating org type
    const typeField = Selector(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_TYPE}`);
    const optionToSelect = typeField.find('option').withText('school');

    await this.isDisplayed(); // Verify that edit page is displayed

    // Clear all fields in the first part of the form
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_NAME}`).pressKey('delete');
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_IMAGE}`).pressKey('delete');
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_MISSION}`).pressKey('delete');
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_PHONE}`).pressKey('delete');
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_CONTACT_EMAIL}`).pressKey('delete');

    // Update fields in the first part of the form
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_NAME}`, 'LE SSERAFIM'); // name
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_IMAGE}`, imgLink); // image url
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_MISSION}`, 'beating the can\'t sing allegations'); // mission
    // Update org type
    await t.click(typeField);
    await t.click(optionToSelect);
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_PHONE}`, '111-111-1111'); // phone number
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_CONTACT_EMAIL}`, 'chaewon@foo.com'); // contact email

    // Expand form by clicking Has Physical Address
    await t.click(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_HAS_PHYSICAL_ADDRESS}`);

    // Clear all fields in the address part of the form
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_ADDRESS}`).pressKey('delete');
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_CITY}`).pressKey('delete');
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_STATE}`).pressKey('delete');
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_ZIP_CODE}`).pressKey('delete');
    await t.selectText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_COUNTRY}`).pressKey('delete');

    // Update all address fields
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_ADDRESS}`, '2500 Campus Road');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_CITY}`, 'Honolulu');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_STATE}`, 'HI');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_ZIP_CODE}`, '96822');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_COUNTRY}`, 'United States');

    await t.click(`#${COMPONENT_IDS.EDIT_ORGANIZATION_PROFILE_SUBMIT} input.btn.btn-primary`); // Submit to update
  }
}

export const editOrgProfilePage = new EditOrgProfilePage();

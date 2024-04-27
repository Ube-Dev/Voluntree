import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
import { tosModal } from './tosmodal.component';

class SignUpPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SIGN_UP}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok({ timeout: 5000 });
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(firstName, lastName, username, password) {
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}`, firstName);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}`, lastName);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, username);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, password);
    await tosModal.openTermsOfService();
    await tosModal.accept();
    await t.wait(5000);
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} input.btn.btn-primary`);
  }
}

export const signUpPage = new SignUpPage();

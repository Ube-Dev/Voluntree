import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class NavBar {

  /* If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout() {
    const loggedInUser = await Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists;
    if (loggedInUser) {
      await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
      await t.click(`#${COMPONENT_IDS.NAVBAR_SIGN_OUT_PAGE}`);
    }
  }

  async gotoSignInPage() {
    await this.ensureLogout(t);
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN}`);
  }

  /* Check that the specified user is currently logged in. */
  async isLoggedIn(username) {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    const loggedInUser = Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).innerText;
    await t.expect(loggedInUser).eql(username);
  }

  /* Check that someone is logged in, then click items to logout. */
  async logout() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_SIGN_OUT_PAGE}`);
  }

  /* Pull down login menu, go to sign up page. */
  async gotoSignUpPage() {
    await this.ensureLogout(t);
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP}`);
  }

  async gotoSignUpOrganizationPage() {
    await this.ensureLogout(t);
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP_ORGANIZATION}`);
  }

  /* Go to the user page */
  async gotoUserPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
  }

  /* Go to the manage database page. Must be admin. */
  async gotoManageDatabasePage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE}`);
  }

  /* Go to the dashboard page. */
  async gotoDashboardPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_DASHBOARD_PAGE}`);
  }

  /* Go to the FAQ page. */
  async gotoFAQPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.click(`#${COMPONENT_IDS.NAVBAR_FAQ_PAGE}`);
  }

  /* Go to the sign up page. */
  async gotoSubscribePage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.click(`#${COMPONENT_IDS.NAVBAR_SUBSCRIBE_PAGE}`);
  }

  /* Go to the Home page. */
  async gotoHomePage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
  }

  /* Go to the about page. */
  async gotoAboutPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.click(`#${COMPONENT_IDS.NAVBAR_ABOUT_PAGE}`);
  }

  /* Go to the events page. */
  async gotoEventsPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_EVENTS_PAGE}`);
  }

  /* Go to the My Events page. */
  async gotoMyEventsPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_MY_EVENTS_PAGE}`);
  }

  /* Go to the add event page. */
  async gotoAddEventPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_ADD_EVENT_PAGE}`);
  }

  /* Go to the Profile page. */
  async gotoUserProfilePage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_USER_PROFILE_PAGE}`);
  }

  /* Go to the event moderation page. */
  async gotoEventModerationPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_ADMIN_EVENT_MODERATION_PAGE}`);
  }

  /* Go to the Organization moderation page. */
  async gotoOrganizationModerationPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_ADMIN_ORGANIZATION_MODERATION_PAGE}`);
  }

  /* Go to the User moderation page. */
  async gotoUserModerationPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_ADMIN_USER_MODERATION_PAGE}`);
  }

  /* Go to the Review moderation page. */
  async gotoReveiwModerationPage() {
    const visible = await Selector(`#${COMPONENT_IDS.NAVBAR_COLLAPSE}`).visible;
    if (!visible) {
      await t.click('button.navbar-toggler');
    }
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_ADMIN_REVIEW_MODERATION_PAGE}`);
  }
}

export const navBar = new NavBar();

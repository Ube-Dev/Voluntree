import { signOutPage } from './simple.page';
import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
import { signUpPage } from './signup.page';
import { navBar } from './navbar.component';
import { aboutPage } from './about.page';
import { faqPage } from './faq.page';
import { eventsPage } from './events.page';
import { subscribePage } from './subscribe.page';
import { homePage } from './home.page';
import { myEventsPage } from './myevents.page';
import { addEventPage } from './addevent.page';
import { viewEventPage } from './viewevent.page';
import { editEventPage } from './editevent.page';
import { userProfilePage } from './userprofile.page';
import { upcomingEventCard } from './upcomingeventcard.component';
import { editUserProfilePage } from './edituserprofile.page';
import { userDashboard } from './userdashboard.component';
import { orgProfilePage } from './orgprofile.page';
import { orgDashboardPage } from './orgdashboard.page';
import { orgOverview } from './orgoverview.component';
import { editOrgProfilePage } from './editorgprofile.page';
import { orgDropdown } from './orgdropdown.component';
import { orgEventCard } from './orgeventcard.component';
import { orgScanQRPage } from './orgscanqr.page';
import { manageDatabase } from './managedatabase.page';
import { adminEventModerationPage } from './admineventmoderation.page';
import { adminOrganizationModerationPage } from './adminorganizationmoderation.page';
import { adminUserModerationPage } from './adminusermoderation.page';
import { adminHome } from './adminhome.component';
import { userQRCodePage } from './userqrcode.page';
import { footer } from './footer.component';
import { createOrganizationPage } from './createorganization.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const orgCredentials = { username: 'organization@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const newCredentials = { firstName: 'Chaewon', lastName: 'Kim', username: 'chaewon@foo.com', password: 'fearless' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that sign in and sign out work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that sign up and sign out work', async () => {
  await navBar.gotoSignUpPage();
  await signUpPage.isDisplayed();
  await signUpPage.signupUser(newCredentials.firstName, newCredentials.lastName, newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(newCredentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

/** The following tests are for pages that non-users can navigate to. */
test('Test that about page works', async () => {
  await navBar.gotoAboutPage();
  await aboutPage.isDisplayed();
});

test('Test that FAQ page works', async () => {
  await navBar.gotoFAQPage();
  await faqPage.isDisplayed();
});

test('Test that find events page works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoEventsPage();
  await eventsPage.isDisplayed();
  await eventsPage.enterField();
});

test('Test that subscribe page works', async () => {
  await navBar.gotoSubscribePage();
  await subscribePage.isDisplayed();
});

test('Test that User Home page works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoHomePage();
  await homePage.isDisplayed();
});

test('Test that My Event page works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoMyEventsPage();
  await myEventsPage.isDisplayed();
});

test('Test that add event form works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(orgCredentials.username, orgCredentials.password);
  await navBar.isLoggedIn(orgCredentials.username);
  await navBar.gotoAddEventPage();
  await addEventPage.addEvent();
});

/** The following tests are for interacting with the user dashboard. */
test('Test that view user profile can be accessed from Home', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await homePage.isDisplayed();
  await userDashboard.gotoUserProfilePage();
  await userProfilePage.isDisplayed();
});

test('Test that edit user profile can be accessed from Home', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await homePage.isDisplayed();
  await userDashboard.gotoEditUserProfilePage();
  await editUserProfilePage.isDisplayed();
});

test('Test that user\'s QR code can be navigated to from Home', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await homePage.isDisplayed();
  await userDashboard.gotoUserQRCodePage();
  await userQRCodePage.isDisplayed();
});

/** The following tests interact with the user profile pages. */
test('Test that view user profile can be accessed from NavBar', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoUserProfilePage();
  await userProfilePage.isDisplayed();
});

test('Test that edit user profile can be accessed from view user profile', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoUserProfilePage();
  await userProfilePage.isDisplayed();
  await userProfilePage.gotoEditUserProfile();
  await editUserProfilePage.isDisplayed();
});

test('Test that find events can be accessed from user profile', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoUserProfilePage();
  await userProfilePage.isDisplayed();
  await upcomingEventCard.gotoEventsPage();
  await eventsPage.isDisplayed();
});

test('Test that user profile can be updated', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoUserProfilePage();
  await userProfilePage.isDisplayed();
  await userProfilePage.gotoEditUserProfile();
  await editUserProfilePage.updateProfile();
});

/** The following tests are for organization dashboard page. */
test('Test that organization dashboard works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
});

test('Test that organization dashboard dropdown works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
  await orgDropdown.selectOrg();
});

test('Test that org event card shows up in organization dashboard', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
  await orgDropdown.selectOrg();
  await orgEventCard.isDisplayed();
});

test('Test that view event page can be navigated from org event card', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
  await orgDropdown.selectOrg();
  await orgEventCard.isDisplayed();
  await orgEventCard.gotoViewEventPage();
  await viewEventPage.isDisplayed();
});

test('Test that edit event page can be navigated from org event card', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
  await orgDropdown.selectOrg();
  await orgEventCard.isDisplayed();
  await orgEventCard.gotoEditEventPage();
  await editEventPage.isDisplayed();
});

test('Test that org QR scan page can be navigated from org event card', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
  await orgDropdown.selectOrg();
  await orgEventCard.isDisplayed();
  await orgEventCard.gotoRecordPage();
  await orgScanQRPage.isDisplayed();
});

/** The following tests are for organization profile pages. */
test('Test that view org profile page can be accessed from org dashboard', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
  await orgOverview.gotoOrgProfilePage();
  await orgProfilePage.isDisplayed();
});

test('Test that edit org profile page can be accessed from org dashboard', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
  await orgOverview.gotoEditOrgProfilePage();
  await editOrgProfilePage.isDisplayed();
});

test('Test that edit org profile page can be accessed from view org profile', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
  await orgOverview.gotoOrgProfilePage();
  await orgProfilePage.isDisplayed();
  await orgProfilePage.gotoEditOrgProfile();
  await editOrgProfilePage.isDisplayed();
});

test('Test that updating org profile works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
  await orgOverview.gotoEditOrgProfilePage();
  await editOrgProfilePage.updateProfile();
});

// Admin pages
test('Test that admin home page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoHomePage();
  await homePage.isDisplayed();
});

test('Test that admin event moderation page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoEventModerationPage();
  await adminEventModerationPage.isDisplayed();
  await navBar.gotoHomePage();
  await adminHome.gotoEventModeration();
  await adminEventModerationPage.isDisplayed();
});

test('Test that admin organization moderation page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoOrganizationModerationPage();
  await adminOrganizationModerationPage.isDisplayed();
  await navBar.gotoHomePage();
  await adminHome.gotoOrganizationModeration();
  await adminOrganizationModerationPage.isDisplayed();
});

test('Test that admin user moderation page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoUserModerationPage();
  await adminUserModerationPage.isDisplayed();
  await navBar.gotoHomePage();
  await adminHome.gotoUserModeration();
  await adminUserModerationPage.isDisplayed();
});

test('Test that manage database page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoManageDatabasePage();
  await manageDatabase.isDisplayed();
});

test.only('Test that create organization works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(orgCredentials.username, orgCredentials.password);
  await navBar.isLoggedIn(orgCredentials.username);
  await footer.gotoCreateOrganization();
  await createOrganizationPage.isDisplayed();
});

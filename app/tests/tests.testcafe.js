import { signOutPage } from './simple.page';
import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
// import { signUpPage } from './signup.page';
import { dashboardPage } from './dashboard.page';
import { navBar } from './navbar.component';
import { faqPage } from './faq.page';
import { homePage } from './home.page';
import { aboutPage } from './about.page';
import { eventsPage } from './events.page';
import { addEventPage } from './addevent.page';
import { userProfilePage } from './userprofile.page';
import { upcomingEventCard } from './upcomingeventcard.component';
import { editUserProfilePage } from './edituserprofile.page';
import { userDashboard } from './userdashboard.component';
// import { orgProfilePage } from './orgprofile.page';
import { orgDashboardPage } from './orgdashboard.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
// const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
// const newCredentials = { username: 'jane@foo.com', password: 'changeme' };
const orgCredentials = { username: 'organization@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that dashboard works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(orgCredentials.username, orgCredentials.password);
  await navBar.isLoggedIn(orgCredentials.username);
  await navBar.gotoDashboardPage();
  await dashboardPage.isDisplayed();
});

test('Test that FAQ page works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoFAQPage();
  await faqPage.isDisplayed();
});

test('Test that Home page works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoHomePage();
  await homePage.isDisplayed();
});

test('Test that about page works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoAboutPage();
  await aboutPage.isDisplayed();
});

test('Test that events page works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoEventsPage();
  await eventsPage.isDisplayed();
  await eventsPage.enterField();
});

test('Test that sign in and sign out work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

/*
test('Test that user pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await t.click(editLinks.nth(0));
  await navBar.logout();
  await signOutPage.isDisplayed();
}); */

// test('Test that sign up and sign out work', async () => {
//   await navBar.gotoSignUpPage();
//   await signUpPage.isDisplayed();
//   await signUpPage.signupUser(newCredentials.username, newCredentials.password);
//   await navBar.isLoggedIn(newCredentials.username);
//   await navBar.logout();
//   await signOutPage.isDisplayed();
// });

// test('Test that admin pages show up', async () => {
//   await navBar.gotoSignInPage();
//   await signInPage.signin(adminCredentials.username, adminCredentials.password);
//   await navBar.isLoggedIn(adminCredentials.username);
//   // await t.click(editLinks.nth(0));
//   // await navBar.gotoManageDatabasePage();
//   // await manageDatabasePage.isDisplayed();
// });

test('Test that add event form works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(orgCredentials.username, orgCredentials.password);
  await navBar.isLoggedIn(orgCredentials.username);
  await navBar.gotoAddEventPage();
  await addEventPage.addEvent();
});

test('Test that view user profile can be accessed from NavBar', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoUserProfilePage();
  await userProfilePage.isDisplayed();
});

test('Test that view user profile can be accessed from Home', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoHomePage();
  await homePage.isDisplayed();
  await userDashboard.gotoUserProfilePage();
  await userProfilePage.isDisplayed();
});

test('Test that edit user profile can be accessed from Home', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoHomePage();
  await homePage.isDisplayed();
  await userDashboard.gotoEditUserProfilePage();
  await editUserProfilePage.isDisplayed();
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

test.only('Test that organization dashboard works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoDashboardPage();
  await orgDashboardPage.isDisplayed();
});

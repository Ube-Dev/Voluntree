import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AddEventPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADD_EVENT}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to add event, then checks to see that the commit was successful. */
  async addEvent() {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_TITLE}`, 'Test Event');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_IMAGE}`, 'Test Image');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_DESCRIPTION}`, 'Test Description');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_IMPACT}`, 'Test Impact');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_TOTAL_SPOTS}`, '10');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_ACTIVITY_TYPE}`, 'hybrid');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_HOSTED_BY}`, 'Test Hosted By');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_HOST_TYPE}`, 'community');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_HOST_PHONE}`, '8088081808');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_ADDRESS}`, 'Test Address');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_ZIPCODE}`, 'Test Zipcode');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_CITY}`, 'Test City');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_STATE}`, 'Test State');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_COUNTRY}`, 'Test Country');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_START_DATE}`, '11111111');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_END_DATE}`, '11111111');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_FREQUENCY}`, 'Weekly');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_REQUIRED_SKILLS}`, 'Music');
    await t.typeText(`#${COMPONENT_IDS.ADD_EVENT_FORM_ACCESSIBILITIES}`, 'Wheelchair');
    await t.click(`#${COMPONENT_IDS.ADD_EVENT_FORM_SUBMIT} input.btn.btn-primary`);
  }
}

export const addEventPage = new AddEventPage();

import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class GoBackButtonComponent {

  constructor() {
    this.componentId = `#${COMPONENT_IDS.BACK_BUTTON}`;
    this.componentSelector = Selector(this.componentId);
  }

  /* Asserts that this component is currently displayed. */
  async isDisplayed() {
    await t.navigateTo('http://localhost:3000/*'); // Goes to 404 Page
    await t.expect(this.componentSelector.exists).ok();
  }

  async goBack() {
    await t.click(this.componentSelector);
    await t.expect(PAGE_IDS.LANDING.exists).ok(); // Goes back to landing page
  }
}

export const goBackButton = new GoBackButtonComponent();

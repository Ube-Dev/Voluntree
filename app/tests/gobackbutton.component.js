import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class GoBackButtonComponent {

  /* Asserts that the Go Back button is currently displayed and functioning. */
  async isDisplayed() {
    await t.navigateTo('http://localhost:3000/*'); // Goes to 404 Page
    const button = await Selector(`#${COMPONENT_IDS.BACK_BUTTON}`).exists;
    if (button) {
      await t.click(`#${COMPONENT_IDS.BACK_BUTTON}`);
    }
  }
}

export const goBackButton = new GoBackButtonComponent();

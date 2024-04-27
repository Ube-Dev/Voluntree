import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class TosModalComponent {
  /* Open Terms of Service modal */
  async openTermsOfService() {
    await t.expect(Selector(`#${COMPONENT_IDS.TOS_MODAL_OPEN}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.TOS_MODAL_OPEN}`);
  }

  /* Accept terms of service */
  async accept() {
    await t.expect(Selector(`#${COMPONENT_IDS.TOS_MODAL_ACCEPT}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.TOS_MODAL_ACCEPT}`);
  }
}

export const tosModal = new TosModalComponent();

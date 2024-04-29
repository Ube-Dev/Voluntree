import { t, Selector } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class Footer {
  async gotoLanding() {
    t.expect(Selector(`#${COMPONENT_IDS.FOOTER_LANDING}`).exists).ok({ timeout: 5000 });
    t.click(`#${COMPONENT_IDS.FOOTER_LANDING}`);
  }

  async gotoAbout() {
    t.expect(Selector(`#${COMPONENT_IDS.FOOTER_ABOUT}`).exists).ok({ timeout: 5000 });
    t.click(`#${COMPONENT_IDS.FOOTER_ABOUT}`);
  }

  async gotoFAQ() {
    t.expect(Selector(`#${COMPONENT_IDS.FOOTER_FAQ}`).exists).ok({ timeout: 5000 });
    t.click(`#${COMPONENT_IDS.FOOTER_FAQ}`);
  }

  async gotoEvents() {
    t.expect(Selector(`#${COMPONENT_IDS.FOOTER_EVENTS}`).exists).ok({ timeout: 5000 });
    t.click(`#${COMPONENT_IDS.FOOTER_EVENTS}`);
  }

  async gotoHome() {
    t.expect(Selector(`#${COMPONENT_IDS.FOOTER_HOME}`).exists).ok({ timeout: 5000 });
    t.click(`#${COMPONENT_IDS.FOOTER_HOME}`);
  }

  async gotoSubscribe() {
    t.expect(Selector(`#${COMPONENT_IDS.FOOTER_SUBSCRIBE}`).exists).ok({ timeout: 5000 });
    t.click(`#${COMPONENT_IDS.FOOTER_SUBSCRIBE}`);
  }

  async gotoCreateOrganization() {
    t.expect(Selector(`#${COMPONENT_IDS.FOOTER_CREATE_ORGANIZATION}`).exists).ok({ timeout: 5000 });
    t.click(`#${COMPONENT_IDS.FOOTER_CREATE_ORGANIZATION}`);
  }

}

export const footer = new Footer();

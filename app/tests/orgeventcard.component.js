import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class OrgEventCardComponent {
  constructor() {
    this.compId = `#${COMPONENT_IDS.ORG_EVENT_CARD}`;
    this.compSelector = Selector(this.compId);
  }

  async isDisplayed() {
    await t.expect(this.compSelector.exists).ok({ timeout: 5000 });
  }

  /* view, edit, report */
  async gotoViewEventPage() {
    await t.expect(Selector(`#${COMPONENT_IDS.ORG_EVENT_CARD_VIEW}`).exists).ok({ timeout: 3000 });
    await t.click(`#${COMPONENT_IDS.ORG_EVENT_CARD_VIEW}`);
  }

  async gotoEditEventPage() {
    await t.expect(Selector(`#${COMPONENT_IDS.ORG_EVENT_CARD_EDIT}`).exists).ok({ timeout: 3000 });
    await t.click(`#${COMPONENT_IDS.ORG_EVENT_CARD_EDIT}`);
  }

  async gotoRecordPage() {
    await t.expect(Selector(`#${COMPONENT_IDS.ORG_EVENT_CARD_RECORD}`).exists).ok({ timeout: 3000 });
    await t.click(`#${COMPONENT_IDS.ORG_EVENT_CARD_RECORD}`);
  }
}

export const orgEventCard = new OrgEventCardComponent();

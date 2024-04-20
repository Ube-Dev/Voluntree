import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class OrgEventCardComponent {
  constructor() {
    this.compId = `#${COMPONENT_IDS.ORG_EVENT_CARD}`;
    this.compSelector = Selector(this.compId);
  }

  async isDisplayed() {
    await t.expect(this.compSelector.exists).ok();
  }

  /* view, edit, report */
  async gotoViewEventPage() {
    await t.click(`#${COMPONENT_IDS.ORG_EVENT_CARD_VIEW}`);
  }

  async gotoEditEventPage() {
    await t.click(`#${COMPONENT_IDS.ORG_EVENT_CARD_EDIT}`);
  }

  async gotoRecordPage() {
    await t.click(`#${COMPONENT_IDS.ORG_EVENT_CARD_RECORD}`);
  }
}

export const orgEventCard = new OrgEventCardComponent();

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
}

export const orgEventCard = new OrgEventCardComponent();

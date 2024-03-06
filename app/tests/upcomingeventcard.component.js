import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class UpcomingEventCardComponent {
  /* Go to Events page */
  async gotoEventsPage() {
    await t.expect(Selector(`#${COMPONENT_IDS.UPCOMING_EVENT_CARD_FIND_EVENTS}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.UPCOMING_EVENT_CARD_FIND_EVENTS}`);
  }
}

export const upcomingEventCard = new UpcomingEventCardComponent();

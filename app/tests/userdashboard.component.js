import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class UserDashboardComponent {
  async gotoUserProfilePage() {
    await t.expect(Selector(`#${COMPONENT_IDS.USER_DASHBOARD_VIEW_PROFILE}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.USER_DASHBOARD_VIEW_PROFILE}`);
  }
}

export const userDashboard = new UserDashboardComponent();

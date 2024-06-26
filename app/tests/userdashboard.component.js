import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class UserDashboardComponent {
  /* Go to View Profile page */
  async gotoUserProfilePage() {
    await t.expect(Selector(`#${COMPONENT_IDS.USER_DASHBOARD_VIEW_PROFILE}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.USER_DASHBOARD_VIEW_PROFILE}`);
  }

  /* Go to Edit User Profile page */
  async gotoEditUserProfilePage() {
    await t.expect(Selector(`#${COMPONENT_IDS.USER_DASHBOARD_EDIT_PROFILE}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.USER_DASHBOARD_EDIT_PROFILE}`);
  }

  /* Go to QR Code page */
  async gotoUserQRCodePage() {
    await t.expect(Selector(`#${COMPONENT_IDS.USER_DASHBOARD_VIEW_QR_CODE}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.USER_DASHBOARD_VIEW_QR_CODE}`);
  }
}

export const userDashboard = new UserDashboardComponent();

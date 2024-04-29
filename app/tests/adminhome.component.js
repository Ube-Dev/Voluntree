import { t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AdminHome {
  async gotoAdminHome() {
    await t.click(`#${COMPONENT_IDS.NAVBAR_ADMIN_HOME_PAGE}`);
  }

  async gotoEventModeration() {
    await t.click(`#${COMPONENT_IDS.ADMIN_HOME_EVENT_MODERATION}`);
  }

  async gotoOrganizationModeration() {
    await t.click(`#${COMPONENT_IDS.ADMIN_HOME_ORGANIZATION_MODERATION}`);
  }

  async gotoUserModeration() {
    await t.click(`#${COMPONENT_IDS.ADMIN_HOME_USER_MODERATION}`);
  }
}

export const adminHome = new AdminHome();

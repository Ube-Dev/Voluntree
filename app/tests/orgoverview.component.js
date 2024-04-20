import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class OrgOverviewComponent {
  /* Go to View Org Profile page */
  async gotoOrgProfilePage() {
    await t.expect(Selector(`#${COMPONENT_IDS.ORGANIZATION_OVERVIEW_VIEW_PROFILE}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.ORGANIZATION_OVERVIEW_VIEW_PROFILE}`);
  }

  /* Go to Edit Org Profile page */
  async gotoEditOrgProfilePage() {
    await t.expect(Selector(`#${COMPONENT_IDS.ORGANIZATION_OVERVIEW_EDIT_PROFILE}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.ORGANIZATION_OVERVIEW_EDIT_PROFILE}`);
  }
}

export const orgOverview = new OrgOverviewComponent();

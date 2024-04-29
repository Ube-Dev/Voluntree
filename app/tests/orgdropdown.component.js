import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class OrgDropdownComponent {
  async selectOrg() {
    const dropdown = await Selector(`#${COMPONENT_IDS.ORGANIZATION_DROPDOWN}`).exists;
    if (dropdown) {
      await t.click(`#${COMPONENT_IDS.ORGANIZATION_DROPDOWN}`);
      const dropdownItems = Selector('.dropdown-item');
      await t.click(dropdownItems.nth(5)); // Selects 'Lanikai Beach Org'
    }
  }
}

export const orgDropdown = new OrgDropdownComponent();

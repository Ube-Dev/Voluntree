import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class OrgScanQRPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ORG_SCAN_QR}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok({ timeout: 5000 });
  }
}

export const orgScanQRPage = new OrgScanQRPage();

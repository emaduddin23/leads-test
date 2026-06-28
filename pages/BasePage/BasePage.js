class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '') {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  async screenshot(filename) {
    await this.page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
  }
}

module.exports = BasePage;

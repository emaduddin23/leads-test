class LeadsPageLocators {
  constructor(page) {
    this.page = page;

    // Navigation
    this.leadsLink       = page.getByRole('link', { name: 'Leads' });
    this.breadcrumb      = page.getByRole('navigation', { name: 'breadcrumb' });

    // Add Lead
    this.addLeadBtn      = page.getByRole('button', { name: 'Add Lead' });
    this.addLeadDialog   = page.getByRole('dialog', { name: 'Add New Lead' });
    this.submitLeadBtn   = page.getByRole('dialog', { name: 'Add New Lead' }).getByRole('button', { name: 'Add Lead' });

    // Form fields
    this.firstNameInput  = page.getByRole('textbox', { name: 'First name' });
    this.lastNameInput   = page.getByRole('textbox', { name: 'Last name' });
    this.emailInput      = page.getByRole('textbox', { name: 'Email' });
    this.phoneInput      = page.getByRole('textbox', { name: 'Phone' });
    this.countryCombobox = page.getByRole('combobox', { name: 'Country' });
    this.sourceCombobox  = page.getByRole('combobox', { name: 'Source' });
  }

  countryOption(name)  { return this.page.getByLabel(name).getByText(name); }
  sourceOption(name)   { return this.page.getByRole('option', { name }); }
}

module.exports = LeadsPageLocators;

class LoginPageLocators {
  constructor(page) {
    this.page = page;
  }

  emailInput()    { return this.page.getByPlaceholder('name@email.com'); }
  passwordInput() { return this.page.getByPlaceholder('Password'); }
  submitButton()  { return this.page.getByRole('button', { name: 'Log in' }); }
}

module.exports = LoginPageLocators;

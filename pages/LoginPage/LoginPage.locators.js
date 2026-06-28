class LoginPageLocators {
  constructor(page) {
    this.emailInput    = page.getByPlaceholder('name@email.com');
    this.passwordInput = page.getByPlaceholder('Password');
    this.submitButton  = page.getByRole('button', { name: 'Log in' });
    this.emailTextbox  = page.getByRole('textbox', { name: 'name@email.com' });
    this.passTextbox   = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn      = page.getByRole('button', { name: 'Log in' });
  }
}

module.exports = LoginPageLocators;

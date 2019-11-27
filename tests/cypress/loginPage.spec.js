describe('loginPage page test', () => {
  it('page contains key parts', () => {
    cy.visit('https://jpiovar-vue.herokuapp.com');
    cy.contains('Simple Quora Login');
  });
  it('page interacts correctly', () => {
    cy.get('input#userName').type('janko');
    cy.get('input#exampleInputPassword1').type('janko');
    cy.get('.login-form button[type="submit"]').click();
  });
});

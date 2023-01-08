describe('Navigate to root path', () => {
  it('should redirect from / to /search', () => {
      cy.visit('http://localhost:3000/');
      cy.url().should('include', 'search?genre=all&sortBy=raiting');
  });
});
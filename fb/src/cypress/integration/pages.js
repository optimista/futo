describe('pages/', () => {
  context('[username].js', () => {
    it('works', () => cy.visit("/random"))
    context('if user does not exist', () => {
      it('redirects to /index.js', () => {
        cy.visit('/random');
        cy.url().should('eq', Cypress.config('baseUrl') + "/")
      })
    })
    
    context('user with username "optimistavf" does exist', () => {
      it('contains @optimistavf', () => {
        cy.visit('/optimistavf');
        cy.contains("@optimistavf");
      })
    })
  });

  context('account/reset.js', () => {
    it('works', () => cy.visit("/account/reset"))
  });

  context('account/confirm.js', () => {
    it('works', () => cy.visit("/account/confirm"))
    context('if not provided oobCode', () => {
      it('redirects to /account/reset.js', () => {
        cy.visit('/account/confirm');
        cy.url().should('contain', Cypress.config('baseUrl') + "/account/reset")
      })
    })
  });

  context('index.js', () => {
    it('works', () => cy.visit("/"))
  });
  
  context('join.js', () => {
    it('works', () => cy.visit("/join"))
  });
  
  context('login.js', () => {
    it('works', () => cy.visit("/login"))
  });
  
  context('create.js', () => {
    it('works', () => cy.visit("/create"))
    context('if user is not logged in', () => {
      it('redirects to /index.js', () => {
        cy.visit('/create');
        cy.url().should('eq', Cypress.config('baseUrl') + "/")
      })
    })
  });
  
  context('s/[id].js', () => {
    it('works', () => cy.visit("/s/random"));
    context('if story does not exist', () => {
      it('redirects to /index.js', () => {
        cy.visit('/s/random');
        cy.url().should('eq', Cypress.config('baseUrl') + "/")
      })
    })
  });
  
  context('s/[id]/edit.js', () => {
    it('works', () => cy.visit("/s/random/edit"));
    context('if story does not exist', () => {
      it('redirects to /index.js', () => {
        cy.visit('/s/random/edit');
        cy.url().should('eq', Cypress.config('baseUrl') + "/")
      })
    })
  });
  
  context('stories.js', () => {
    it('works', () => cy.visit("/stories"))
    context('if user is not logged in', () => {
      it('redirects to /index.js', () => {
        cy.visit('/stories');
        cy.url().should('eq', Cypress.config('baseUrl') + "/")
      })
    })
  });
})

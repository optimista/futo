describe('pages/', () => {
  context('[username].js', () => {
    it('works', () => cy.visit("/random"))
    context('if user does not exist', () => {
      it('redirects to /index.js', () => {
        cy.visit('/random');
        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/');
        })
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
        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/account/reset');
        })
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
        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/');
        })
      })
    })
  });
  
  context('s/[id].js', () => {
    it('works', () => cy.visit("/s/random"));
    context('if story does not exist', () => {
      it('redirects to /index.js', () => {
        cy.visit('/s/random');
        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/');
        })
      })
    })
  });
  
  context('s/[id]/edit.js', () => {
    it('works', () => cy.visit("/s/random/edit"));
    context('if story does not exist', () => {
      it('redirects to /index.js', () => {
        cy.visit('/s/random/edit');
        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/');
        })
      })
    })
  });
  
  context('stories.js', () => {
    it('works', () => cy.visit("/stories"))
    context('if user is not logged in', () => {
      it('redirects to /index.js', () => {
        cy.visit('/stories');
        cy.location().should(loc => {
          expect(loc.pathname).to.eq('/');
        })
      })
    })
  });
  
  context('theme.js', () => {
    it('works', () => cy.visit("/theme"))
  });
})

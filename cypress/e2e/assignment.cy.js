describe('FitPeo Revenue Calculator Automation', () => {
    before(() => {
      // Navigate to the FitPeo Homepage
      cy.visit('https://www.fitpeo.com'); 
    });
    it('should navigate to the Revenue Calculator Page', () => {
        cy.get("div.satoshi.MuiBox-root.css-1aspamu")
        .contains('Revenue Calculator')
        .click({force: true});
        cy.url().should('include', '/revenue-calculator'); 
    });
    it('should scroll down to the slider section', () => {
        cy.get("span.MuiSlider-root.MuiSlider-colorPrimary.MuiSlider-sizeMedium.css-duk49p")
       .scrollIntoView()
       .should('be.visible')
    });
    it('should update the text field to 560 and verify the slider position', () => {
        cy.get('input[type="number"]').clear().type('560');
        cy.get('input[type="range"]') 
        .invoke('val')
        .should('equal', '560');
    });
    it('should adjust the slider to set its value to 820', () => {
        const desiredValue = 820;
        cy.get('.MuiSlider-root').then($slider => {
        const sliderRect = $slider[0].getBoundingClientRect();
        const sliderWidth = sliderRect.width;
        cy.get('input[type="range"]') 
        .invoke('attr', 'aria-valuemax')
        .then((ariaValueMax) => {
        const targetPosition = sliderRect.left + (sliderWidth * desiredValue / ariaValueMax);
        cy.get('.MuiSlider-thumb')
        .trigger('mousedown', { button: 0, force: true }) 
        .trigger('mousemove', { clientX: targetPosition, force: true }) 
        .trigger('mouseup', { force: true }); 
        })
        })
    });
    it('should select the checkboxes for CPT codes', () => {
        cy.get('.MuiBox-root.css-1p19z09').scrollIntoView().should('be.visible');
        cy.contains('CPT-99091').parent().find('input[type="checkbox"]').check();
        cy.contains('CPT-99453').parent().find('input[type="checkbox"]').check();
        cy.contains('CPT-99454').parent().find('input[type="checkbox"]').check();
        cy.contains('CPT-99474').parent().find('input[type="checkbox"]').check();
    })
    it('should verify the total recurring reimbursement for all patients per month is $110700', () => {
        cy.get('.css-m1khva > .MuiTypography-body2').scrollIntoView()
        .parent().contains('$110700')
        .should('have.text','$110700'); 
    })   


})
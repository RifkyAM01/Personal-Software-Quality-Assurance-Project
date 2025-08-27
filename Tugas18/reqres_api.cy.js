describe('Reqres.in API Tests', () => {
    const baseUrl='https://reqres.in/api'
    const headers={'x-api-key': 'reqres-free-v1'}

    it('GET - Users',()=>{
        cy.request({
            method:'GET',
            url: `${baseUrl}/users?page=2`,
            headers
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.data).to.be.an('array')
        })
    })

    it('GET - User Id 2',()=>{
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/2`,
            headers
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.data).to.have.property('id', 2)
        })
    })

    it('PUT - REPLACE', ()=>{
        cy.request({
            method:'PUT',
            url: `${baseUrl}/users/2`,
            headers,
            body:{
                name: 'Richard',
                job: 'Chosen One'
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('job', 'Chosen One')
        })
    })

    it('PATCH - Update Partial', ()=>{
        cy.request({
            method:'PATCH',
            url:`${baseUrl}/users/2`,
            headers,
            body:{
                job: 'Choosen One'
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('job', 'Choosen One')
        })
    })

    it('DELETE - Delete',()=>{
        cy.request({
            method:'DELETE',
            url:`${baseUrl}/users/2`,
            headers
        }).then((response)=>{
            expect(response.status).to.eq(204)
        })
    })

    it('POST - Login',()=>{
        cy.request({
            method: 'GET',
            url: `${baseUrl}/login`,
            headers
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })

    it('POST - Logout', ()=>{
        cy.request({
            method: 'GET',
            url: `${baseUrl}/logout`,
            headers
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })
});

const chai = require("chai")
const chaiHTTP = require("chai-http")
const expect = chai.expect

chai.use(chaiHTTP)

const app = require("../app.js")

// Using ash's user id "606e7b0b199a830c8552dac2"
// UPDATE TEST IF USER NO LONGER EXISTS

describe("Testing GET for /recipesbyuser API", () => { 
    it("should return 200 OK status", () => { 
        return chai.request(app).get('/recipesbyuser').then((response) => { 
            expect(response.status).to.equal(200)
        })
    }).timeout(3000)

    it("should return at least one recipe objects", () => { 
        return chai.request(app)
            .get('/recipesbyuser')
            .query({userID: '606e7b0b199a830c8552dac2'})
            .then((response) => { 
            // Check that first recipe has content
            expect((response.body)[0]).to.have.property('name').that.is.a('string')
            expect((response.body)[0]).to.have.property('ingredients').that.is.an('array')
            expect((response.body)[0]).to.have.property('instructions').that.is.an('array')
        
        })
    }).timeout(4000)
})

const {
    app,
    init
} = require('../lib/index');
const superTest = require('supertest');
// const request = require('supertest').agent(app.listen());
require('should');

describe('Blog', function () {
    let request;

    before(async() => {
        await init();
        request = superTest.agent(app.listen());
    })


    describe('GET /', function () {
        it('should see title "Posts"', (done) => {
            request
                .get('/tests')
                .expect(200, function (err, res) {
                    console.log('err', err);
                    console.log('res', res.body);
                    done();
                });
        });

        // it('should see 0 post', function(done) {
        //   request
        //   .get('/')
        //   .expect(200, function(err, res) {
        //     if (err) return done(err);

        //     res.should.be.html;
        //     res.text.should.include('<p>You have <strong>0</strong> posts!</p>');
        //     done();
        //   });
        // });
    });

});
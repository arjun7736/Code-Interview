import request from 'supertest';
import app from '../src/app'; 


describe('API Routes', () => {
  describe('/getdata', () => {
    it('should respond with a success message', async () => {
      const response = await request(app)
       .get('/getdata')
       .expect(200)
       .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('/premium-companies', () => {
    it('should respond with a list of premium companies', async () => {
      const response = await request(app)
       .get('/premium-companies')
       .expect(200)
       .expect('Content-Type', /json/);

      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

});

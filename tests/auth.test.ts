import request from 'supertest';
import app from '../app';

describe('Auth Routes', () => {
  it('should return API running message on root', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('API is running 🚀');
  });

  // Example login test (you can expand after seeding users)
  it('should fail login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: '123456' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
});

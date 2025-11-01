const request = require('supertest');
const app = require('../src/index');
const { sequelize } = require('../src/config/db');

describe('Authentication System', () => {
    const testUser = {
        email: 'test.recruiter@example.com',
        password: 'Test@123456',
        full_name: 'Test Recruiter',
        role: 'recruiter'
    };

    let authToken;

    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Reset database
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user.email).toBe(testUser.email);
        });

        it('should not register with invalid email', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({ ...testUser, email: 'invalid-email' });

            expect(res.status).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            authToken = res.body.token;
        });

        it('should reject invalid password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword'
                });

            expect(res.status).toBe(401);
        });
    });

    describe('Auth Middleware', () => {
        it('should access protected route with valid token', async () => {
            const res = await request(app)
                .get('/api/auth/profile')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(200);
        });

        it('should reject access without token', async () => {
            const res = await request(app)
                .get('/api/auth/profile');

            expect(res.status).toBe(401);
        });
    });
});
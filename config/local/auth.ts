import { auth } from 'express-openid-connect';
import secrets from '../../secrets/secrets.local.json' with { type: 'json' };

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: secrets.auth0.clientSecret,
  baseURL: 'http://localhost:3000',
  clientID: secrets.auth0.clientId,
  issuerBaseURL: secrets.auth0.issuerBaseURL
};

export default auth(config);
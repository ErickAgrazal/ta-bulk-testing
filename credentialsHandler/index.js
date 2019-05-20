import fs from 'fs';
import prompts from 'prompts';
import settings from '../settings';
import makeGetTwilioCredentials from './HandleCredentials';

const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const ASSISTANT_SID = process.env.ASSISTANT_SID;

const getTwilioCredentials = makeGetTwilioCredentials(fs, settings, prompts, ACCOUNT_SID, AUTH_TOKEN, ASSISTANT_SID);

export default getTwilioCredentials;
import got from 'got';
import twilio from 'twilio';

import buildMakeTaConfig from './Config';
import buildMakeQueries from './Queries';

const settings = {
    API_URL:'https://autopilot.twilio.com/v1/Assistants',
    API_RESOURCE: 'Queries',
}

const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
if (!ACCOUNT_SID || !AUTH_TOKEN){
    throw new Error("You need to have in your environment variables both ACCOUNT_SID and AUTH_TOKEN from twilio.");
}

const twilioClient = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
const twilioCredentials = `${twilioClient.username}:${twilioClient.password}`;

const makeTaConfig = buildMakeTaConfig(settings.API_URL,
                                       twilioCredentials,
                                       process.env.ASSISTANT_SID);

const makeQueries = buildMakeQueries(got, makeTaConfig, settings.API_RESOURCE);

export default makeQueries;
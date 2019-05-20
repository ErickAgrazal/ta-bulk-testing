import got from 'got';
import twilio from 'twilio';

import buildMakeTaConfig from './Config';
import buildMakeQueries from './Queries';
import buildTwilioClient from './Client';

const settings = {
    API_URL:'https://autopilot.twilio.com/v1/Assistants',
    API_RESOURCE: 'Queries',
}

const twilioClient = buildTwilioClient(twilio);

const makeTaConfig = buildMakeTaConfig(settings.API_URL);

const makeQueries = buildMakeQueries(got, makeTaConfig, settings.API_RESOURCE);

export {
    twilioClient,
    makeQueries,
};
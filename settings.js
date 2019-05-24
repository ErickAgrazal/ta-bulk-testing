import path from 'path';
import meow from './meow';
import os from 'os';

export default {
    DEFAULT_OUTPUT_FILE: 'output.json',
    DEFAULT_CSV_FILE: path.join(__dirname, './fixtures/example.csv'),
    DEFAULT_LANGUAGE: 'en-US',
    DEFAULT_TWILIO_CONFIG_FILE: path.join(os.homedir(), '.twilio/config.json'),
    MESSAGES: {
        NOT_VALID_FIXTURE_FILE: 'You need to send a valid --fixtures parameter in order to do the testing.',
        INITIALIZING_MESSAGE: 'Initializing.',
        FINISHED_PARSING: 'File parsed correctly!',
        FINISHED_DATA_EXPANSION: 'Data expanded correctly!',
        FINISHED_TA_QUERIES: 'All data was sent correctly!',
        SUCCEDED_MESSAGE: `Testing complete.`,
        SYMBOL: '✔',
    },
    MEOW: [meow.configString, meow.flags],
    DEFAULT_PROMPTS_CONFIG_MULTIPLE: {
        type: 'select',
        name: 'value',
        message: 'What config do you want to use?',
        choices: [],
        initial: 0
    },
    DEFAULT_PROMPTS_CONFIG: {
        type: 'text',
        name: 'value',
        message: 'What is the assistant SID?',
        validate: value => value.length < 32 ? `The Assistant SID should have at least 32 hex numbers. For example: 751efa8dc8eda8a1826a66db8598ad21.` : true
    }
}
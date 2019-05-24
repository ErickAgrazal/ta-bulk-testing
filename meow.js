const configString = `
This is a cli program that helps you make bulk testing to
twilio\'s autopilot infraestructure. It uses a csv file fixtures
as input and returns a json report if needed.

Usage
  $ ta-bulk-testing <options>

Options
    --expand, -e Take the fixtures file and expand it.
                 This process relies on "intent-utterance-expander"
                 project.
    --export, -x Export report to a given name.
                 Eg. --export report.json.
                 If you send 'export' without a filename,
                 it will output the report in output.json.
    --fixtures, -f Import an specific fixture file. CSV Format
                   is mandatory.
    --language, -l Language for the testing. Default: 'en-US'
    --account_sid, -s Twilio's account SID, default will try to
                      lookup for it in ~/.twilio/config.json.
    --auth_token, -t Twilio's authorization token, default will
                     try to lookup for it in ~/.twilio/config.json.
    --assistant_sid, -a Twilio's specific assistant ID for this testing.

Examples
  $ ta-bulk-test --expand --fixtures ./fixtures/en-US.csv --export
`;

const flags = {
    booleanDefault: undefined,
    flags: {
        bot: {
            type: 'string',
            alias: 'b'
        },
        expand: {
            type: 'boolean',
            alias: 'e'
        },
        export: {
            type: 'string',
            alias: 'x'
        },
        fixtures: {
            type: 'string',
            alias: 'f',
            default: false
        },
        language: {
            type: 'string',
            alias: 'l'
        },
        account_sid: {
            type: 'string',
            alias: 's'
        },
        auth_token: {
            type: 'string',
            alias: 't'
        },
        assistant_sid: {
            type: 'string',
            alias: 'a'
        },
    }
}

export default {
    configString,
    flags
}

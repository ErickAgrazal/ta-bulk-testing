import meow from 'meow';
import minimist from 'minimist';
import ora from 'ora';
import path from 'path';

import expandUtterances from './expander';
import writeJson from './exporter';
import parser from './parser';
import submitQueries from './ta';

const settings = {
    DEFAULT_OUTPUT_FILE: 'output.json',
    MESSAGES: {
        FINISHED_PARSING: 'File parsed correctly!',
        FINISHED_DATA_EXPANSION: 'Data expanded correctly!',
        FINISHED_TA_QUERIES: 'All data was sent correctly!',
        SUCCEDED_MESSAGE: `Testing complete.`,
        SYMBOL: '✔',
    }
}

const cli = meow(`
    Usage
      $ ta-bulk-test <action>
 
    Options
        --bot, -b Import bot config file so that it can be deployed to twilio.
        --expand, -e Take the fixtures file and expand it.
                     This process relies on "intent-utterance-expander" project.
        --export, -x Export report to a given name.
                     Eg. --export report.json. If you send 'export' without a filename,
                     it will output the report in output.json.
        --fixtures, -f  Import an specific fixture file. CSV Format is mandatory.

    Examples
      $ yarn start --expand --fixtures ./fixtures/en-US.csv --export
`, {
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
            alias: 'f'
        },
    }
});

async function main(actions, flags){
    const spinner = ora('Initializing.').start();
    try {
        const filePath = (flags && flags.fixtures !== false) ? flags.fixtures : path.join(__dirname, './fixtures/en-US.csv');
        const expandData = flags.expand !== undefined;
        const language = flags.language !== undefined ? flags.language : 'en-US';
        const exportReport = flags.export;
        const data = await parser(filePath);
        spinner.stopAndPersist({
            symbol: settings.MESSAGES.SYMBOL,
            text: settings.MESSAGES.FINISHED_PARSING
        });
        const expandedData = expandData ? expandUtterances(data) : data;
        if (expandData){
            spinner.stopAndPersist({
                symbol: settings.MESSAGES.SYMBOL,
                text: settings.MESSAGES.FINISHED_DATA_EXPANSION
            });
        }
        const report = await submitQueries(expandedData, language).submitBulkTests(spinner);
        spinner.stopAndPersist({
            symbol: settings.MESSAGES.SYMBOL,
            text: settings.MESSAGES.FINISHED_TA_QUERIES
        });
        if (exportReport){
            await writeJson(exportReport !== '' ? exportReport : settings.DEFAULT_OUTPUT_FILE, report);
        }
        spinner.succeed(settings.MESSAGES.SUCCEDED_MESSAGE);
    } catch (error) {
        spinner.fail(error.toString());
    }
    
}

main(cli.input[0], cli.flags);

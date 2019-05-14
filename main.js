import meow from 'meow';
import minimist from 'minimist';
import ora from 'ora';
import path from 'path';

import expandUtterances from './expander';
import writeJson from './exporter';
import parser from './parser';
import submitQueries from './ta';

const cli = meow(`
    Usage
      $ ta-bulk-test <action>
 
    Options
        --bot, -b Import bot config file so that it can be deployed to twilio.
        --expand, -e Take the fixtures file and expand it. This process relies on https://www.npmjs.com/package/intent-utterance-expander
        --export, -x Export report to a given name. Eg. --export report.json
        --fixtures, -f  Import an specific fixture file. CSV Format is mandatory.

    Examples
      $ ta-bulk-test deploy --fixtures ./en-US.json --bot ./bot.json
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
        spinner.stopAndPersist({symbol: '✔', text: 'File parsed correctly!'});
        const expandedData = expandData ? expandUtterances(data) : data;
        if (expandData){
            spinner.stopAndPersist({symbol: '✔', text: 'Data expanded correctly!'});
        }
        const report = await submitQueries(expandedData, language).submitBulkTests(spinner);
        spinner.stopAndPersist({symbol: '✔', text: 'All data was sent correctly!'});
        if (exportReport){
            await writeJson(exportReport, report);
        }
        spinner.succeed(`Testing complete.`);
    } catch (error) {
        spinner.fail(error.toString());
    }
    
}

main(cli.input[0], cli.flags);

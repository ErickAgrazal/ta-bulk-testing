import meow from 'meow';
import ora from 'ora';

import expandUtterances from './expander';
import writeJson from './exporter';
import parser from './parser';
import getCredentials from './credentialsHandler';
import { twilioClient, makeQueries } from './ta';
import settings from './settings';
import { SSL_OP_NETSCAPE_CA_DN_BUG } from 'constants';


const cli = meow(...settings.MEOW);

async function main(actions, flags){
    let spinner = await ora(settings.MESSAGES.INITIALIZING_MESSAGE).start();
    try {
        const filePath = (flags && flags.fixtures !== false) ? flags.fixtures : undefined;
        if (!filePath){
            throw new Error(settings.MESSAGES.NOT_VALID_FIXTURE_FILE);
        }
        const expandData = flags.expand !== undefined;
        const language = flags.language !== undefined ? flags.language : settings.DEFAULT_LANGUAGE;
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
        const { assistantSID, authToken, accountSID } = await getCredentials(flags);
        const userPass = twilioClient(accountSID, authToken);
        const { report } = await makeQueries(expandedData, language, userPass, assistantSID).submitBulkTests(spinner);
        spinner.stopAndPersist({
            symbol: settings.MESSAGES.SYMBOL,
            text: settings.MESSAGES.FINISHED_TA_QUERIES
        });
        if (exportReport){
            await writeJson(exportReport !== '' ? exportReport : settings.DEFAULT_OUTPUT_FILE, report);
        }
        spinner.succeed(settings.MESSAGES.SUCCEDED_MESSAGE);
    } catch (error) {
        if (error.message){
            spinner.fail(error.message);
        } else {
            spinner.fail(error.toString());
        }
    }

}

main(cli.input[0], cli.flags);

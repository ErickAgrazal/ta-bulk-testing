# ta-bulk-testing
This is a project that helps you make bulk testing to twilio's autopilot infraestructure.

## Installation
In order to install it, just clone the project and install the dependencies.
1. `git clone <repo>`
2. `yarn install # I'm using yarn, but you can you npm to install the dependencies.`

## Configuration
In order to be able to run this project, you'll need to have an `.env` file with your credentials.
1. `cp .env.example .env`
2. Fill your `ACCOUNT_SID`, `AUTHO_TOKEN` and `ASSISTANT_SID`.

## Running
Now you're able to run the project in the cli.
```bash
$ node index.js --help

  This is a project that helps you make bulk testing to twilio's autopilot infraestructure.

  Usage
    $ ta-bulk-test
 
  Options
      --bot, -b Import bot config file so that it can be deployed to twilio.
      --expand, -e Take the fixtures file and expand it. This process relies on https://www.npmjs.com/package/intent-utterance-expander
      --export, -x Export report to a given name. Eg. --export report.json
      --fixtures, -f  Import an specific fixture file. CSV Format is mandatory.

  Examples
    $ yarn start --expand --fixtures ./fixtures/en-US.csv --export output.json
```

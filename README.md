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
$ yarn start --help

  This is a project that helps you make bulk testing to twilio's autopilot infraestructure.

  Usage
    $ ta-bulk-test <action>
 
  Options
      --bot, -b Import bot config file so that it can be deployed
                to twilio.
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

  Examples
    $ yarn start --expand --fixtures ./fixtures/en-US.csv --export
```

## Fixtures
In order to generate the fixtures, this project relies in <a href="https://www.npmjs.com/package/intent-utterance-expander">this project</a> in order to expand the intents in your file.

### Example of the fixture file using the expander:
```csv
task, intent
hello_world, (Hi | Hello | Hey) I am Erick
```

### Example of the fixture file without using the expander:
```csv
task, intent
hello_world, Hi I am Erick
hello_world, Hello I am Erick
hello_world, Hey I am Erick
hello_world, Hey I am Erick
```
**Note:** It's suggested that you use the expander to minimize the size of your fixture file.

In the folder `fixtures` of this project, there's an example `.csv` file using the expander feature.

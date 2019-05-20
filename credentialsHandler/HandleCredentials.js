function getPromptChoices(configParsed){
    return configParsed.map(function(v){ return v.profileName });
}


async function getValueFromPrompt(prompts, config, choices=null){
    let c = config;
    if (choices !== null){ c = {...c, choices} }
    let { value } = await prompts(c);
    return value; 
}


export default function(fs, { DEFAULT_TWILIO_CONFIG_FILE, DEFAULT_PROMPTS_CONFIG_MULTIPLE, DEFAULT_PROMPTS_CONFIG }, prompts, _accountSID, _authToken, _assistantSID){
    return async function(paramsFromMeow){
        // REFACTOR?
        // Handling the configuration with the environment variables
        let accountSID = _accountSID;
        let authToken = _authToken;
        let assistantSID = _assistantSID;
        if (!accountSID || !authToken || !assistantSID){
            // Handling the configuration with meow params
            accountSID = paramsFromMeow.account_sid;
            authToken = paramsFromMeow.auth_token;
            assistantSID = paramsFromMeow.assistant_sid;
            if (!accountSID || !authToken || !assistantSID){
               if (fs.existsSync(DEFAULT_TWILIO_CONFIG_FILE)){
                    // Handling the configuration if the config file exits
                    // Default location for it is: ~/.twilio/config.json
                    const config = fs.readFileSync(DEFAULT_TWILIO_CONFIG_FILE);
                    const configParsed = JSON.parse(config);
                    const promptMultipleChoices = getPromptChoices(configParsed);
                    const configIndex = await getValueFromPrompt(prompts, DEFAULT_PROMPTS_CONFIG_MULTIPLE, promptMultipleChoices);
                    accountSID = configParsed[configIndex].accountSID;
                    authToken = configParsed[configIndex].authToken;
                    assistantSID = !assistantSID ? await getValueFromPrompt(prompts, DEFAULT_PROMPTS_CONFIG): undefined;
                    if(!accountSID || !authToken || !assistantSID){
                        throw new Error('You need to have a valid accountSID, authToken and AssistantID. In order to get this working set the variables through any way supported.');
                    }
                }
            }
        }
        return {
            accountSID,
            authToken,
            assistantSID,
        }
    }
}
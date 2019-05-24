async function makeHttpCall(promise){
    let response;
    try {
        response = await promise;
    } catch (error) {
        console.log(error.toString());
        response = error;
    }
    return response;
}

function parseResponse(response){
    return JSON.parse(response.body)
}

function getResolvedTaskFromResponse(parsedResponse){
    let task;
    try {
      task = parsedResponse.results.task;
    } catch (error) {
      console.log(error.toString());
      task = null;
    }
    return task;
}

function taskIsCorrect(expected, returned){
    let returnedToString;
    try {
        returnedToString = returned.toString();
    } catch (error) {
        returnedToString = 'null';
    }
    return expected.toString() === returnedToString;
}

function getCorrectPercentage(correctCount, failCount){
    return (correctCount * 100)/(correctCount + failCount);
}

export default function(http, makeTaConfig, resource){
    return function(bulkTests, language, userPass, assistantSID){
        return Object.freeze({
            submitBulkTests: async function(spinner){
                let report = [];
                let correctCount = 0;
                let failCount = 0;
                for(let i = 0; i < bulkTests.length; i += 1){
                    const body = `Language=${language}&Query=${bulkTests[i].samples}`;
                    const taConfig = makeTaConfig({resource, body, userPass, assistantSID});
                    const response = await makeHttpCall(http(taConfig));
                    const parsedResponse = parseResponse(response);
                    const resolvedTask = getResolvedTaskFromResponse(parsedResponse)
                    const correctTask = taskIsCorrect(bulkTests[i].task, resolvedTask);
                    if (correctTask) { correctCount += 1 } else { failCount += 1}
                    const correctPercentage = getCorrectPercentage(correctCount, failCount);
                    spinner.text = `${i + 1}/${bulkTests.length} tests done. ${correctPercentage}% were resolved as expected.`;
                    report.push({
                        expectedTask: bulkTests[i].task,
                        intent: bulkTests[i].samples,
                        resolvedTask,
                        resolvedCorrectly: correctTask,
                        twilio: {
                            request: taConfig,
                            response: parsedResponse,
                        }
                    });
                }
                spinner.stopAndPersist({symbol: '✔', text: spinner.text });
                return report
            },
            printReport: function(){},
        });
    }
}
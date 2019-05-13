export default function(makeTaConfig, apiResource){
    return function(bulkTests){
        return Object.freeze({
            submitBulkTests: function(){
                console.log(makeTaConfig(apiResource, 'test'));
                console.log(bulkTests);
            },
            generateReport: function(){},
        });
    }
}
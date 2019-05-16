export default function(expander){
    return function(arr){
        let response = [];
        for(let i=0; i<arr.length; i +=1 ) {
            const expandedValues = expander(arr[i].sample);
            for(let j=0; j<expandedValues.length; j +=1 ){
                response.push({
                    task: arr[i].task,
                    sample: expandedValues[j],
                })
            }
        }
        return response;
    }
}
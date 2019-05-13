import parse from 'csv-parse';

import submitQueries from './ta';

// Create the parser
const parser = parse({
    delimiter: ','
});

// Use the readable stream api
parser.on('readable', function(){
    let record
    while (record = parser.read()) {
        output.push(record)
    }
});

// Catch any error
parser.on('error', function(err){
    console.error(err.message)
});

console.log(submitQueries(test));

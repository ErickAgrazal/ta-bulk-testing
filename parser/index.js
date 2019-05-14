import csvtojson from 'csvtojson';

import buildParse from './Parse';

const parse = buildParse(csvtojson);

export default parse;
import writeJsonFile from 'write-json-file';

import buildWriteJson from './Export';

const writeJson = buildWriteJson(writeJsonFile);

export default writeJson;
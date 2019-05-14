export default function(writeJson){
    return function(filePath, data){
        return writeJson(filePath, data);
    }
}
export default function(csv){
    return function(filePath){
        return csv().fromFile(filePath);
    }
}
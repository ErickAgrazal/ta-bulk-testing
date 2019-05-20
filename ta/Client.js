export default function(ta){
    return function(accountSID, authToken){
        const twilioClient = new ta(accountSID, authToken)
        return `${twilioClient.username}:${twilioClient.password}`;
    }
}
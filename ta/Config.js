export default function(apiUrl){
    return function({resource, body, assistantSID, userPass}){
        const url = `${apiUrl}/${assistantSID}/${resource}`;
        return Object.freeze({
            method: 'POST',
            url,
            headers: {
                accept: 'application/json',
                authorization: `Basic ${Buffer.from(userPass).toString('base64')}`,
                'content-type': 'application/x-www-form-urlencoded',
            },
            body,
        });
    }
};
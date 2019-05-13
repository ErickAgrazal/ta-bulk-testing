export default function(apiUrl, userPass, assistandId){
    return function({resource, body}){
        const url = `${apiUrl}/${assistandId}/${resource}`;
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
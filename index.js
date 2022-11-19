/*

You can add as many accounts as you want. Uncomment the following block after filling in the following placeholders:
RESOURCE VALUE --- This is what is the in `resource` query string parameter. Usually matches "acct:username@server"
WEBFINGER OBJECT --- This is a JSON object you'll find at server/.well-known/webfinger?resource=acct:username@server

var webFingers = {
	'[RESOURCE VALUE]': [WEBFINGER OBJECT];
*/

var getFinger = (account) => {
	var result = webFingers[account];
	if (result !== undefined) return result;
	return {}
};

function handler(event) {
	var resource = (event.request.querystring.resource ? event.request.querystring.resource.value : undefined);
	
	// If the request is not for the webfinger file, return a 404
	if (event.request.uri !== '/.well-known/webfinger') {
		return {
			statusCode: 404,
			statusDescription: 'Not found',
		};
	}
	
	// If the `resource` parameter is defined, see if we have a matching response
	if (resource !== undefined) {
		var lookup = getFinger(resource);
		
		if (Object.keys(lookup).length > 0) {
			// If there's a corresponding account in your list, return it
			return {
				statusCode: 200,
				statusDescription: 'OK',
				body: JSON.stringify(lookup),
			};
		} else {
			// There isn't a corresponding accoutn, so 404 it
			return {
				statusCode: 404,
				statusDescription: 'Not found',
			}
		}
	}

	// The query string is missing, cannot process	
	return {
		statusCode: 400,
		statusDescription: 'Bad request'
	};
}

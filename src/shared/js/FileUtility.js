export function getMIMEFromDataURL( dataURL ) {
	// example
	// 0: data:text/plain;base64
	// 1: RAWDATA
	let parts = dataURL.split(',');
	let mime = parts[0].match(/:(.*?);/)[1];
	return mime;
}

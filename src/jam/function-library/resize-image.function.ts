export function resizeImage ( image: HTMLImageElement, width: number ): HTMLCanvasElement
{
	let canvas = document.createElement( 'canvas' );
	let ctx = canvas.getContext( '2d' );
	canvas.width = width;
	canvas.height = canvas.width * ( image.height / image.width );
	ctx.drawImage( image, 0, 0, canvas.width, canvas.height );
	return canvas;
}

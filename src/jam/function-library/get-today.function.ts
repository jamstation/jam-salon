export function getToday ()
{
	let d = new Date();
	d.setHours( 0, 0, 0, 0 );
	return d;
}

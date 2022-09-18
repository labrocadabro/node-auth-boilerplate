const emailLink = document.querySelector('#change-email a');
const passwordLink = document.querySelector('#change-password a');
const googleLink = document.querySelector('#google a');


googleLink && googleLink.addEventListener('click', unlinkGoogle);

async function unlinkGoogle(e) {
	e.preventDefault();
	// document.getElementById('revoke-google').submit();
	const token = document.querySelector('[name="token"]').value;
	const res = await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`, {
			method: 'post',
			headers: { 'content-type': 'application/x-www-form-urlencoded' }
	});
	const data = await res.json();
	if ( data.error ) location.href = "/oauth/google/revoke?success=false";
	else location.href = "/oauth/google/revoke?success=true";
}

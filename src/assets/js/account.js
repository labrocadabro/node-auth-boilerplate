const emailLink = document.querySelector('#change-email a');
const passwordLink = document.querySelector('#change-password a');
const googleLink = document.querySelector('#google a');


googleLink && googleLink.addEventListener('click', unlinkGoogle);
passwordLink.addEventListener('click', changePassword);
emailLink.addEventListener('click', changeEmail);

async function unlinkGoogle(e) {
	e.preventDefault();
	const token = document.querySelector('[name="token"]').value;
	const res = await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`, {
			method: 'post',
			headers: { 'content-type': 'application/x-www-form-urlencoded' }
	});
	const data = await res.json();
	if ( data.error ) location.href = "/oauth/google/revoke?success=false";
	else location.href = "/oauth/google/revoke?success=true";
}

function changePassword(e) {
	e.preventDefault();
	const form = (this.id === 'change') ? 
		document.getElementById('change-form') :
		document.getElementById('set-form');
		form.style.display = 'block';
		this.style.display = "none";
}


function changeEmail(e) {
	e.preventDefault();
	const form = document.getElementById('email-form');
	form.style.display = 'block';
	this.style.display = "none";
}
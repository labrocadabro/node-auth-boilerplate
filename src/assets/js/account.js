const emailLink = document.querySelector('#change-email a');
const passwordLink = document.querySelector('#change-password a');
const googleLink = document.querySelector('#google a');


googleLink && googleLink.addEventListener('click', unlinkGoogle);

function unlinkGoogle(e) {
	e.preventDefault();
	document.getElementById('revoke-google').submit();
	setTimeout(() => location.href = "/oauth/google/revoke", 500);
}

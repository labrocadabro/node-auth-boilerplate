const emailLink = document.querySelector('#change-email a');
const passwordLink = document.querySelector('#change-password a');
const googleLink = document.querySelector('#google a');
const githubLink = document.querySelector('#github a');


googleLink && googleLink.addEventListener('click', unlinkGoogle);

async function unlinkGoogle(e) {
	e.preventDefault();
	document.getElementById('revoke-google').submit();
	setTimeout(() => location.href = "/oauth/google/revoke", 500);
	//location.href = "/oauth/google/revoke";
}

function submitForm() {
  return Promise.resolve(() => document.getElementById('revoke-google').submit())
}
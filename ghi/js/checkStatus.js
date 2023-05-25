// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get('jwt_access_payload');// FINISH THIS
if (payloadCookie) {
    console.log(payloadCookie)
    const cookieValue = payloadCookie.value;
    const decodedPayload = atob(cookieValue);// FINISH THIS
    const payload =  JSON.parse(decodedPayload);// FINISH THIS

const permissions = payload.user.perms;
if (permissions.includes('events.add_conference')){

    const locationTag = document.getElementById('new-location');
    locationTag.classList.remove('d-none');
}

if (permissions.includes('events.add_location')){

    const linkTag = document.getElementById('new-conference');
    linkTag.classList.remove('d-none');
}


}

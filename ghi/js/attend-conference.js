window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response not ok');
        } else {
            const data = await response.json();

            const selectTag = document.getElementById('conference');

            for (let conference of data.conferences) {
                const option = document.createElement('option');
                option.value = conference.href;
                option.innerHTML = conference.name;
                selectTag.appendChild(option);
            }
                selectTag.classList.remove('d-none');
                
                const loadingSpinner = document.getElementById('loading-conference-spinner');
                loadingSpinner.classList.add('d-none');

            const formTag = document.getElementById('create-attendee-form')
            formTag.addEventListener('submit', async event => {
                event.preventDefault()
                const formData = new FormData(formTag)
                const json = JSON.stringify(Object.fromEntries(formData))

                const attendeesURL = 'http://localhost:8001/api/attendees/'
                const fetchConfig = {
                    method: "post",
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                const response = await fetch(attendeesURL, fetchConfig)
                if (response.ok) {
                    formTag.classList.add('d-none')
                    const alertSuccess = document.getElementById('success-message')
                    alertSuccess.classList.remove('d-none')
                    formTag.reset()
                    const addAttendee = await response.json() 
                }
            })
        }
    } catch (e) {
        console.error('error', e);
    }
});

function createCard(name, description, pictureUrl, formatStart, formatEnd, location) {
    return `
    <div class="col">
        <div class="card border-light mb-3 shadow mb-5 bg-body-tertiary rounded">
            <div class="card-footer">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle">${location}</h6>
                <p class="card-text">${description}</p>
            </div>
            </div>
            <div class="card-footer">
                ${formatStart} - ${formatEnd}
            </div>
        </div>
    </div>
    `;
  }

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Response not ok');
      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;

            const start = new Date(details.conference.starts);
            const formatStart = `${start.getMonth()}/${start.getDate()}/${start.getFullYear()}`;
            const end = new Date(details.conference.ends)
            const formatEnd = `${end.getMonth()}/${end.getDate()}/${end.getFullYear()}`;
            const location = details.conference.location.name

            const html = createCard(title, description, pictureUrl, formatStart, formatEnd, location);
            const column = document.querySelector('.row');
            column.innerHTML += html;
          }
        }

      }
    } catch (e) {
        console.error('e', e)
    }

  });







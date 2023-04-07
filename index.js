const baseUrl = 'http://localhost:3000/'
const activityUrl = baseUrl + 'activities/'

// Get activity data

function fetchActivity () {
    fetch (activityUrl)
    .then(response => response.json())
    .then(activitiesData => renderActivity(activitiesData))
}

fetchActivity()

// Rendering activity image on DOM when click event happens

function renderActivity(activitiesData) {
    const boredButton = document.getElementById('button')
    boredButton.onclick = () => fetchRandomActivity(activitiesData)
}

// Renders a random image and details

function fetchRandomActivity(activitiesData) {
    const randomImageElement = document.getElementById('activity-image')
    const randomImageMath = Math.floor(Math.random() * activitiesData.length)
    const randomImage = activitiesData[randomImageMath]
    randomImageElement.src = randomImage.image

    const activityDetailName = document.getElementById('activity-detail-name')
    activityDetailName.textContent = randomImage.activity

    const activityDetailType = document.getElementById('activity-detail-type')
    activityDetailType.textContent = randomImage.type

    const activityDetailParticipants = document.getElementById('activity-detail-participants')
    activityDetailParticipants.textContent = randomImage.participants

    const details = document.getElementById('detailsDiv')
    randomImageElement.onmouseover = () => details.hidden = !details.hidden

}

const addNewActivityForm = document.getElementById('activity-form')
addNewActivityForm.onsubmit = (event) => {
    event.preventDefault()
    const activityForm = event.target
    const newActivity = {
        activity: activityForm.activity.value,
        type: activityForm.type.value,
        participants: activityForm.participants.value,
        image: activityForm.image.value
    }
    const postRequest = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'accepts': 'application/json'
        },
    body: JSON.stringify(newActivity)
    }

    fetch(activityUrl, postRequest)
    .then(response => response.json())
    .then(console.log)

}
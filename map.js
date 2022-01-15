async function getCoords(){
    let pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}


window.onload = async () => {
    let coords = await getCoords();
    let latitude = coords[0]
    let longitude = coords[1]
    const myMap = L.map('map', {
        center: [latitude, longitude],
        zoom: 01,
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(myMap)
    
    const marker = L.marker([latitude, longitude])
    marker.addTo(myMap).bindPopup('<p1><b>You are not here</b></p1>').openPopup()

    let business = "coffee"
    // let business = "hotel"
    // let business = "market"
    // let business = "restaurant"

    let limit = 5

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3lRxy/ESIhkzljQl7p6MfQX2NfpCr2LcMF+ik1kFEO2c='
        }
    }
    
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${latitude}%2C${longitude}&radius=15000`, options);
    let data = await response.json()
   
    console.log(data)
}

document.getElementById("submit").addEventListener("click", onClick); 

function onClick(event) {
    event.preventDefault()
    let business = document.getElementById('business').value
    return business
}
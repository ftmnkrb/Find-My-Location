document.querySelector("#btnLocation").addEventListener("click", () => {
     if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
     }
});

function onError(err) {
     console.error("Konum alınamadı: " + err.message);
}
async function onSuccess (position) {
     let lat = position.coords.latitude;
     let lng = position.coords.longitude;
     console.log(lat, lng)

     // Konum bilgilerini ekrana yazdır
    const locationInfo = document.getElementById("locationInfo");
    locationInfo.innerHTML = `Enlem: ${lat}, Boylam: ${lng}`;

    const api_key = "5a4281892cbd4cfeb53ce9900dc61710";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api_key}`;

    const response = await fetch(url);
    const data = await response.json();

     const country = data.results[0].components.country; 
     let locationInfoCountry = document.querySelector("#locationInfoCountry");
     let locationInfoRegion = document.querySelector("#locationInfoRegion");
     let locationInfoCity = document.querySelector("#locationInfoCity");
     locationInfoCountry.innerHTML= `Bulunduğunuz Ülke : ${country}`
     locationInfoRegion.innerHTML= `Bulunduğunuz Bölge : ${data.results[0].components.region}`
     locationInfoCity.innerHTML= `Bulunduğunuz Şehir : ${data.results[0].components.city}`
}

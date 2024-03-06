

//accesable variable that contains the data thatt can be universally used throught the script
let universalData;
let todayData;


//assings the value in the form box to the cityName variable



// function to use geolocation and 5 day forcast apis to generate weather for users desirec city
async function apiFetch(event){
    event.preventDefault()

    
    let cityName = document.querySelector("#cityName").value


    // if (cityName === "" || cityName === null ){
    //     console.log("huhhh")
    //     cityName = "cairo"
    // }


    // usees the city name variable in the api url
    const geo = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=fcb350ee82ddff2621b2b58e91f4cf0e`

    document.querySelector("#cityName").value = ""
    // fetches the data and assigs it to a variable
    const response = await fetch(geo)
    let fetchedData = await response.json()

    console.log(fetchedData)

    // assigns the latitude and longitute of the data to variables
    let lat = fetchedData[0].lat
    let lon = fetchedData[0].lon


    console.log(lat);
    console.log(lon);

    // uses lat and lon variables pulled froom geocode api to get weather forcast of specific city
    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fcb350ee82ddff2621b2b58e91f4cf0e&units=imperial`
    const todayUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fcb350ee82ddff2621b2b58e91f4cf0e&units=imperial`

    // fetches city weather foracst
    const response2 = await fetch(forcastUrl)
    let fiveFrocast = await response2.json()
    console.log(fiveFrocast)
    universalData  = fiveFrocast

    //fetches todays weather
    const response3 = await fetch(todayUrl)
    let oneDay = await response3.json()
    console.log(oneDay)
    todayData  = oneDay
    
   
    refreshRemove()

    //this section creates an array of the last 5 searched citys
    let searchArray = []
    let pastSearches = JSON.parse(localStorage.getItem(`searches`))
    console.log(pastSearches)

    if(pastSearches === null){
        pastSearches = searchArray
    }else {
        searchArray = pastSearches
    }

    if(searchArray.length >= 5){
        searchArray.shift()
        searchArray.push(cityName)
    }else{

        searchArray.push(cityName)
    }
    window.localStorage.setItem('searches', JSON.stringify(searchArray))


    previousSearch()
    dayBanner()
    weatherCards()
}

//clicking search runs the apiFetch function
pageLoad()
previousSearch()
const search = document.querySelector("#searchBtn")
search.addEventListener('click', apiFetch );



document.addEventListener('click', function(event){

    idName = event.target.id
    buttonApi()

})

//function to make cards
function weatherCards(){

let divWrap = document.createElement('div')
divWrap.setAttribute('class', 'row justify-content-center cardLocation')
document.querySelector('#weatherCards').append(divWrap)

for( i = 3; i < universalData.list.length; i+=8 ){

    //creates the card
    let weatherCard = document.createElement('section')
    weatherCard.setAttribute('class', ` rmvPing cardcss card${i}`)

    //used to slice the time off of the date data
    dateData = universalData.list[i].dt_txt
    noTime = dateData.slice(0, 10)

    //creates the date header
    weatherDay = document.createElement('h5')
    // weatherDay.setAttribute('class', 'card-title')
    weatherDay.textContent = `${noTime}`

    //creates the image of weather
    weatherSymb = document.createElement('div')
    weatherSymb.setAttribute('class', 'symbol')
        if (universalData.list[i].weather[0].main === "Rain"){
            weatherSymb.textContent = "🌧"
        }else if(universalData.list[i].weather[0].main === "Clear"){
        weatherSymb.textContent = "☀"
        }else if(universalData.list[i].weather[0].main === "Snow"){
            weatherSymb.textContent = "🌨"
        }else if(universalData.list[i].weather[0].main === "Clouds"){
            weatherSymb.textContent = "☁"
        }


    //creates the temp
    weatherTemp = document.createElement('p')
    // weatherTemp.setAttribute('class', 'card-text')
    weatherTemp.textContent = `Temperature: ${universalData.list[i].main.temp}°F`

    //creates the wind speed
    weatherWind = document.createElement('p');
    // weatherWind.setAttribute('class', 'card-title')
    weatherWind.textContent = `Wind speed: ${universalData.list[i].wind.speed} mph`
    
    //creates the humidity
    weatherHum = document.createElement('p')
    // weatherHum.setAttribute('class', 'card-text')
    weatherHum.textContent = `Humidity: ${universalData.list[i].main.humidity}`
    

    document.querySelector('.cardLocation').append(weatherCard)
    document.querySelector(`.card${i}`).append(weatherDay)
    document.querySelector(`.card${i}`).append(weatherSymb)
    document.querySelector(`.card${i}`).append(weatherTemp)
    document.querySelector(`.card${i}`).append(weatherWind)
    document.querySelector(`.card${i}`).append(weatherHum)
    


    
}
}

function dayBanner(){

   let currentDay = document.querySelector('#currentDay')

   let divWrap = document.createElement('div')
   divWrap.setAttribute('class', 'row justify-content-end')

   let currentCard = document.createElement('section')
   currentCard.setAttribute('class', 'dayBanner')
   currentCard.textContent = 'Todays Weather in:'

   cityName = document.createElement('h4')
    // weatherDay.setAttribute('class', 'card-title')
    cityName.textContent = `${todayData.name}, ${todayData.sys.country}`

    //creates the image of weather
    weatherSymb = document.createElement('div')
    weatherSymb.setAttribute('class', 'symbol')
        if (todayData.weather[0].main === "Rain"){
            weatherSymb.textContent = "🌧"
        }else if(todayData.weather[0].main === "Clear"){
        weatherSymb.textContent = "☀"
        }else if(todayData.weather[0].main === "Snow"){
            weatherSymb.textContent = "🌨"
        }else if(todayData.weather[0].main === "Clouds"){
            weatherSymb.textContent = "☁"
        }


    //creates the temp
    weatherTemp = document.createElement('p')
    // weatherTemp.setAttribute('class', 'card-text')
    weatherTemp.textContent = `Temperature: ${todayData.main.temp}°F`

    //creates the wind speed
    weatherWind = document.createElement('p');
    // weatherWind.setAttribute('class', 'card-title')
    weatherWind.textContent = `Wind speed: ${todayData.wind.speed} mph`
    
    //creates the humidity
    weatherHum = document.createElement('p')
    // weatherHum.setAttribute('class', 'card-text')
    weatherHum.textContent = `Humidity: ${todayData.main.humidity}`

    currentDay.append(divWrap)
    divWrap.append(currentCard);
    currentCard.append(cityName, weatherSymb, weatherTemp, weatherWind, weatherHum);
        

}

function previousSearch(){

    let pastCitys = JSON.parse(localStorage.getItem(`searches`))
    console.log(pastCitys)

    if(pastCitys === null){
    }else {
        pastCitys.reverse()
        let btnDiv = document.querySelector('#pastBtns')

        let divWrap = document.createElement('div')
        divWrap.setAttribute('class', 'btnPing')
        btnDiv.append(divWrap)

        for(i = 0; i < pastCitys.length; i++){

            let button = document.createElement('button')
            button.setAttribute('type', 'button')
            button.setAttribute('class', `searchBtncss list-group-item list-group-item-action`)
            button.setAttribute('id', `${pastCitys[i]}`)
            button.textContent = `${pastCitys[i]}`

          
            divWrap.append(button)
        }
        
    }
}

function refreshRemove(){

    const removeCard = document.querySelector('.cardLocation')
    const removePing = document.querySelector('.rmvPing')
    
    //removes last set of cards on refresh or search
    if(removePing !== null){
        removeCard.remove(removePing)
    }


    const bannerPing = document.querySelector('.dayBanner')
    if(bannerPing !== null){
        bannerPing.remove()
    }

    
    //removes old buttons on refresh or search
    const btnPing = document.querySelector('.btnPing')

    if(btnPing !== null){
        btnPing.remove()
    }
    
    const guidePing = document.querySelector('#guidePing')
    if(guidePing !== null){
        guidePing.remove()
    }

}

async function buttonApi(){

    if(idName === ""){
        console.log("user just clicked the screen")

    }else {

        // usees the city name variable in the api url
        const geo = `https://api.openweathermap.org/geo/1.0/direct?q=${idName}&appid=fcb350ee82ddff2621b2b58e91f4cf0e`

        document.querySelector("#cityName").value = ""
        // fetches the data and assigs it to a variable
        const response = await fetch(geo)
        let fetchedData = await response.json()

        console.log(fetchedData)

        //loophole for id click
        if (fetchedData.length == 0){
            console.log("break")
            return;
        }else{
   
            // assigns the latitude and longitute of the data to variables
            let lat = fetchedData[0].lat
            let lon = fetchedData[0].lon



            console.log(lat);
            console.log(lon);

            // uses lat and lon variables pulled froom geocode api to get weather forcast of specific city
            const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fcb350ee82ddff2621b2b58e91f4cf0e&units=imperial`
            const todayUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fcb350ee82ddff2621b2b58e91f4cf0e&units=imperial`

            // fetches city weather foracst
            const response2 = await fetch(forcastUrl)
            let fiveDay = await response2.json()
            console.log(fiveDay)
            universalData  = fiveDay

            //fetches todays weather
            const response3 = await fetch(todayUrl)
            let oneDay = await response3.json()
            console.log(oneDay)
            todayData  = oneDay
    
   
            refreshRemove()
            previousSearch()
            dayBanner()
            weatherCards()
        }
    }
}

function pageLoad(){


   let guide = document.createElement('h2')
   guide.setAttribute("id", "guidePing")
   guide.textContent = "Welcome to the Weather Dashboard! Search any city to see the forcast, or click on one of your recent searches. "


   document.querySelector('#mainbody').append(guide)
    
}
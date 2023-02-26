
/*-----1a) выводим текущее время-------*/
/*
const time = document.querySelector('.time');
function showTime() {
   const date = new Date();
   const currentTime = date.toLocaleTimeString();
   return currentTime;
}
setInterval(
   () => time.textContent = showTime(), 1000);
*/
/* сокращенная функция*/
const time = document.querySelector('.time');
function showTime() {
   return new Date().toLocaleTimeString();
}
setInterval(
   () => time.textContent = showTime(), 1000
);

/*-----1b) выводим текущую дату-------*/
/*
const placeDate = document.querySelector('.date');
function showDate() {
   const date = new Date();
   const options = { month: 'long', day: 'numeric', hour: 'nomeric', minute: 'numeric', timeZone: 'UTC' };
   const currentDate = date.toLocaleDateString(options);
   return currentDate;
}
setTimeout(
   () => placeDate.textContent = showDate(), 1000
);*/

const placeDate = document.querySelector('.date');
function showFullDate() {
   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'];
   const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'November', 'December'];

   const myDate = new Date();
   const fullDate = days[myDate.getDay()] + ', ' +
      months[myDate.getMonth()] + ' ' + myDate.getDate();
   return fullDate;
};
setInterval(
   () => placeDate.textContent = showFullDate(), 1000
);

/*----2a) выводим приветствие------*/

const placeWelcome = document.querySelector('.greeting');

function showWelcome() {
   let welcome;
   const myDateWelcome = new Date();
   const hour = myDateWelcome.getHours();

   if (hour < 6) {
      welcome = 'Good night ';
   } else if (hour < 12) {
      welcome = 'Good morning ';
   } else if (hour < 18) {
      welcome = 'Good afternoon ';
   } else if (hour < 24) {
      welcome = 'Good evening ';
   } else {
      welcome = 'hi';
   };
   return welcome;
}
setInterval(
   () => placeWelcome.textContent = showWelcome(), 1000
);

/*-----2b) сохраняем введенные данные в LocalStorage------*/

/*
let input = document.getElementsByClassName('.name').value;
localStorage.setItem('safeServer', input);
document.getElementsByClassName('.name').innerHTML = localStorage.getItem('safeServer');
*/

function showInput() {
   const name = document.querySelector('.name');
   function setLocalStorage() {
      localStorage.setItem('name', name.value)
   }
   window.addEventListener('beforeunload', setLocalStorage)

   function getLocalStorage() {
      if (localStorage.getItem('name')) {
         name.value = localStorage.getItem('name');
      }
   }
   window.addEventListener('load', getLocalStorage)
}
showInput();
/*
function save() {
   var a = document.getElementsByClassName('.name')[0].value;
   localStorage.setItem('myText', a);
}
document.getElementsByClassName('.name').innerHTML = localStorage.getItem('myText');*/

/*----3a) меняем фоновое изображение ------*/
function getTimeOfDay() {
   let timeOfDay;
   const date = new Date();
   const hours = date.getHours();

   if (hours < 6) {
      timeOfDay = 'night';
   } else if (hours < 12) {
      timeOfDay = 'morning';
   } else if (hours < 18) {
      timeOfDay = 'afternoon';
   } else if (hours < 24) {
      timeOfDay = 'evening';
   } else {
      timeOfDay = 'error';
   };
   return timeOfDay;
};

function getRandomNum() {
   min = Math.ceil(0);
   max = Math.floor(20); /**/
   return Math.floor(Math.random() * (max - min + 1)) + min;
};

const body = document.querySelector('body');
//body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";

let randomNum = getRandomNum();
function setBg() {
   const timeOfDay = getTimeOfDay();
   const stringNum = String(randomNum);
   const bgNum = stringNum.padStart(2, "0");
   // console.log(bgNum);
   const img = new Image();
   img.src =
      `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
   img.onload = () => {
      body.style.backgroundImage =
         `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
   };
};
setBg();

/*------3b) октивируем перелистывание ---------*/


function getSlideNext() {
   //return randomNum <= 20 ? randomNum += 1 : randomNum = 1;
   if (randomNum <= 20) {
      randomNum += 1;
   } else {
      randomNum = 1;
   }
   setBg();
}

function getSlidePrev() {
   //return randomNum <= 20 ? randomNum += 1 : randomNum = 1;
   if (randomNum >= 1) {
      randomNum -= 1;
   } else {
      randomNum = 20;
   }
   setBg();
}
const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);

const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);


/*--------4) виджет погоды ---------*/

//мой API ключ
//https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=5e07cc3fbd9370b8c188d3f04953c8ad&units=metric


const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const getError = document.querySelector('.weather-error')

async function getWeather() {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=5e07cc3fbd9370b8c188d3f04953c8ad&units=metric`;
   //const url = `http://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=5e07cc3fbd9370b8c188d3f04953c8ad&units=metric`;
   const res = await fetch(url);
   const data = await res.json();
   //console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
   weatherIcon.className = 'weather-icon owf';
   weatherIcon.classList.add(`owf-${data.weather[0].id}`);
   temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
   weatherDescription.textContent = data.weather[0].description;
   wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
   humidity.textContent = `Humidity: ${data.main.humidity}%`;
}
//getWeather();
function setCity(event) {
   if (event.code === 'Enter' || event.code === 'unload') {
      getWeather();
      city.blur();
   }
}
document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('keypress', setCity);

function showCity() {
   function setLocalStorage() {
      localStorage.setItem('city', city.value)
   }
   window.addEventListener('beforeunload', setLocalStorage)
   function getLocalStorage() {
      if (localStorage.getItem('city')) {
         city.value = localStorage.getItem('city');
      }
   }
   window.addEventListener('load', getLocalStorage)
}
showCity();


/*--------цитата дня --------------*/
//import data from './data.json' assert { type: 'JSON' };

const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author')


async function getQuotes() {
   let randomNum2 = getRandomNum();
   const stringNum = String(randomNum2);
   const quotes = 'https://type.fit/api/quotes';
   //const quotes = 'data.json';
   const res = await fetch(quotes);
   const data = await res.json();
   console.log(data);
   quote.textContent = `${data[stringNum].text}`;
   author.textContent = `${data[stringNum].author}`;
}
getQuotes();
changeQuote.addEventListener('click', getQuotes);

/*----------pleer-------------------*/

let isPlay = false;
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
let audio = new Audio;
let playNum = 0;
const playList = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind']
const trakPrev = document.querySelector('.play-prev');
const trakNext = document.querySelector('.play-next');

function playAudio() {
   //  audio.src = ('../assets/sounds/Aqua Caelestis.mp3');
   /*audio.src = `assets/sounds/${song}.mp3`;*/
   audio.src = `../assets/sounds/${(playList[playNum])}.mp3`;
   audio.currentTime = 0;
   if (!isPlay) {
      audio.play();
      isPlay = true;
      play.classList.add('pause')

   } else {
      audio.pause();
      isPlay = false;
      play.classList.remove('pause')
   }

}
play.addEventListener('click', playAudio);

/*--------------перелистывание------*/

function playNext() {
   playNum++;
   if (playNum > playList.length - 1) {
      playNum = 0
   }
   playAudio(playList[playNum]);
}

function playPrev() {
   playNum--;
   if (playNum < 0) {
      playNum = playList.length - 1;
   }
   playAudio(playList[playNum]);
}


trakPrev.addEventListener('click', playPrev);
trakNext.addEventListener('click', playNext);


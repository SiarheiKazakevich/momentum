/*----- перевод------------*/

const language = document.querySelectorAll('.lang')
language.forEach((item) => {
   item.addEventListener('click', (e) => {
      for (let i = 0; i < language.length; i++) {
         language[i].classList.remove('active');
      } e.target.classList.add('active')

      if (e.target.classList.contains('select-ru') || e.target.classList.contains('select-en'))
         lang = e.target.innerText.toLowerCase();
      console.log(lang)
      localStorage.setItem('lang', e.target.innerText.toLowerCase())
      getQuotes()
   })
})

const ru = {
   weather: {
      lang: "ru",
      alert: "Вы ввели неверное наименование города, попробуйте снова",
      wind: "Ветер:",
      speed: "м/с",
      humidity: "Влажность:",
   },
   city: "Минск",
   day: "ru-RU",
}


const en = {
   weather: {
      lang: "en",
      alert: "You entered an invalid city name, please try again",
      wind: "Wind:",
      speed: "m/s",
      humidity: "Humidity:",
   },
   city: "Minsk",
   day: "en-US",
}

let lang;
if (!localStorage.getItem('lang')) {
   lang = en;
} else {
   lang = localStorage.getItem('lang');
}
console.log(lang)//en
console.log(lang.city)//udefined
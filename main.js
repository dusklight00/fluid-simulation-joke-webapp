class Joke {
  constructor() {
    this.BUFFER_SIZE = 5;
    this.jokes = [];
    this.loadBufferJokes();
  }

  async loadBufferJokes() {
    for (let i = 0; i < this.BUFFER_SIZE; i++) {
      this.loadJoke();
    }
  }

  async getjoke() {
    const URL = "https://official-joke-api.appspot.com/random_joke";
    const request = await fetch(URL);
    const response = await request.json();
    const type = response.type;
    const id = response.id;
    const setup = response.setup;
    const punchline = response.punchline;
    return {
      type,
      id,
      setup,
      punchline,
    };
    // const joke = {
    //   type: "joke",
    //   id: "id",
    //   setup: "Where do you learn to make banana splits?",
    //   punchline: "At sundae school.",
    // };
    // return joke;
  }

  async loadJoke() {
    const joke = await this.getjoke();
    this.jokes.push(joke);
  }

  getBufferJoke() {
    this.loadJoke();
    return this.jokes.shift();
  }
}

function showBox() {
  const jokeContainer = document.querySelector(".joke-container");
  jokeContainer.classList.add("final");
}

function hideBox() {
  const jokeContainer = document.querySelector(".joke-container");
  jokeContainer.classList.remove("final");
}

let isFirst = true;
function displayJoke(setup, punchline) {
  showBox();
  const setupElem = document.querySelector(".setup");
  const punchlineElem = document.querySelector(".punchline");
  const jokeHeading = document.querySelector(".joke-heading");
  setupElem.textContent = setup;
  punchlineElem.textContent = punchline;
  setTimeout(() => {
    jokeHeading.textContent = "Another joke in...";
    isFirst = false;
  }, 300);
  setTimeout(hideBox, 2000);
}

const jokeInstance = new Joke();

setInterval(async () => {
  const joke = jokeInstance.getBufferJoke();
  displayJoke(joke.setup, joke.punchline);
}, 6000);

let seconds = 0;
setInterval(() => {
  const timeElem = document.querySelector(".joke-time-heading");
  seconds += 1;
  const secondLeft = 5 - (seconds % 6);
  timeElem.textContent = isFirst
    ? `you have ${secondLeft} seconds`
    : `... ${secondLeft} seconds`;
}, 1000);

const jokeContainer = document.querySelector(".joke-container");
const theme = document.querySelector(".theme-icon");
const close = document.querySelector(".x-icon");

theme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBackgroundColor();
  if (document.body.classList.contains("dark-mode")) {
    theme.src = "sun-white.svg";
  } else theme.src = "moon.svg";
});

close.addEventListener("click", () => {
  jokeContainer.classList.add("close");
  setTimeout(() => {
    jokeContainer.classList.remove("close");
  }, 2000);
});

let isDarkMode = true;

function changeBackgroundDark() {
  config.BACK_COLOR = { r: 6, g: 13, b: 29, a: 1 };
}

function changeBackgroundLight() {
  config.BACK_COLOR = { r: 226, g: 240, b: 255, a: 1 };
}

function toggleBackgroundColor() {
  if (isDarkMode) {
    changeBackgroundLight();
    isDarkMode = false;
  } else {
    changeBackgroundDark();
    isDarkMode = true;
  }
}

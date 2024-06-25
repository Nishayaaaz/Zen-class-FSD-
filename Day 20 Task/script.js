let API = "https://thronesapi.com/api/v2/Characters";
let closeIcon = document.querySelector("#close-icon");
let videoPlayer = document.querySelector("#hidden");
let video = document.querySelector("#video_hidden");
let playVideo = document.querySelector("#play-video");
let characterList = document.querySelector(".card");
let currentPage = 1;
let itemsPage = 5;
let houseCurrentPage = 1;
let houseItemsPage = 3;
let nextBtn = document.querySelector("#next-btn");
let previousBtn = document.querySelector("#previous-btn");
let houseNextBtn = document.querySelector("#house-next-btn");
let housePreviousBtn = document.querySelector("#house-previous-btn");
let houses = document.querySelector(".card-content");
let characterName;
let getQuotesCharacterName;
async function getNewApi() {
  characterList.innerHTML = "";
  let startItem = (currentPage - 1) * 4;
  let endItem = startItem + 4;
  try {
    let res = await fetch(API, {
      method: "GET",
    });
    let data = await res.json();
    checkingName(data);
    mappingCharacterData(data.slice(startItem, endItem));
  } catch (error) {
    console.log(error);
  }
}
getNewApi();

closeIcon.addEventListener("click", function () {
  videoPlayer.style.display = "none";
  document.querySelector(".hidden").style.display = "none";
});
playVideo.addEventListener("click", function () {
  videoPlayer.style.display = "block";
  document.querySelector(".hidden").style.display = "block";
});

//Mapping Characters
let characterDataForImg;
function mappingCharacterData(data) {
  characterDataForImg = data.map((value) => {
    displayingCharacters(value);
  });
}

function checkingName(datas) {
  getQuotesCharacterName = function (data) {
    console.log(data.character.name.split(" ")[0]);
    let seperateName = datas.map((value) => {
      return value;
    });
    seperateName.forEach((value) => {
      if (
        value.firstName === data.character.name.split(" ")[0] ||
        value.fullName === data.character.name
      ) {
        gettingImage(value.imageUrl);
      }
    });
  };
}

// Character display

function displayingCharacters(data) {
  let characterData = document.createElement("div");
  characterData.className = "characterdata";
  characterData.innerHTML += `
  <h2>${data.title}</h2>
  <img src="${data.imageUrl}" alt="">
  <h3>FullName: ${data.fullName}</h3>
  <h3>Family:${data.family}</h3>
    `;
  characterList.append(characterData);
}
nextBtn.addEventListener("click", () => {
  currentPage++;
  characterList.innerHTML += "";
  getNewApi();
});
previousBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getNewApi();
  }
});

//Quotes
let quotes = document.querySelector(".quotes");
let quotesContainer = document.querySelector(".quotes-container");
let APIQuotes = "https://api.gameofthronesquotes.xyz/v1/random";

async function getRandomQuotes() {
  try {
    let res = await fetch(APIQuotes, {
      method: "GET",
    });
    let data = await res.json();
    console.log(data);
    randomQuotes(data);
    getQuotesCharacterName(data);
  } catch (error) {
    console.log(error);
  }
}
getRandomQuotes();

function randomQuotes(details) {
  let quotesData = document.createElement("div");
  quotesData.className = "quotesData";
  quotesData.innerHTML += `
  <h3>${details.character.name}'s Best Game of Thrones Quotes</h3>
  <p><span>HouseName </span>: ${details.character.house.name}</p>
  <p id="sentence"><span>Sentence</span> : ${details.sentence}</p>
  `;
  quotes.append(quotesData);
}

function gettingImage(imageData) {
  console.log(imageData);
  let quoteImage = document.createElement("div");
  quoteImage.className = "quoteImage";
  quoteImage.innerHTML += `
  <img src="${imageData}" alt="">
  `;
  quotes.append(quoteImage);
}

//Houses
let houseAPI = "https://anapioficeandfire.com/api/houses";

async function getHouseData() {
  document.querySelector(".card-content").innerHTML = "";
  let startItem = (houseCurrentPage - 1) * 3;
  let endItem = startItem + 3;
  try {
    let res = await fetch(houseAPI, {
      method: "GET",
    });
    let data = await res.json();
    mappingHouseData(data.slice(startItem, endItem));
  } catch (error) {
    console.log(error);
  }
}
getHouseData();

//mapping

function mappingHouseData(data) {
  data.map((value) => {
    getHouseDetails(value);
  });
}

function getHouseDetails(details) {
  let houseContent = document.createElement("div");
  houseContent.className = "house-content";
  houseContent.innerHTML += `
   <h3><span>House Name</span>:${details.name}</h3>
   <h3><span>Region</span>:${details.region}</h3>
   <p><span>CoatOfArms:${details.coatOfArms}</span></p>
  `;
  houses.append(houseContent);
}
houseNextBtn.addEventListener("click", () => {
  houseCurrentPage++;
  houses.innerHTML += "";
  getHouseData();
  console.log(houseItemsPage);
});
housePreviousBtn.addEventListener("click", () => {
  if (houseCurrentPage > 1) {
    houseCurrentPage--;
    getHouseData();
  }
});


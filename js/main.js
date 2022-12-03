AOS.init();
var modeBtn = document.querySelector(".mode");
var bodyBox = document.querySelector(".body-box");

modeBtn.addEventListener("click", function () {
  bodyBox.classList.toggle("mode-opener");
});

const elForm = document.querySelector(".country_form");
const elSearchInput = document.querySelector(".search-input");
const elSelectCountry = document.querySelector(".select_element");
const elListCountry = document.querySelector(".country_list");
const aboutInfo = document.querySelector(".about_info");

const arrCountry = [];
const countryUrl = "https://restcountries.com/v3.1/all";

function renderCountries(arr, node) {
  node.innerHTML = "";
  const elTemplate = document.querySelector(".country_template").content;
  const fragment = document.createDocumentFragment();
  arr.forEach((item) => {
    const clonedTemplate = elTemplate.cloneNode(true);
    clonedTemplate.querySelector(".country_img").src = item.flags.png;
    clonedTemplate.querySelector(".country_img").alt = item.name.common;
    clonedTemplate.querySelector(".card_title").textContent = item.name.common;
    clonedTemplate.querySelector(".population_text").textContent =
      item.population;
    clonedTemplate.querySelector(".region_text").textContent = item.region;
    clonedTemplate.querySelector(".capital_text").textContent = item.capital;
    clonedTemplate.querySelector(".more_info_btn").dataset.id =
      item.name.common;
    clonedTemplate.querySelector(".more_info_btn").href = "./info.html";
    fragment.appendChild(clonedTemplate);
  });
  node.appendChild(fragment);
}

async function getCountries(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    data.forEach((element) => {
      arrCountry.push(element);
    });
    renderCountries(data, elListCountry);
  } catch (error) {
    console.log(error);
  }
}

// about countries
function renderCountriesInfo(array, place) {
  place.innerHTML = "";
  const elInfoTemplate = document.querySelector(".info_template").content;
  const newFragment = new DocumentFragment();
  array.forEach((item) => {
    const clonedInfoTemplate = elInfoTemplate.cloneNode(true);
    clonedInfoTemplate.querySelector(".about_card_img").src = item.flags.svg;
    clonedInfoTemplate.querySelector(".about_card_img").alt = item.name.common;
    clonedInfoTemplate.querySelector(".about_name").textContent =
      item.name.common;
    clonedInfoTemplate.querySelector(".about_native_name").textContent =
      item.name.official;
    clonedInfoTemplate.querySelector(".about_population").textContent =
      item.population;
    clonedInfoTemplate.querySelector(".about_region").textContent = item.region;
    clonedInfoTemplate.querySelector(".about_subregion").textContent =
      item.subregion;
    clonedInfoTemplate.querySelector(".about_capital").textContent =
      item.capital;
    clonedInfoTemplate.querySelector(".about_area").textContent = item.area;
    clonedInfoTemplate.querySelector(".about_borders").textContent =
      item.borders;
    newFragment.appendChild(clonedInfoTemplate);
  });
  place.appendChild(newFragment);
}
async function getInfoCountries(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderCountriesInfo(data, aboutInfo);
  } catch (error) {
    console.log(error);
  }
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const searchValue = elSearchInput.value.trim();
  const searchUrl = `https://restcountries.com/v3.1/name/${searchValue}`;
  console.log(searchUrl);
  if (searchValue === "") {
    getCountries(countryUrl);
  } else {
    getCountries(searchUrl);
  }
});

elSelectCountry.addEventListener("click", () => {
  const selectValue = elSelectCountry.value.trim();
  getCountries(`https://restcountries.com/v3.1/region/${selectValue}`);
});

elListCountry.addEventListener("click", (evt) => {
  if (evt.target.matches(".more_info_btn")) {
    getInfoCountries(
      `https://restcountries.com/v3.1/name/${evt.target.dataset.id}`
    );
    renderCountries(getInfoCountries, aboutInfo);
  }
});
getCountries(countryUrl);

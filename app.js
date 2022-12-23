//// N1
// async function getCountryNameByCapital(capital) {
//   let response = await fetch(`https://restcountries.com/v3.1/capital/${capital}`)
//   let resBody = await response.json();
//   let countryName = resBody[0].name.common;
//   console.log(countryName)

// }
// getCountryNameByCapital("Tbilisi");

// N2-3-4-5
window.addEventListener("DOMContentLoaded", getCountryDetailsByCode);

async function getCountryDetailsByCode() {
  let code = prompt("Enter Country Code");
  let response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  let resBody = await response.json();
  // N3
  const flag = resBody[0].flags.svg;
  let createImg = document.createElement("img");
  if (code === "ru") {
    createImg.src = "./img/pig.avif";
  } else {
    createImg.src = flag;
  }
  document.getElementById("image").appendChild(createImg);

  // N4 -5
  let borderCountryCapitalsArr = [];
  let borderCountryAndPopulations = [];
  let borderCountrysArr = resBody[0].borders;
  for (let i of borderCountrysArr) {
    let response = await fetch(`https://restcountries.com/v3.1/alpha/${i}`);
    let resBody = await response.json();
    let capital = resBody[0].capital[0];
    let country = resBody[0].name.common;
    let population = resBody[0].population;
    let countryAndPopulationObj = {
      country: country,
      capital: capital,
      population: population,
    };

    borderCountryCapitalsArr.push(capital);
    borderCountryAndPopulations.push(countryAndPopulationObj);
    if (countryAndPopulationObj.country === "Russia") {
      countryAndPopulationObj.country = "🐖 Russia 🐖";
    }
  }
  let displayData = borderCountryAndPopulations.map((each) => {
    return ` <div class="country-data">
        <h1 class="country">${each.country}</h1>
        <p class="population">Population: ${each.population}</p>
        <p class="capital">Capital: ${each.capital}</p>
      </div>`;
  });
  displayData = displayData.join("");
  //   console.log(displayData);
  document.getElementById("data").innerHTML = displayData;

  //   console.log(borderCountryCapitalsArr);
  //   console.log(borderCountryAndPopulations);
}

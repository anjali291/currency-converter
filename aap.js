const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".top select");
const msg = document.querySelector(".msg");

const countryList = {
  USD: 'US',
  INR: 'IN',
  EUR: 'EU',
  AUD: 'AU',
};

for (let select of dropdowns) {
  select.innerHTML = '';

  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  console.log("URL", URL);
  try {
    let response = await fetch(URL);
    //const response = await fetch(URL);
    console.log("RESPONSE", response);
    let data = await response.json();
    console.log("DATA", data);
    const FC = fromCurr.value;
    const lowerFC = FC.toLowerCase();
    console.log("LOWER", lowerFC)
    const TC = toCurr.value;
    const lowerTC = TC.toLowerCase();
    console.log("LOWER TC", lowerTC);
    console.log("DATA INSIDE", data?.[lowerFC]);
    let rate = `${data?.[lowerFC]?.[lowerTC]}`;
    console.log("RATE", rate);

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msg.innerText = "Error fetching exchange rate.";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = https//flagsapi.com/${countryCode.toUpperCase()}/flat/64.png;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
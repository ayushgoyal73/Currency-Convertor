const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select"); 
const msg = document.querySelector(".msg");

// for(code in countryList){
//     console.log(code, countryList[code]);
// }

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    // console.log(element);
    let currCode = element.value;
    // console.log(currCode); 
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let newImg = element.parentElement.querySelector("img");
    newImg.src = newSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 0){
        amtVal = 1;
        amount.value = "1";
    }

    let initialCurr = fromCurr.value.toLowerCase();
    let finalCurr = toCurr.value.toLowerCase();
    // console.log(initialCurr);
    // console.log(finalCurr);
    const URL = `${BASE_URL}/${initialCurr}.json`;
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    let rate = data[initialCurr][finalCurr];
    // console.log(data);
    // console.log(rate);

    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
}   

btn.addEventListener("click", (evt) => {
    evt.preventDefault( );
    updateExchangeRate();
});


window.addEventListener("load", () => {
    updateExchangeRate();
});

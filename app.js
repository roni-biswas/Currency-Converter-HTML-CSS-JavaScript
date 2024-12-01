const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


//get all elements
const dropSelect = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const amount = document.querySelector(".amount input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#msg");
const dateTime = document.querySelector("#date");



//get country name and code
for (let select of dropSelect) {
    // show in document
    for (let currCode in countryList) {
        //create a new element name of option
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        //append in option element in select tag
        select.append(newOption);
        
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "BDT") {
            newOption.selected = "selected";
        }
        
    }
    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target);
    })
}


//update flag in document from flagAPI
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector('img');
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`
    img.src = newScr;

}

//convert currency rate
const updateExchangeRate = async () => {
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    
    // Updated URL structure
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalRate = rate * amtVal;
    // display in final result in document
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalRate.toFixed(2)} ${toCurr.value}`;

}


//update time in documents
const updateTime = () => {
    //date object
    let myDate = new Date();
    //date
    let date = myDate.toLocaleString("default", {
        day : "2-digit"
    });
    //month
    let month = myDate.toLocaleString("default", {
        month : 'short'  
    })
    //time
    let time = myDate.toLocaleString("default", {
        timeStyle : "short"
    });
    
    dateTime.innerText = `${month} ${date}, ${time}`;
    
}


//add event for get exchange rate
btn.addEventListener("click", (el)=> {
    el.preventDefault();
    updateExchangeRate();
})

window.addEventListener('load', ()=> {
    updateExchangeRate();
    setInterval(updateTime, 1000);
})
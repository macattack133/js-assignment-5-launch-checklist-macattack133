// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

    let div = document.getElementById("missionTarget");

    div.innerHTML += (`
             <h2>Mission Destination</h2>
             <ol>
                 <li>Name: ${name} </li>
                 <li>Diameter: ${diameter}</li>
                 <li>Star: ${star}</li>
                 <li>Distance from Earth: ${distance}</li>
                 <li>Number of Moons: ${moons} </li>
             </ol>
             <img src= ${imageUrl}>
`)
}


function validateInput(testInput) {


    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput) === true) {
        return "Not a Number";
    } else if (isNaN(testInput) === false){
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let fuelStatus = document.getElementById("fuelStatus");
    let launchStatus = document.getElementById("launchStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");


    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Must be valid input");
    } else {
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        
        if (fuelLevel < 10000 && cargoLevel > 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level too low for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else if (cargoLevel > 10000 && fuelLevel >= 10000) {
            list.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
        } else if (fuelLevel < 10000 && cargoLevel < 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level too low for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
        } else if (fuelLevel >= 10000 && cargoLevel <= 10000) {
            list.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "#419F6A";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {

    let randomIndex = Math.floor(Math.random() * planets.length);
    let planet = planets[randomIndex];
    return planet;

}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;

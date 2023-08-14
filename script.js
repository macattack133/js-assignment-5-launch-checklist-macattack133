// Write your JavaScript code here!


window.addEventListener("load", function () {

    let listedPlanets;
    //Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        //       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

        let myPlanet = pickPlanet(listedPlanets);
        let name = myPlanet.name;
        let diameter = myPlanet.diameter;
        let star = myPlanet.star;
        let moons = myPlanet.moons;
        let distance = myPlanet.distance;
        let imageUrl = myPlanet.image;
        addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);

    })
    let form = document.querySelector("form");
    let list = document.getElementById("faultyItems");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLevel = document.querySelector("input[name=cargoMass]").value;

        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);

    });
});
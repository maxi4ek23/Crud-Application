const nameInput = document.getElementById("name-input");
const weightInput = document.getElementById("weight-input");
const descriptionInput = document.getElementById("description-input");
const animalsContainer = document.getElementById("animals-container");
const findInput = document.getElementById("find");
const createButton = document.querySelector(".create-btn");
const findButton = document.querySelector(".button");
const cancelButton = document.querySelector(".button-red");
const sortButton = document.querySelector(".button-green");
const totalWeightContainer = document.querySelector(".total-price-container");
const countButton = document.querySelector(".count-button");

const animalTemplate = ({name, weight, description}) => `
<li class="animal">
    <img id="animal-photo__photo" class="animal-photo hidden" src="./img/animals.jpg">
    <img id="animal-photo__cat" class="animal-photo hidden" src="./img/cat.jpg">
    <img id="animal-photo__dog" class="animal-photo hidden" src="./img/dog.jpg">
    <h3 class="animal-name">Name: <span>${name}</span></h3>
    <h3 class="animal-weight">Weight: <span>${weight}kg</span></h3>
    <h3 class="animal-description">Description: <span>${description}</span></h3>
</li>
`;

const renderItems = (items) => {
    animalsContainer.innerHTML= "";
    for(const item of items) {
        addAnimalsToPage(item);
    }
};

const getInputValues = () => {
    return {
        name: nameInput.value,
        weight: weightInput.value,
        description: descriptionInput.value,
    }
};

const clearInputs = () => {
    nameInput.value = "";
    weightInput.value = "";
    descriptionInput.value = "";
};

const addAnimalsToPage = ({name, weight, description}) => {
    if(name.toLowerCase() == "cat") {
        animalsContainer.insertAdjacentHTML(
            "afterbegin",
            animalTemplate({name, weight, description})
        );
        const catImg = document.getElementById("animal-photo__cat");
        catImg.classList.remove('hidden');
    } 
    if(name.toLowerCase() == "dog") {
        animalsContainer.insertAdjacentHTML(
            "afterbegin",
            animalTemplate({name, weight, description})
        );
        const dogImg = document.getElementById("animal-photo__dog");
        dogImg.classList.remove('hidden');
    }
    if((name.toLowerCase() != "dog") && (name.toLowerCase() != "cat")){
        animalsContainer.insertAdjacentHTML(
            "afterbegin",
            animalTemplate({name, weight, description})
        );
        const img = document.getElementById("animal-photo__photo");
        img.classList.remove('hidden');
    }
    forStyle();
};

const forStyle = () => {
    if(animals.length>=3) {
        animalsContainer.style.justifyContent = "space-around";
    }
}

let animals = [];
let currentAnimals = [];

const addAnimals = ({name, weight, description}) => {
    const newAnimal = {
        name: name,
        weight: weight,
        description: description,
    };
    animals.push(newAnimal);
    currentAnimals = animals;
    addAnimalsToPage(newAnimal);
}

createButton.addEventListener("click", (event) => {
    event.preventDefault();
    const {name, weight, description} = getInputValues();
    clearInputs();
    addAnimals({
        name: name,
        weight: weight,
        description: description,
    });
});

findButton.addEventListener("click", (event) => {
    event.preventDefault();
    const foundAnimals = animals.filter(animal => animal.name.search(findInput.value) !== -1);
    currentAnimals = foundAnimals;
    renderItems(foundAnimals);
});

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    findInput.value = "";
    renderItems(animals);
    currentAnimals = animals;
});

sortButton.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedAnimalsByWeight = currentAnimals.sort((firstAnimal, secondAnimal) => secondAnimal.weight - firstAnimal.weight);
    renderItems(sortedAnimalsByWeight);
});

countButton.addEventListener("click", (event) => {
    countFunc(currentAnimals);
});

const countFunc = (items) => {
    const total = items.reduce((previousValue, current) => {
        return previousValue + Number(current.weight);
    }, 0)
    totalWeightContainer.innerHTML = total + "kg";
};
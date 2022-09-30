const createAnimalButton = document.getElementById('create_animal');
const myAnimalButton = document.getElementById('my_animal');
const menuItems = document.querySelectorAll('.menu__link');
const contentItems = document.querySelectorAll('.content__page');
const searchForm = document.querySelector('.search_form');
const submitButton = document.getElementById('submit_button');
const editButton = document.getElementById('edit_button');
const createTitle = document.getElementById('create__title');
const editTitle = document.getElementById('edit__title');
const nameInput = document.getElementById('name_input');
const descriptionInput = document.getElementById('description_input');
const expenseInput = document.getElementById('expense_input');
const animalTypeInput = document.getElementById('animal_type_input');
const animalsContainer = document.getElementById('animals-container');
const windowPage = document.getElementById('main');
const createWindowPage = document.getElementById('create__page');
const erorWindow = document.getElementById('alert');
const findButton = document.getElementById('search');
const findInput = document.querySelector('.search_input');
const cancelButton = document.getElementById('clear');
const countButton = document.querySelector('.count_button');
const totalWeightContainer = document.querySelector('.total-price-container');
const sortButton = document.getElementById('sort');

const animalTemplate = ({ id, name, description, dailyExpense, animalType}) => `
<li class="animal_item">
    <img class="animal_item__img" src="./img/animals.jpg">
    <div class="animal_item__container">
        <h4>${name}</h4>
        <div class="animal_item__item">
            <h5 class="animal__characteristic">Description:</h5>
            <p class="animal__text">${description}</p>
        </div>
        <div class="animal_item__item">
            <h5 class="animal__characteristic">Daily expense:</h5>
            <p class="animal__text">${dailyExpense}</p>
        </div>
        <div class="animal_item__item">
            <h5 class="animal__characteristic">Animal type:</h5>
            <p class="animal__text">${animalType}</p>
        </div>
        <div class="edit_button__wrapper">
            <button id="${id}" class="edit_button">
                Edit
            </button>
        </div>
    </div>
</li>
`;

const renderItems = (items) => {
    animalsContainer.innerHTML= "";
    for(const item of items) {
        addAnimalsToPage(item);
    }
};

const addAnimalsToPage = ({id, name, description, dailyExpense, animalType}) => {
    animalsContainer.insertAdjacentHTML(
        "afterbegin",
        animalTemplate({id, name, description, dailyExpense, animalType})
    );
};

const getInputValues = () => {
    return {
        name: nameInput.value,
        description: descriptionInput.value,
        dailyExpense: expenseInput.value,
        animalType: animalTypeInput.value,
    }
};

const clearInputs = () => {
    nameInput.value = "";
    descriptionInput.value = "";
    expenseInput.value = '';
    animalTypeInput.value = 'Select Type';
};

let animals = [];
let currentAnimals = [];
let id = 1;
let currentId;

const addAnimals = ({name, description, dailyExpense, animalType}) => {
    const newAnimal = {
        id: `id_for_edit_${id}`,
        name: name,
        description: description,
        dailyExpense: dailyExpense, 
        animalType: animalType,
    };
    id += 1;
    animals.push(newAnimal);
    currentAnimals = animals;
    addAnimalsToPage(newAnimal);
}

/*const openMainPage = () => {
    createWindowPage.classList.remove('active');
    windowPage.classList.add('active');
    createAnimalButton.classList.remove('active_menu__link');
    myAnimalButton.classList.add('active_menu__link');
    searchForm.classList.remove('unvisible');
}*/

const switchPage = () => {
    createWindowPage.classList.toggle('active');
    windowPage.classList.toggle('active');
    createAnimalButton.classList.toggle('active_menu__link');
    myAnimalButton.classList.toggle('active_menu__link');
    searchForm.classList.toggle('unvisible');
}

const switchCreateToEdit = () => {
    submitButton.classList.toggle('active');
    editButton.classList.toggle('active');
    createTitle.classList.toggle('active');
    editTitle.classList.toggle('active');
}

/*const switchMenuItem = (item) => {
    menuItems.forEach((menuItem) => {
        menuItem.classList.remove('active_menu__link')
    })
    item.classList.add('active_menu__link');
};

const openCreatePage = () => {
    switchMenuItem(createAnimalButton);
}

createAnimalButton.addEventListener('click', (event) => {
    event.preventDefault();
    openCreatePage();
})*/

for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener( 'click', (event) => {
        event.preventDefault();
        for( let menuItem of menuItems) {
            menuItem.classList.remove('active_menu__link')
        }
        event.target.classList.add('active_menu__link')
    
        for( let contentItem of contentItems) {
            contentItem.classList.remove('active')
        }
        contentItems[i].classList.add('active')
    })
};


createAnimalButton.addEventListener('click' , (event) => {
    event.preventDefault();
    searchForm.classList.add('unvisible');
});

myAnimalButton.addEventListener('click' , (event) => {
    event.preventDefault();
    searchForm.classList.remove('unvisible');
});

submitButton.addEventListener('click', (event) => {
    if(validation()) {
        event.preventDefault();
        const {name, description, dailyExpense, animalType} = getInputValues();
        clearInputs();
        addAnimals({
            name: name,
            description: description,
            dailyExpense: dailyExpense, 
            animalType: animalType,
        });
        switchPage();
    //openMainPage();
    } else {
        getEror();
    }
});

editButton.addEventListener('click', (event) => {
    if(validation()) {
        event.preventDefault();
    const {name, description, dailyExpense, animalType} = getInputValues();
    clearInputs();
    let indexCurrentAnimal = animals.map(animal => animal.id).indexOf(currentId);
    animals[indexCurrentAnimal].name = name;
    animals[indexCurrentAnimal].description = description;
    animals[indexCurrentAnimal].dailyExpense = dailyExpense;
    animals[indexCurrentAnimal].animalType = animalType;
    renderItems(currentAnimals);
    switchPage();
    //openMainPage();
    switchCreateToEdit();
    console.log(indexCurrentAnimal);
    } else {
        getEror();
    }
    /*event.preventDefault();
    const {name, description, dailyExpense, animalType} = getInputValues();
    clearInputs();
    let indexCurrentAnimal = animals.map(animal => animal.id).indexOf(currentId);
    animals[indexCurrentAnimal].name = name;
    animals[indexCurrentAnimal].description = description;
    animals[indexCurrentAnimal].dailyExpense = dailyExpense;
    animals[indexCurrentAnimal].animalType = animalType;
    renderItems(animals);
    switchPage();
    //openMainPage();
    switchCreateToEdit();
    console.log(indexCurrentAnimal);*/
})

animalsContainer.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.closest('.edit_button')) {
        switchPage();
        switchCreateToEdit();
        currentId = event.target.getAttribute('id');
        returnEditParametrs(currentId);
    }
})

const returnEditParametrs = (id) => {
    const animalsContainerItem = animals.find((animal) => {
        return animal.id === id;
    });
    nameInput.value = animalsContainerItem.name;
    descriptionInput.value = animalsContainerItem.description;
    expenseInput.value = animalsContainerItem.dailyExpense;
    animalTypeInput.value = animalsContainerItem.animalType;
};

createWindowPage.addEventListener('click', (event) => {
    if(event.target.closest('.alert')) {
        erorWindow.classList.add('hidden');
    }
});

// --------------- Manage Animals ---------------

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

countButton.addEventListener("click", () => {
    countFunc(currentAnimals);
});

const countFunc = (items) => {
    const total = items.reduce((previousValue, item) => {
        return previousValue + Number(item.dailyExpense);
    }, 0)
    totalWeightContainer.innerHTML = total + "$";
};

sortButton.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedAnimalsByExpense = currentAnimals.sort((firstAnimal, secondAnimal) => secondAnimal.dailyExpense - firstAnimal.dailyExpense);
    renderItems(sortedAnimalsByExpense);
});

// --------------- Validation ---------------

const validation = () => {
    if(nameInput.value == '' || descriptionInput.value == '' || expenseInput.value <= 0 || animalTypeInput.value == 'Select Type') {
        return false;
    }
    else {
        console.log(nameInput.value, descriptionInput.value, expenseInput.value, animalTypeInput.value)
        return true;
    }
};

const getEror = () => {
    erorWindow.classList.remove('hidden');
}
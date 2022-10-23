import { getAllAnimals, postAnimal, editAnimal, deleteAnimal } from "./api.js";


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

const animalTemplate = ({ id, name, description, daily_expense, anim_type}) => `
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
            <p class="animal__text">${daily_expense}</p>
        </div>
        <div class="animal_item__item">
            <h5 class="animal__characteristic">Animal type:</h5>
            <p class="animal__text">${anim_type}</p>
        </div>
        <div class="edit_button__wrapper">
            <button id="${id}" class="edit_button">
                Edit
            </button>
            <button id="${id}" class="remove_button">
                Remove
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

const addAnimalsToPage = ({id, name, description, daily_expense, anim_type}) => {
    animalsContainer.insertAdjacentHTML(
        "afterbegin",
        animalTemplate({id, name, description, daily_expense, anim_type})
    );
};

const getInputValues = () => {
    return {
        name: nameInput.value,
        description: descriptionInput.value,
        daily_expense: expenseInput.value,
        anim_type: animalTypeInput.value,
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

/*const addAnimals = ({name, description, daily_expense, anim_type}) => {
    const newAnimal = {
        id: `id_for_edit_${id}`,
        name: name,
        description: description,
        daily_expense: daily_expense, 
        anim_type: anim_type,
    };
    id += 1;
    animals.push(newAnimal);
    currentAnimals = animals;
    addAnimalsToPage(newAnimal);
}*/

const refetchAllAnimals = async () => {
    const allAnimals = await getAllAnimals();
    animals = allAnimals; 
    currentAnimals = allAnimals;

    renderItems(animals);
};

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
        const {name, description, daily_expense, anim_type} = getInputValues();
        clearInputs();
        postAnimal({
            name: name,
            description: description,
            daily_expense: daily_expense, 
            anim_type: anim_type,
        }).then(refetchAllAnimals);
        switchPage();
    //openMainPage();
    } else {
        getEror();
    }
});

editButton.addEventListener('click', (event) => {
    if(validation()) {
        event.preventDefault();
        editAnimal(currentId, getInputValues()).then(refetchAllAnimals(animals));
        clearInputs();
        switchPage();
        //openMainPage();
        switchCreateToEdit();
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

animalsContainer.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.closest('.remove_button')) {
        deleteAnimal(event.target.getAttribute('id')).then(refetchAllAnimals);
    }
})

const returnEditParametrs = (id) => {
    const animalsContainerItem = animals.find((animal) => {
        return animal.id == id;
    });
    nameInput.value = animalsContainerItem.name;
    descriptionInput.value = animalsContainerItem.description;
    expenseInput.value = animalsContainerItem.daily_expense;
    animalTypeInput.value = animalsContainerItem.anim_type;
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
        return previousValue + Number(item.daily_expense);
    }, 0)
    totalWeightContainer.innerHTML = total + "$";
};

sortButton.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedAnimalsByExpense = currentAnimals.sort((firstAnimal, secondAnimal) => secondAnimal.daily_expense - firstAnimal.daily_expense);
    renderItems(sortedAnimalsByExpense);
});

// --------------- Validation ---------------

const validation = () => {
    if(nameInput.value == '' || descriptionInput.value == '' || expenseInput.value <= 0 || animalTypeInput.value == 'Select Type') {
        return false;
    }
    else {
        return true;
    }
};

const getEror = () => {
    erorWindow.classList.remove('hidden');
}

//  main code

refetchAllAnimals()


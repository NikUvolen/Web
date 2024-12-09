const nameElement = document.getElementById('ui__text-field__name');
const dialogueElement = document.getElementById('ui__text-field__text');
const choicesField = document.getElementById('ui__choise');
const backgroundElement = document.body;

const mainCharacter = document.getElementById('mainCharacter');
const secondCharacter = document.getElementById('secondCharacter');

let currentScene = 0;

const characters = {
    'Система': {
        color: '#ffffff',
    },
    'Иван': {
        color: '#423455',
        link: 'style/img/charactes/gg (1).png'
    },
    'Герой 2': {
        color: '#317564',
        link: 'style/img/charactes/2.png'
    },
    'Герой 3': {
        color: '#563218',
        link: 'style/img/charactes/3.png'
    }
};

const scenes = [
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Отличный сегодня денек для отличной прогулки",
        choices: [],
        background: 'style/img/bg/background48.png'
    },
    {   
        name: "Система",
        secondCharacter: "",
        text: "Добро пожаловать в визуальную новеллу! Выберите, что хотите сделать.",
        choices: [
            { text: "Исследовать лес", ponts: 1 },
            { text: "Посетить деревню", ponts: 0 }
        ],
        background: 'style/img/bg/background (13).png'
    },
    {   
        name: "Система",
        secondCharacter: "",
        text: "Добро пожаловать в визуальную новеллу! Выберите, что хотите сделать.",
        choices: [
            { text: "Исследовать лес", ponts: 1 },
            { text: "Посетить деревню", ponts: 0 }
        ],
        background: 'style/img/bg/background (10).png'
    },
]


let showText = function(target, message, index, interval) {
    if (index < message.length) {
        target.append(message[index++]);
        setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
}

function updateScene() {
    const scene = scenes[currentScene];
    
    nameElement.textContent = scene.name;
    nameElement.style.color = characters[scene.name].color;
    dialogueElement.textContent = '';
    showText(dialogueElement, scene.text, 0, 5);
    backgroundElement.style.backgroundImage = `url(${scene.background})`;

    secondCharacter.innerHTML = '';
    if (scene.secondCharacter) {
        const secondCharacterImg = document.createElement('img');
        secondCharacterImg.src = characters[scene.secondCharacter].link;
        secondCharacter.appendChild(secondCharacterImg)
    }

    if (scene.name == 'Система') {
        secondCharacter.classList.remove('active');
        mainCharacter.classList.remove('active');
    } else if (scene.name == 'Главный герой') {
        mainCharacter.classList.add('active');
        secondCharacter.classList.remove('active');
    } else {
        secondCharacter.classList.add('active');
        mainCharacter.classList.remove('active');
    }

    
    if (scene.choices.length > 0) {
        choicesField.innerHTML = '';
        choicesField.classList.add('active')
        backgroundElement.classList.add('choice');

        for (let i = 0; i < scene.choices.length; i++) {
            const choiseElem = document.createElement('div');
            choiseElem.className = 'ui__choise__elem';
            choiseElem.textContent = scene.choices[i].text;
            choicesField.appendChild(choiseElem);
        }

        choicesField.classList.add('active');
    }
    else {
        choicesField.classList.remove('active');
        backgroundElement.classList.remove('choice');
    }

    currentScene++;
}

backgroundElement.addEventListener('click', function(e) {
    updateScene();
})

updateScene();

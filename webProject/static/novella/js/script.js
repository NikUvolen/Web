const nameElement = document.getElementById('ui__text-field__name');
const dialogueElement = document.getElementById('ui__text-field__text');
const choicesField = document.getElementById('ui__choise');
const backgroundElement = document.body;
const gameField = document.getElementById('game_field');
const text_field = document.getElementById('text_field');
const newGameBtn = document.getElementById('newGame');

const mainCharacter = document.getElementById('mainCharacter');
const secondCharacter = document.getElementById('secondCharacter');


let choiceState = false;
let currentScene = localStorage['currentScene'] || 0;
let end = -1;
let clickCount = 1;
let sumPoints = 0;
let timeOut;

const characters = {
    '???': {
        color: '#ffffff',
    },
    'Иван': {
        color: '#499ad0',
        link: '../images/charactes/gg (1).png'
    },
    'Мужчина': {
        color: '#317564',
        link: 'style/img/charactes/2.png'
    },
    'Дмитрий': {
        color: '#317564',
        link: 'style/img/charactes/2.png'
    },
    'Женщина': {
        color: '#563218',
        link: 'style/img/charactes/3.png'
    },
    'Юлия Олеговна': {
        color: '#563218',
        link: 'style/img/charactes/3.png'
    }
};

// ends
const ends = [
    // 0 - stayHome
    [
        {   
            name: "Иван",
            secondCharacter: "",
            text: "Не, лучше дома останусь все-таки",
            choices: [],
            background: '../images/bg/background0.jpg'
        },
        {   
            name: "???",
            secondCharacter: "",
            text: "На этом и заканчивается самая коротка история Ивана",
            choices: [],
            background: 'style/img/bg/background0.jpg'
        },
        {   
            name: "???",
            secondCharacter: "",
            text: "Могло ли быть лучшей концовки?",
            choices: [],
            background: ''
        },
        {   
            name: "???",
            secondCharacter: "",
            text: "...",
            choices: [],
            background: ''
        },
        {   
            name: "???",
            secondCharacter: "",
            text: "Концовка 1 - \"Stay Home\"",
            choices: [],
            background: ''
        },
    ],
    // 1 - Good End
    [

    ],
    // 2 - Bad end
]

const scenes = [
    {   
        name: "???",
        secondCharacter: "",
        text: "Привет, меня зовут <???>. Сейчас я тебе поведаю иторию одного парня по имени Иван одним необычным утром в совершенно обычном городе <???>",
        choices: [],
        background: ''
    },
    {   
        name: "???",
        secondCharacter: "",
        text: "И так, поехали...",
        choices: [],
        background: ''
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Отличный сегодня денек для отличной прогулки.",
        choices: [],
        background: '../images/bg/background0.jpg'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Но стоит ли вообще? Может лучше лабки поделать?",
        choices: [
            { text: "Остаться дома и поделать лабы", ponts: 0, ends: 0 },
            { text: "Не, лучше прогуляться все-таки", ponts: 0 }
        ],
        background: 'style/img/bg/background0.jpg'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Не, все-таки прогулка - дело хорошее. Выдвигаюсь.",
        choices: [],
        background: 'style/img/bg/background0.jpg'
    },
    {   
        name: "???",
        secondCharacter: "",
        text: "Наш Иван решил все-же прогуляться и где-то через час...",
        choices: [],
        background: 'style/img/bg/background0.jpg'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Вау, я и не знал, что в нашем городке есть такое место. Надо бы пройтись.",
        choices: [],
        background: 'style/img/bg/background1.jpg'
    },
    {   
        name: "???",
        secondCharacter: "",
        text: "Ох, Иван, не нравится мне это... Но я лишь наблюдатель.",
        choices: [],
        background: 'style/img/bg/background1.jpg'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Похоже на какую-то заброшенную лабораторию.",
        choices: [],
        background: 'style/img/bg/background2.png'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Наручные часы? Хм, выглядят дорого, но не ходят. Помнится, у моего отца были такие же.",
        choices: [],
        background: 'style/img/bg/background2.png'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Покажу ка я брату, когда вернусь домой, а пока надену их. Стильно, стильно",
        choices: [],
        background: 'style/img/bg/background2.png'
    },
    {   
        name: "???",
        secondCharacter: "",
        text: "...",
        choices: [],
        background: 'style/img/bg/background2.png'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Что-то голова гружится",
        choices: [],
        background: ''
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Что? Где я? Я же только что был в заброшенном здании.",
        choices: [],
        background: 'style/img/bg/background3.png'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Странно... Может провалы в памяти от перенапряжения? Все-таки на носу зачетная неделя.",
        choices: [],
        background: 'style/img/bg/background3.png'
    },
    {   
        name: "???",
        secondCharacter: "",
        text: "Да, друг мой, именно они.",
        choices: [],
        background: 'style/img/bg/background3.png'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Пойду лучше домой посплю чуток.",
        choices: [],
        background: 'style/img/bg/background3.png'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Странно, я совершенно не помню эти места.",
        choices: [],
        background: 'style/img/bg/background4.png'
    },
    {   
        name: "Иван",
        secondCharacter: "",
        text: "Ого, а это что такое? Больше похоже на фильм. Может тут что-то снимать будут?",
        choices: [],
        background: 'style/img/bg/background5.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "Вы кто? Как вы сюда зашли? Сюда вход только по пропуску научного персонала.",
        choices: [],
        background: 'style/img/bg/background5.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Мужчина",
        text: "Я?! Я не знаю, я просто надел часы и тут оказался...",
        choices: [],
        background: 'style/img/bg/background5.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "Чего? А ну ка пройдемте. Надо бы с вами разобраться.",
        choices: [],
        background: 'style/img/bg/background5.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Мужчина",
        text: "Я правда не знаю, как именно тут оказался. Честно.",
        choices: [],
        background: 'style/img/bg/background6.png'
    },
    {   
        name: "???",
        secondCharacter: "Мужчина",
        text: "Да, и я готов подтвердить его незнание.",
        choices: [],
        background: 'style/img/bg/background6.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "Мне все-равно..",
        choices: [],
        background: 'style/img/bg/background6.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "И так, садись. Говоришь, не знаешь как оказался? Паспорт то при себе?",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Мужчина",
        text: "Вроде бы...",
        choices: [
            { text: "Протянуть студенческий", points: 0 },
            { text: "Протянуть водительское удостоверение", points: 0 }
        ],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Мужчина",
        text: "Только это.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "Это шутка такая? Хочешь сказать, что ты мне в прадеды годишься?",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "???",
        secondCharacter: "Мужчина",
        text: "Мужчина усмехнулся.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Мужчина",
        text: "Но это правда мой...",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "Помолчи. Иван, значит...",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "Юлия Олеговна, подойдите в мой кабинет. У нас тут парнек со странностями.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "Сейчас разберемся с тобой.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Женщина",
        secondCharacter: "Женщина",
        text: "И что тут у нас?",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "Вот, поглядите. У нас тут паренек чушь несет, якобы не знает, как тут оказался.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Мужчина",
        text: "Но я правда не знаю!",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Юлия Олеговна",
        secondCharacter: "Юлия Олеговна",
        text: "Странно.. Вроде документ старый, но выглядит неплохо.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Юлия Олеговна",
        secondCharacter: "Юлия Олеговна",
        text: "Так, ладно. Расскажи мне все, что с тобой произошло.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Мужчина",
        secondCharacter: "Мужчина",
        text: "Юлия Олеговна, но мы должны сообщить об...",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Юлия Олеговна",
        secondCharacter: "Юлия Олеговна",
        text: "Тише, Дима, сейчас у меня очень важное дело.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "???",
        secondCharacter: "Дмитрий",
        text: "Дмитрий тут же немного поник, но возражать не стал.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Юлия Олеговна",
        secondCharacter: "Юлия Олеговна",
        text: "И так, я слушаю.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "???",
        secondCharacter: "Юлия Олеговна",
        text: "Думаю стоит рассказать",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Юлия Олеговна",
        text: "...",
        choices: [
            { text: "Рассказать", points: 0 }
        ],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Юлия Олеговна",
        text: "Я пошел прогуляться, решил зайти и пройтись по какой-то заброшенной лаборатории. Нашел какие-то часы, надел.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Юлия Олеговна",
        text: "А потом бац, и все, я тут. Правду говорю.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "???",
        secondCharacter: "Юлия Олеговна",
        text: "У женщины тут же заблестели глаза и появилась легкая ухмылка.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Юлия Олеговна",
        secondCharacter: "Юлия Олеговна",
        text: "Интересно, интересно. Пошли со мной.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Дмитрий",
        secondCharacter: "Дмитрий",
        text: "Но...",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "???",
        secondCharacter: "Дмитрий",
        text: "Юлия Олеговна даже не обратила на Дмитрия внимания и лишь открыла дверь, приглашая Ивана на выход.",
        choices: [
            { text: "Пойти за Юлией Олеговной", points: 0 }
        ],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "???",
        secondCharacter: "Дмитрий",
        text: "И Иван, недолго думая, пошел за ней.",
        choices: [],
        background: 'style/img/bg/background7.png'
    },
    {   
        name: "Иван",
        secondCharacter: "Юлия Олеговна",
        text: "Куда мы идем?",
        choices: [],
        background: 'style/img/bg/background8.png'
    },
    {   
        name: "Юлия Олеговна",
        secondCharacter: "Юлия Олеговна",
        text: "",
        choices: [],
        background: 'style/img/bg/background8.png'
    },
];

let showText = function(target, message, index, interval) {
    if (index < message.length) {
        target.append(message[index++]);
        timeOut = setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
}

function updateScene() {
    let scene;
    if (end >= 0)
        scene = ends[end][currentScene];
    else 
        scene = scenes[currentScene];
    
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

    if (scene.name == '???') {
        secondCharacter.classList.remove('active');
        mainCharacter.classList.remove('active');
    } else if (scene.name == 'Иван') {
        mainCharacter.classList.add('active');
        secondCharacter.classList.remove('active');
    } else {
        secondCharacter.classList.add('active');
        mainCharacter.classList.remove('active');
    }

    
    if (scene.choices.length > 0) {
        choicesField.innerHTML = '';
        choicesField.classList.add('active')

        if (scene.choices.length > 0) {
            choiceState = true;
            for (let i = 0; i < scene.choices.length; i++) {
                const choiseElem = document.createElement('div');
                choiseElem.className = 'ui__choise__elem';
                choiseElem.textContent = scene.choices[i].text;
                choiseElem.addEventListener('click', function(e) {
                    if (scene.choices[i].ends != undefined) {
                        currentScene = 0;
                        end = scene.choices[i].ends;
                    }
                    else {
                        sumPoints += scene.choices[i].ponts;
                    }
                    choiceState = false;
                    updateScene();
                });
                choicesField.appendChild(choiseElem);
            }
            choicesField.classList.add('active');
        }
        else {
            choiceState = false;
        }
    }
    else {
        choicesField.classList.remove('active');
    }

    localStorage['currentScene'] = currentScene;
    currentScene++;
}


function nextScene() {
    clearTimeout(timeOut);
    if (currentScene >= 2)
        mainCharacter.style.visibility = 'visible';
    
    console.log(choiceState);
    if (choiceState) {
        // gameField.classList.add('choice');
    }
    else if (localStorage['currentScene'] <= scenes.length){
        updateScene();
        // gameField.classList.remove('choice');
    }
}

gameField.addEventListener('click', function(e) {
    nextScene();
})

text_field.addEventListener('click', function(e) {
    nextScene();
})

newGameBtn.addEventListener('click', function(e) {
    choiceState = false;
    currentScene = 0;
    end = -1;
    localStorage['currentScene'] = currentScene;
    mainCharacter.style.visibility = 'hidden';
    updateScene();
})

if (currentScene >= 2)
    mainCharacter.style.visibility = 'visible';
updateScene();

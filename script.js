const items = [{
        title: "АНТУРИУМ",
        description: "Анту́риум — род вечнозелёных растений семейства Ароидные, или Аронниковые. Латинское название рода образовано от древнегреческих слов, означающих «цветок» и «хвост».",
        price: 65,
        img: "./img/anthurium.jpg",
    },
    {
        title: "ЗАМИОКУЛЬКАС",
        description: "Замиоку́лькас — монотипный род растений семейства Ароидные, представленный единственным видом замиокулькас замиели́стный, происходящим из тропической Африки. ",
        price: 95,
        img: "./img/zamioculcas.jpg",
    },
    {
        title: "ФИКУС АЛЬТИССИМА",
        description: "Фи́кус — род растений семейства Тутовые, в составе которого образует монотипную трибу Фикусовые.",
        price: 255,
        img: "./img/ficus.jpg",
    },
    {
        title: "КАЛАМОНДИН",
        description: "Каламондин, или цитрофортунелла - это быстрорастущее и хорошо ветвящееся вечнозеленое деревце — гибрид мандаринового дерева с кумкватом",
        price: 145,
        img: "./img/kalamondin.jpeg",
    },
    {
        title: "ХАМЕДОРЕЯ",
        description: "Хамедорея или бамбуковая пальма — род цветковых растенийсемейства Пальмовые. Включает более ста видов низкорослых древесных растений, широко распространённых в Южной и Центральной Америке.",
        price: 20,
        img: "./img/hamedoreya.jpg",
    },
    {
        title: "БОНСАЙ ФИКУС ГИНСЕНГ",
        description: "Фикус микрокарпа, также известный как китайский баньян, малайский баньян, индийский лавр, куртинный инжир или гаджумару, представляет собой дерево из семейства инжирных Moraceae.",
        price: 57,
        img: "./img/bonsay-ficus-ginseng.jpg",
    },
];

let currentState = [...items];

const containerForItems = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector('#nothing-found');

function makeItemByTemplate(element) {

    const { title, description, price, img } = element;

    const item = itemTemplate.content.cloneNode(true);
    item.querySelector('h2').textContent = title;
    item.querySelector('p').textContent = description;
    item.querySelector('img').src = img;
    item.querySelector('.item__price').textContent = `${price} руб`;

    return item;
}


function renderItems(arr) {
    nothingFound.textContent = "";
    containerForItems.innerHTML = "";
    arr.forEach((item) => {
        containerForItems.append(makeItemByTemplate(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}


renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");


function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));

    renderItems(currentState);

    sortControl.selectedIndex = 0;
}


searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    renderItems(currentState);
});



const cartWrapper = document.querySelector('.cart-wrapper');
const emptyCart = document.querySelector('.empty-cart');
const totalPriceOfOrder = document.querySelector('.total-price');
const priceOfElement = cartWrapper.querySelectorAll('.item__price');


let totalPrice = 0;

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('item__buy')) {

        const card = event.target.closest('.shop-item');

        const productInfo = {
            title: card.querySelector('.item__title').innerText,
            price: card.querySelector('.item__price').innerText,
        };


        const cartItemHTML = ` <div class="cart-item__title">${productInfo.title} </div>`;


        cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);

        emptyCart.innerText = '';

        totalPrice += parseInt(productInfo.price);

        totalPriceOfOrder.innerText = totalPrice;

        //alert('Добавлен в корзину!');

    };
});
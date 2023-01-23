const elCur = document.querySelector('select[name=curs]');
const elRoot = document.querySelector('.root');

let summ = 0;
//const summ = null;

// Model products
let products = [
    {
        id: 1,
        name: 'Банан',
        country: 'Іспанія',
        price: 5100,
        count: 0,

    },

    {
        id: 2,
        name: 'Огірок',
        country: 'Турція',
        price: 3500,
        count: 0,
    },

    {
        id: 5,
        name: 'Яблуко Дюшес',
        country: 'УкраЇна',
        price: 2000,
        count: 0,
    },
];

const curs = [
    { key: 'UAH', mult: 1 },
    { key: 'USD', mult: 0.027 },
    { key: 'EUR', mult: 0.025 }
];

let selectedCur = curs[0].key;

// Model Cart
// const shopCart = [
//     { id: 1, count: 0 },
//     { id: 2, count: 0 },
//     { id: 5, count: 0 },
// ];

// View
const renderProduct = () => {
    const html = products.map((item) => {
        const _html = `
            <div class="item">
                <h2>${item.name} (ID: ${item.id})</h2>
                <div>Price: ${item.price}</div>
                <div>
                    Count:
                    <button type="button" data-pid=${item.id} data-action="+">+</button>
                    ${item.count}
                    <button type="button" data-pid=${item.id} data-action="-">-</button>
                </div>
            </div>
        `
        return _html;
    }).join('');

    //console.log(html);

    elRoot.innerHTML = html;  
};

const renderCurs = () => {
    const html = curs.map((item) => `
        <option value="${item.key}">${item.key}</option>
        `).join('');

        elCur.innerHTML = html;
};

const renderSum = () => {
    const el = document.querySelector('.sum span');
    el.innerHTML = `${summ} ${selectedCur}`;
};

// Controller

const changeProductCount = (pid, action) => {
    console.log(pid, action);
    const idx = products.findIndex((item) => 
        item.id === pid
    );
    //console.log(idx);
    if (products[idx].count === 0 && action === '-') {
        return;
    }

    if (action === '-') {
        products[idx].count = products[idx].count - 1;
        renderProduct();
        calcSum();
        return;
    }

    if (action === '+') {
        products[idx].count = products[idx].count + 1;
        renderProduct();
        calcSum();
        return;
    }

};

const calcSum = () => {
    const idx = curs.findIndex((item) => item.key === selectedCur);
    const mult = curs[idx].mult;

    const calc = products.reduce((acc, item) => {
        acc+= item.price * item.count * mult;
        return acc;
    }, 0);

    summ = calc;
    renderSum();
}

// Interface
elRoot.addEventListener('click', (ev) => {
    //console.log(ev);
    const el = ev.target;
    const pid = Number(el.dataset.pid);
    const { action } = el.dataset;

    if (!pid && !action) {
        return;
    }

    //console.log(ev.dataset);
    //console.log (pid, action);

    changeProductCount(pid, action);
});

elCur.addEventListener('change', (ev) => {
    const value = ev.target.value;
    console.log(value);
    selectedCur = value;
});

// Runners
renderCurs();
renderProduct();
//calcSum();
renderSum();
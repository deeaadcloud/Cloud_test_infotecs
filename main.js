// const form = document.getElementById("myForm");
// form.style.visibility = 'hidden';

// const table = document.getElementById("myTable");
// const tBody = document.createElement("tbody");
// //получаем данные
// function render(json) {


//     const Data = JSON.parse(json)
//         tableData = document.querySelector('.main-data'),
//         aboutTh = document.querySelector('.about'),
//         Cards = splitArray(json);

//     Data.innerHTML = '';

//     Cards.forEach((state) => {
//         const dataPage = document.createElement('tr');


//         dataPage.setAttribute('id', state.id);
//         dataPage.className = 'dataPage';
//         dataPage.innerHTML =
//             `
//     <td class='first-name _cell' data-type='text'>${state.name.firstName}</td>
//     <td class='last-name _cell' data-type='text'>${state.name.lastName}</td>
//     <td class='about _cell' data-type='text'>${state.about.slice(0, (state.about / 4)) + '...'}</td>
//     <td class='eye-color _cell' data-type='text'>${state.eyeColor}</td>`;
//         Data.appendChild(dataPage)

//     })
// }
// // заполняем таблицу
// //создаю строки таблицы заполняя полученными данными





// // for (let i in state) {

// // }




// for(let i in state){
//     const row = document.createElement("tr");
//     row.id = state[i].id;
//     for(let j = 0; j < 4; j++){
//         const col = document.createElement("td");
//         if(j == 0){
//             const text = document.createTextNode(state[i].name.firstName);
//             col.appendChild(text);
//         }else if(j == 1){
//             const text = document.createTextNode(state[i].name.lastName);
//             col.appendChild(text);
//         }else if(j == 2){
//             const text = document.createTextNode, $:{row.id.slice(0(state[i].about/4))+'...'};
//             col.appendChild(text);
//         }else if(j == 3){
//             const text = document.createTextNode(state[i].eyeColor);
//             col.appendChild(text);
//         }
//         row.appendChild(col);
//     }
//     tBody.appendChild(row);
//     table.appendChild(tBody);
// }


// for(let j = 0; j < 4; j++){
//     const col = document.createElement("td");
//     if(j == 0){
//         const text = document.createTextNode(state[i].name.firstName);
//         col.appendChild(text);
//     }else if(j == 1){
//         const text = document.createTextNode(state[i].name.lastName);
//         col.appendChild(text);
//     }else if(j == 2){
//         const text = document.createTextNode(state[i].about);
//         col.appendChild(text);
//     }else if(j == 3){
//         const text = document.createTextNode(state[i].eyeColor);
//         col.appendChild(text);
//     }
//     row.appendChild(col);
// }








//получаем данные и вводим необходимые переменные
const state = JSON.parse(json);

const table = document.getElementById("myTable");
const tBody = document.createElement("tbody");
const tablePag = document.querySelectorAll('#paginator li')
const pagination = document.querySelector('#paginator')
const slicePage = arrayPage(state);


// заполняем таблицу
//создаю строки таблицы заполняя полученными данными. Делим строку about на примерное число 3 чтобы получить две строки


slicePage.forEach((state) => {
    const row = document.createElement("tr");

    for (let i = 0; i < 1; i++) {
        state.id = state[i].id;
        aboutWidth = document.querySelector('.about')
        aboutWid = aboutWidth.clientWidth
        row.getAttribute('id', state.id);
        row.className = 'row_page';
        row.innerHTML = `
                <td class='first-name_inner' data-type='text'>${state[i].name.firstName}</td>
                <td class='last-name_inner' data-type='text'>${state[i].name.lastName}</td>
                <td class='about_inner' data-type='text'>${state[i].about.slice(0, (aboutWid / 3)) + '...'}</td>
                <td class='eye-color_inner' data-type='text'>${state[i].eyeColor}</td>
            `;

        tBody.append(row);
        const td = row.querySelector('td.eye-color_inner');
        table.appendChild(tBody);
        eyeColor(td);
    }

})

// цвет глаз меняется в зависимости от значения написанного в td

function eyeColor(value) {
    const coloredEye = document.createElement('div');
    coloredEye.className = 'colored-eye';
    coloredEye.innerHTML = value.innerHTML;
    value.innerHTML = '';
    value.append(coloredEye);
    value.lastChild.style.cssText = `background-color: ${value.lastChild.innerHTML};`;
}


// разбивка таблицы, 10 строк на страницу 

function arrayPage(page, pageSize = 5) {
    const subslice = [],
        pageAmount = Math.ceil(page.length / pageSize);
    for (let j = 0; j < pageAmount; j++) {
        subslice[j] = page.slice((j * pageSize), (j * pageSize) + pageSize);
    }
    return subslice;
}

// отрисовка li для выбора страницы объектов

tablePag.forEach((state, pageSize = 10) => {
    const pag = document.createElement("li")
    pageSize = 10;
    let notesPage = Math.ceil(state.length / pageSize);

    for (let i = 1; i <= notesPage; i++) {
        pag.className = 'row_page';
        let li = document.createElement('li')
        li.innerHTML = i;
        pagination.appendChild(li)
    }
    for (let li in pagination) {
        li.addEventListener('click', () => {
            let pageNum = +this.innerHTML;
            let start = (pageNum - 1)
            let end = start + notesPage
            let notes = json.slice(start, end)
            console.log(notes)
        });
    };
})

// скрытие формы
const form = document.getElementById("myForm");
form.style.visibility = 'hidden';

// форма для редактирования 
var tds = document.querySelectorAll('td');
for (var i = 0; i < tds.length; i++)
    tds[i].onclick = function () {
        id = this.id;
        form.style.cssText = 'display: block;';
        var inputName = document.getElementById("firstName");
        var inputlastName = document.getElementById("lastName");
        var inputAbout = document.getElementById("about");
        var inputEyeColor = document.getElementById("EyeColor");
        if (state[i] == id) {
            inputName.value = state[i].name.firstName
            inputlastName.value = state[i].name.lastName
            inputAbout.value = state[i].about;
            inputEyeColor.value = state[i].eyeColor;
        }
    };


// сортировка

document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for (const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for (const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.myTable_inner thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

});
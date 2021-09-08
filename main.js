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

tablePag.forEach((state, pageSize = 10, pagination) => {
    const paginator = document.createElement("li")
    pageSize = 10;
    let notesPage = Math.ceil(state.length / pageSize);

    for (let i = 1; i <= notesPage; i++) {
        paginator.className = 'row_page';
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
form.style.cssText = 'display: none;';

// форма для редактирования 
var formIn = document.querySelectorAll('td');
for (var i = 0; i < formIn.length; i++)
    formIn[i].onclick = function () {
        id = this.innerHTML;
        console.log(id);
        form.style.cssText = 'display: block;';
        var inputName = document.getElementById("firstName");
        var inputlastName = document.getElementById("lastName");
        var inputAbout = document.getElementById("about");
        var inputEyeColor = document.getElementById("EyeColor");
        for (let i in state){
            if (state[i].name.firstName == id) {
                inputName.value = state[i].name.firstName
                // inputlastName.value = state[i].name.lastName
                // inputAbout.value = state[i].about;
                // inputEyeColor.value = state[i].eyeColor;
            }
            if (state[i].name.lastName == id) {
                // inputName.value = state[i].name
                inputlastName.value = state[i].name.lastName
                // 
                // 
            }
            if (state[i].about == id) {
                inputAbout.value = state[i].about;
            }
            if (state[i].eyeColor == id){
                inputEyeColor.value = state[i].eyeColor;
            }
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
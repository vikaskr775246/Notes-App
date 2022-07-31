const plus_icon = document.querySelector('#plus-icon');
const h1 = document.querySelector('h1');
const addNoteBtn = document.querySelector('#add_note');
const container = document.getElementById('container');
const title = document.getElementById('title');
const textarea = document.getElementById('textarea');
const section = document.querySelector('section');
// 
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
plus_icon.onclick = () => {
    container.className += 'show';
    funobj.closeFun();
}
const funobj = {
    closeFun() {
        const form_close = document.querySelector('#close');
        form_close.addEventListener('click', () => {
            container.classList.remove('show');
            funobj.htmlVal();
        });
    },
    htmlVal() {
        h1.innerHTML = `add a new note<span id="close"><i class="fa-solid fa-xmark"></i></span>`;
        addNoteBtn.innerHTML = 'add note';
    }
};
funobj.closeFun();
let arry = JSON.parse(localStorage.getItem('Title'));
if (!arry) {
    arry = [];
};
addNoteBtn.addEventListener('click', addNote);
function addNote(e) {
    e.preventDefault();
    let t_Val = title.value.trim(),
        area_Val = textarea.value.trim();
    if (t_Val && area_Val) {
        let NotesInfo = {
            title: t_Val,
            description: area_Val,
            date: 'day'
        };
        container.classList.remove('show');
        if (isUpdate) {
            arry.push(NotesInfo);
        } else {
            arry[updateId] = NotesInfo;
            isUpdate = true;
        }
        localStorage.setItem('Title', JSON.stringify(arry));
        showNotes();
        funobj.htmlVal();
        title.value = '';
        textarea.value = '';
    };
};
showNotes();
function showNotes() {
    section.innerHTML = '';
    arry.forEach((elm, idx) => {
        let html = `<div class="card">
        <title>${elm.title}</title>
        <p>${elm.description}</p>
        <div class="card-footer">
            <div class="time">
                06:52 pm
            </div>
            <div class="dorts" onclick='menuShow(this)'>
                <span class="dort_icon">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </span>
                <div class="menu">
                    <div class="edit" onclick ='updateNotes(${idx},event)'>edit</div>
                    <div class="remove" onclick ='removeNotes(${idx})'>remove</div>
                </div>
            </div>
        </div>
    </div>`;
        section.innerHTML += html;
    });
    funobj.htmlVal();
};
function menuShow(elm) {
    const menu = elm.children[1];
    const menuAll = document.querySelectorAll('.menu');
    for (const remo of menuAll) {
        remo.classList.remove('show');
    }
    menu.classList.add('show');
    document.onclick = (e) => {
        if (e.target.tagName == 'SECTION') {
            menu.classList.remove('show');
        }
    };
};
let isUpdate = true, updateId;

function updateNotes(idx, event) {
    plus_icon.click();
    title.focus();
    let path = event.composedPath()[4].children;
    titleVal = path[0]
    areaVal = path[1];
    updateId = idx;
    title.value = titleVal.innerText;
    textarea.value = areaVal.innerText;
    h1.innerHTML = `update a notes<span id="close"><i class="fa-solid fa-xmark"></i></span>`;
    addNoteBtn.innerHTML = 'update note';
    funobj.closeFun();
    isUpdate = false;
};
function removeNotes(idx) {
    arry.splice(idx, 1);
    localStorage.setItem('Title', JSON.stringify(arry));
    showNotes();
};
// Search Injection
const search = document.querySelector('#search');
const search_icon = document.querySelector('#search_icon');
const cardTitle = document.querySelectorAll('.card>title');
const card = document.querySelectorAll('.card');
search.oninput = () => {
    if (!search.value) {
        card.forEach(elm => { elm.style.display = 'inline-block' })
    };
}
search_icon.onclick = () => {
    cardTitle.forEach((txt, idx) => {
        let text = txt.innerHTML.toLocaleLowerCase(),
            searchVal = search.value.toLocaleLowerCase();
        if (text === searchVal) {
            card[idx].style.display = 'inline-block';
        } else {
            card[idx].style.display = 'none';
        }
    })
}
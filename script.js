showNotes();
document.getElementById('newNote').addEventListener('click',addNewNote);
function addNewNote()
{
    showNotes();
    let txt=`<div id="newNoteContainer">
    <div class="head"><span>NEW NOTE</span><i class="fas fa-save" onclick="savefun()"></i></div>
    <input class="noteTitle" type="text" placeholder="Enter Title..">
    <textarea class="noteText" rows="10" placeholder="Enter Text.."></textarea>
    </div>`;
    document.getElementById('noteContainer').innerHTML+=txt;
}

function savefun(){
    let addTitle=document.getElementById('newNoteContainer').getElementsByTagName('input')[0].value;
    let addTxt=document.getElementById('newNoteContainer').getElementsByTagName('textarea')[0].value;
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let today = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle,
        text: addTxt,
        date: today,
        bookmark: false
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let HTML = "";
    notesObj.forEach(function (element, index) {
        HTML += `<div class="note">
        <div class="head"><span class="date">${element.date}</span><i id="${index}" onclick="deleteNote(this.id)" class="far fa-trash-alt"></i><i onclick="bookmarked(this)" class="far fa-bookmark"></i></div>
        <input class="noteTitle" type="text" placeholder="Note Title" value="${element.title}" readonly="readonly">
        <textarea class="noteText" rows="10" placeholder="Note Text" readonly="readonly">${element.text}</textarea>
        </div>
        `;
    });
    let notesElm = document.getElementById('noteContainer');
    if (notesObj.length != 0) {
        notesElm.innerHTML = HTML;
        notesObj.forEach(function (element, index) {
            if (`${element.bookmark}` == "true") {
                let indexId = `${index}`;
                document.getElementById(indexId).nextElementSibling.classList.add('fas');
                document.getElementById(indexId).nextElementSibling.classList.remove('far');
            }
        });
    }
    else {
        notesElm.innerHTML = ``;
    }
}


function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


function bookmarked(e) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let index = e.previousElementSibling.id;
    if(e.classList.contains('far'))
    {
    e.classList.add('fas');
    e.classList.remove('far');
    notesObj[index].bookmark = true;
    }
    else
    {
    e.classList.add('far');
    e.classList.remove('fas');
    notesObj[index].bookmark = false;
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
}

let search = document.getElementById('Search');
search.addEventListener('input', function () {
    let inputVal = search.value;
    let notecards = document.getElementsByClassName('note');
    Array.from(notecards).forEach(function (element) {
        let cardTitle = element.getElementsByTagName("input")[0].value;
        let cardTxt = element.getElementsByTagName("textarea")[0].value;
        if (cardTxt.includes(inputVal)||cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

function showBookmark()
{
    let notecards = document.getElementsByClassName('note');
    Array.from(notecards).forEach(function (element) {
        if(element.getElementsByTagName("i")[1].classList.contains('fas'))
        {
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
}
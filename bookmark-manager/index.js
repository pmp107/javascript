/**
* Objective: Functions to Fetch, Add, Delete Bookmarks from Firebase.
* Author: 
* Date Created: 
* Modified: 
*/


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
//Masking keys in case of public repo.
const firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXXXXXXXX",
    appId: "XXXXXXXXXXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "bookmarks");


//To dynamically generate each bookmark on UI.
function generateTemplate(response, id){
    // console.log(response);
    return `<div class="card">
                <p class="title">${response.title}</p>
                <div class="sub-information">
                    <p>
                        <span class="category ${response.category}">${response.category[0].toUpperCase()}${response.category.slice(1)}</span>
                    </p>
                    <a href="${response.link}" target="_blank"><i class="bi bi-box-arrow-up-right website"></i></a>
                    <a href="https://www.google.com/search?q=${response.title}" target="_blank"><i class="bi bi-google search"></i></a>
                    <span><i class="bi bi-trash delete" data-id="${id}"></i></span>
                </div>
            </div>`;
}

//To fetch and show all cards(bookmarks) once application is opened.
const cards = document.querySelector(".cards");
function showCard(){
    cards.innerHTML = "";
    getDocs(colRef)
    .then(data => {
        data.docs.forEach(document => {
            cards.innerHTML += generateTemplate(document.data(), document.id);
        });
        deleteEvent();
    })
    .catch(error => {
        console.log(error);
    });
}
showCard();

//To delete bookmark based on documentId.
function deleteEvent(){
    const deleteButtons = document.querySelectorAll("i.delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", event => {
            const deleteRef = doc(db, "bookmarks", button.dataset.id);
            deleteDoc(deleteRef)
                .then(() => {
                    button.parentElement.parentElement.parentElement.remove();
                })
        })
    });
}

//To add new bookmark.
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", event => {
    event.preventDefault();
    addDoc(colRef, {
        link: addForm.link.value,
        title: addForm.title.value,
        category: addForm.category.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addForm.reset();
        //to land on same category after addition of bookmark.
        const categoryList = document.querySelector(".category-list span.active");
        filteredCards(categoryList.innerText);
        // showCard();
    })
});

//To filter bookmarks based on category.
function filteredCards(category){
    if(category === "All"){
        showCard();
    } else {
        const qRef = query(colRef, where("category", "==", category.toLowerCase()));
        cards.innerHTML = "";
        getDocs(qRef)
            .then(data => {
                data.docs.forEach(document => {
                    cards.innerHTML += generateTemplate(document.data(), document.id);
                });
                deleteEvent();
            })
            .catch(error => {
                console.log(error);
            });
    }
}

const categoryList = document.querySelector(".category-list");
const categorySpan = document.querySelectorAll(".category-list span");
categoryList.addEventListener("click", event => {
    if(event.target.tagName === "SPAN"){
        filteredCards(event.target.innerText);
        categorySpan.forEach(span => span.classList.remove("active"));
        event.target.classList.add("active");
    }
});
const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardbody = document.querySelectorAll(".card-body")[1];
const clearButton = document.getElementById("clear-films");


// Tüm eventleri yükleme
eventListeners();

function eventListeners() {
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });

    secondCardbody.addEventListener("click",deleteFilm);
    clearButton.addEventListener("click",clearAllFilms);

}


function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if ( title === "" || director === "" || url === "") {
        // Hata mesajı
        UI.displayMessages("Tüm alanları doldurun!","danger");
    }
    else {
        // Yeni film
        const newFilm = new Film(title,director,url);

        UI.addFilmToUI(newFilm);    // Arayüze film ekleme

        Storage.addFilmToStorage(newFilm);  // Storage'a film ekleme

        UI.displayMessages("Film başarıyla eklendi!","success");
    }


    UI.clearInputs(titleElement,directorElement,urlElement);
    
    e.preventDefault();
}

function deleteFilm(e) {
    
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Film silindi!","warning");
        }


}

function clearAllFilms() {
    if (confirm("Emin misiniz?")) {

    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();

    }
}
let CODEPIN;
const pageImage = document.querySelector(".blocImage"); 
const pageAccueil = document.getElementById("accueil");
const allsImg = document.querySelectorAll("#allsImg>.img>img");
const largeImg = document.querySelector(".largeImg>img");
const logOutBtn = document.getElementById("logOutBtn");
const verifyCodePin = document.getElementById("verifyCodePin");

/**les variables pour la page d'accueil */
const form = document.forms[0];
const form2 = document.forms[1];
form2.style.display = 'none';
console.log(form2.pincode.value);

const submitBtn = document.getElementById("saveCodePin");
const erreurMessage = document.querySelector(".erreurMessage");
erreurMessage.style.display = 'none';

/**
 * cette fonction permet de changer la source de l'image de grande taille a chaque clique 
 * sur une des images de petites taille
 */
changeLargeImg = () => {
    for (const img of allsImg) {
        img.onclick = (e) => {
            largeImg.src = e.target.src;
        }
    }
}
changeLargeImg();

/**
 * cette fonction permet de cacher la page de galerie
 */
hideGalleryPage();
function hideGalleryPage() {
    pageImage.style.display = 'none';
}

/** verification des champs de saisie pour le pin et la confirmation */
verifyPinValidation(submitBtn,form?.pincode,form?.pincodeconfirmation);
function verifyPinValidation(formBtn,pinCode, pinCodeConfirmation) {
    let formState = true;
    formBtn.onclick = (e) => {

        if (pinCode.value ==='') {
            pinCode.style.border = '3px solid red';
            formState = false;
        } else {
            pinCode.style.border = 'none';
            formState = true;
        }
        if (pinCodeConfirmation.value ==='') {
            pinCodeConfirmation.style.border = '3px solid red';
            formState = false;
        } else {
            pinCodeConfirmation.style.border = 'none';
            formState = true;
        }

        if (formState) {
            if (pinCode.value === pinCodeConfirmation.value ) {
                pageAccueil.style.display = 'none';
                pageImage.style.display = 'block';
                erreurMessage.style.display = 'none';
                saveCodePin("codePinKey", pinCode.value);
            } else {
                erreurMessage.style.display = 'block';
                erreurMessage.textContent = "Pin code not matching !";
            }
        }
    }
}

/** Retour sur la page d'accueil */
logOutBtn.onclick = (e) => {
    pageAccueil.style.display = 'block';
    pageImage.style.display = 'none';
    form.style.display = 'none';
    form2.style.display = 'block';
}

/** Sauvegarder le code pin pour se souvenir  */
function saveCodePin(codeKey, pinValue) {
    localStorage.setItem(codeKey, pinValue);
}

/** cette partie permet de faire une redirection vers la page gallery si le code pin
 * existe dans le cas 
 */
document.addEventListener("DOMContentLoaded", function() {
    const codeP = localStorage.getItem("codePinKey");
    if (codeP !== null) {
        CODEPIN = codeP;
        form2.style.display = "block";
        pageAccueil.style.display = 'block';
        form.style.display = "none";
        pageImage.style.display = 'none';
    }
});


verifyCodePin.onclick = (e) => {
    if (form2?.pincode.value !== '' && form2?.pincode.value === CODEPIN) {
        form2.pincode.value = "";
        pageAccueil.style.display = 'none';
        pageImage.style.display = 'block';
    }
}
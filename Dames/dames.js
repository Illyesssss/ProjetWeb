const menuHamburger = document.querySelector(".menu-slide");	
const navLinks = document.querySelector(".nav-link");

menuHamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile-menu')
})

function bienvenue(title){
    Swal.fire({
        title: title,
        html: '<div><img src="../images/logo.png" alt="Icone jeu" class="icone-custom"></div>' + '<p>Dans un jeu de dames, les blancs et les noirs jouent à tour de rôle. Les Blancs jouent le premier coup de la partie. Pour plus de détails, lisez les règles.</p>',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        customClass: {
            popup: 'custom-modal',
            content: 'custom-modal-content'
        }
    });
}
bienvenue("⭐⭐⭐Bienvenue!⭐⭐⭐");
var plateauDiv = document.getElementById("plateau");
var joueur = "blanc";

function mettreAJourAffichage(joueurAct) {
    var joueurActuel = document.getElementById("joueur-actuel");
    joueurActuel.textContent = "Joueur actuel : " + joueurAct;
}
// Fonction pour initialiser le plateau de jeu
function initialiserPlateau(){
    var plateau = [];
    var i;
    var j;
    var couleur;
    for(i = 0;i < 10;i++){
        plateau[i] = [];
        for(j = 0;j < 10;j++){
            couleur = (i + j) % 2 === 0 ? "blanc" : "marron";
            plateau[i][j] = {
                couleur: couleur,
                pion: null,
                dame: false
            };
        }
    }
    return plateau;
}

// Fonction pour placer les pions sur le plateau
function placerPions(plateau){
    var i;
    var j;
    for(i = 0;i < 4;i++){
        for(j = 0;j < 10;j++){
            if(plateau[i][j].couleur === "marron"){
                plateau[i][j].pion = "blanc";
            }
        }
    }
    for(i = 6;i < 10;i++){
        for(j = 0;j < 10;j++){
            if(plateau[i][j].couleur === "marron"){
                plateau[i][j].pion = "noir";
            }
        }
    }
}

// Fonction pour afficher le plateau de jeu
function afficherPlateau(plateau){
    plateauDiv.innerHTML = '';
    var nbPionsNoir = document.getElementById("pions-noir");
    var nbPionsBlanc = document.getElementById("pions-blanc");
    var accN = 0;
    var accB = 0;
    var case_div;
    var pion;
    var i;
    var j;
    for(i = 0;i < 10;i++){
        for(j = 0;j < 10;j++){
            if(plateau[i][j].pion === "noir"){
                accN++;
            }
            if(plateau[i][j].pion === "blanc"){
                accB++;
            }
            case_div = document.createElement("div");
            case_div.classList.add("case",plateau[i][j].couleur);
            if (plateau[i][j].pion !== null) {
                pion = document.createElement("div");
                pion.classList.add("pion",plateau[i][j].pion);
                if(plateau[i][j].dame === true){
                    pion.classList.add("dame");
                }
                case_div.appendChild(pion);
            }
            plateauDiv.appendChild(case_div);
        }
    }
    mettreAJourAffichage(joueur);
    nbPionsNoir.textContent = "Pions noir : " + accN;
    nbPionsBlanc.textContent = "Pions blanc : " + accB;

}

function promouvoirEnDame(plateau, ligne, colonne) {
    if ((joueur === "blanc" && ligne === 9) || (joueur === "noir" && ligne === 0)) {
        plateau[ligne][colonne].dame = true;
      
    }
}



var plateau = initialiserPlateau();
placerPions(plateau);
afficherPlateau(plateau);
var bouttonNouvellePartie = document.getElementById("nouvelle-partie");
function nouvellePartie(){
    plateau = initialiserPlateau();
    placerPions(plateau);
    joueur = "blanc";
    afficherPlateau(plateau);
}
bouttonNouvellePartie.addEventListener("click", nouvellePartie);

var encoreUnePrisePossible = false;
var positionPriseMultiple = [0,0];

function deplacer(plateau, anciennePosition, nouvellePosition){
    var ancienneLigne = anciennePosition[0];
    var ancienneColonne = anciennePosition[1];
    var nouvelleLigne = nouvellePosition[0];
    var nouvelleColonne = nouvellePosition[1];
    // Vérifier si la case de destination est valide pour le déplacement ou la capture
    if(plateau[nouvelleLigne][nouvelleColonne].pion !== "blanc" && plateau[nouvelleLigne][nouvelleColonne].pion !== "noir"){
        if(plateau[ancienneLigne][ancienneColonne].pion === "blanc"){
            if((ancienneLigne + 1 === nouvelleLigne && ancienneColonne + 1 === nouvelleColonne) || (ancienneLigne + 1 === nouvelleLigne && ancienneColonne - 1 === nouvelleColonne)){
                plateau[nouvelleLigne][nouvelleColonne].pion = "blanc";
                plateau[ancienneLigne][ancienneColonne].pion = null;
            }
            else{
                if(ancienneLigne + 2 === nouvelleLigne && ancienneColonne + 2 === nouvelleColonne){
                    if(plateau[ancienneLigne + 1][ancienneColonne + 1].pion === "noir"){
                        plateau[nouvelleLigne][nouvelleColonne].pion = "blanc";
                        plateau[ancienneLigne + 1][ancienneColonne + 1].pion = null;
                        plateau[ancienneLigne][ancienneColonne].pion = null;   
                        encoreUnePrisePossible = true;
                        positionPriseMultiple = [nouvelleLigne,nouvelleColonne];
                    }
                    else{
                        joueur = (joueur === "blanc") ? "noir" : "blanc";
                    }
                }
                if(ancienneLigne + 2 === nouvelleLigne && ancienneColonne - 2 === nouvelleColonne){
                    if(plateau[ancienneLigne + 1][ancienneColonne - 1].pion === "noir"){  
                        plateau[nouvelleLigne][nouvelleColonne].pion = "blanc";
                        plateau[ancienneLigne + 1][ancienneColonne - 1].pion = null;
                        plateau[ancienneLigne][ancienneColonne].pion = null;
                        encoreUnePrisePossible = true;
                        positionPriseMultiple = [nouvelleLigne,nouvelleColonne];
                    }
                    else{
                        joueur = (joueur === "blanc") ? "noir" : "blanc";
                    }      
                }
                else{
                    joueur = (joueur === "blanc") ? "noir" : "blanc";
                }
            }
        }
        else{
            if(plateau[ancienneLigne][ancienneColonne].pion === "noir"){
                if((ancienneLigne - 1 === nouvelleLigne && ancienneColonne + 1 === nouvelleColonne) || (ancienneLigne - 1 === nouvelleLigne && ancienneColonne - 1 === nouvelleColonne)){
                    plateau[nouvelleLigne][nouvelleColonne].pion = "noir";
                    plateau[ancienneLigne][ancienneColonne].pion = null;
                } 
                else{
                    if(ancienneLigne - 2 === nouvelleLigne && ancienneColonne + 2 === nouvelleColonne){
                        if(plateau[ancienneLigne - 1][ancienneColonne + 1].pion === "blanc"){
                            plateau[nouvelleLigne][nouvelleColonne].pion = "noir";
                            plateau[ancienneLigne - 1][ancienneColonne + 1].pion = null;
                            plateau[ancienneLigne][ancienneColonne].pion = null;  
                            encoreUnePrisePossible = true;
                            positionPriseMultiple = [nouvelleLigne,nouvelleColonne];  
                        }
                        else{
                            joueur = (joueur === "blanc") ? "noir" : "blanc";
                        }
                    }  
                    if(ancienneLigne - 2 === nouvelleLigne && ancienneColonne - 2 === nouvelleColonne){
                        if(plateau[ancienneLigne - 1][ancienneColonne - 1].pion === "blanc"){  
                            plateau[nouvelleLigne][nouvelleColonne].pion = "noir";
                            plateau[ancienneLigne - 1][ancienneColonne - 1].pion = null;
                            plateau[ancienneLigne][ancienneColonne].pion = null;
                            encoreUnePrisePossible = true;
                            positionPriseMultiple = [nouvelleLigne,nouvelleColonne];
                        }
                        else{
                            joueur = (joueur === "blanc") ? "noir" : "blanc";
                        }      
                    }
                    else{
                        joueur = (joueur === "blanc") ? "noir" : "blanc";
                    }  
                }   
            }
        }
    }
    else{
        joueur = (joueur === "blanc") ? "noir" : "blanc";    
    }
}
       

var premierClic = null;
var deuxiemeClic = null;
function gererClicCase(ligne, colonne){
    if(premierClic === null){
        if(plateau[ligne][colonne].pion === joueur){
            // Premier clic : enregistrer les coordonnées
            premierClic = [ligne, colonne];
        }
    } 
    else{
        // Deuxième clic : enregistrer les coordonnées
        deuxiemeClic = [ligne, colonne];
        deplacer(plateau,premierClic,deuxiemeClic);
        promouvoirEnDame(plateau,ligne,colonne);     
        joueur = (joueur === "blanc") ? "noir" : "blanc";
        afficherPlateau(plateau);
        // Réinitialiser les coordonnées des clics
        premierClic = null;
        deuxiemeClic = null;
    }
}
function dameClic(event){
    var a = plateauDiv.getBoundingClientRect();
    var x = event.clientX - a.left;
    var y = event.clientY - a.top;
    var longueurCase = plateauDiv.offsetWidth/10;
    var hauteurCase = plateauDiv.offsetHeight/10

    var case_x = Math.floor(y/longueurCase);
    var case_y = Math.floor(x/hauteurCase);
    console.log("x :",case_x);
    console.log("y :",case_y);
    if(!encoreUnePrisePossible){
        gererClicCase(case_x,case_y);
    }
    else{
        var tmp = (joueur === "blanc") ? "noir" : "blanc";
        if(positionPriseMultiple[0] >= 0 && positionPriseMultiple[0] < 10 && positionPriseMultiple[1] >= 0 && positionPriseMultiple[1] < 10){
            if(encoreUnePrisePossible && !(plateau[positionPriseMultiple[0] + 1][positionPriseMultiple[1] + 1].pion === tmp || plateau[positionPriseMultiple[0] - 1][positionPriseMultiple[1] + 1].pion === tmp || plateau[positionPriseMultiple[0] - 1][positionPriseMultiple[1] - 1].pion === tmp || plateau[positionPriseMultiple[0] + 1][positionPriseMultiple[1] - 1].pion === tmp)){
                encoreUnePrisePossible = false;
                gererClicCase(case_x,case_y);
            }
            else{
                if(positionPriseMultiple[0] + 2 < 10 && positionPriseMultiple[1] + 2 < 10){
                    if(plateau[positionPriseMultiple[0] + 2][positionPriseMultiple[1] + 2].pion === null && plateau[positionPriseMultiple[0] + 1][positionPriseMultiple[1] + 1].pion === tmp){
                        if(case_x === positionPriseMultiple[0] + 2 && case_y === positionPriseMultiple[1] + 2){
                            plateau[positionPriseMultiple[0] + 2][positionPriseMultiple[1] + 2].pion = joueur;
                            plateau[positionPriseMultiple[0] + 1][positionPriseMultiple[1] + 1].pion = null;
                            plateau[positionPriseMultiple[0]][positionPriseMultiple[1]].pion = null;  
                            afficherPlateau(plateau);  
                        }
                    }
                    else{
                        if(positionPriseMultiple[0] - 2 >= 0 && positionPriseMultiple[1] + 2 < 10){
                            if(plateau[positionPriseMultiple[0] - 2][positionPriseMultiple[1] + 2].pion === null && plateau[positionPriseMultiple[0] - 1][positionPriseMultiple[1] + 1].pion === tmp){
                                if(case_x === positionPriseMultiple[0] - 2 && case_y === positionPriseMultiple[1] + 2){
                                    plateau[positionPriseMultiple[0] - 2][positionPriseMultiple[1] + 2].pion = joueur;
                                    plateau[positionPriseMultiple[0] - 1][positionPriseMultiple[1] + 1].pion = null;
                                    plateau[positionPriseMultiple[0]][positionPriseMultiple[1]].pion = null;
                                    afficherPlateau(plateau);    
                                }
                            }
                            else{
                                if(positionPriseMultiple[0] - 2 >= 0 && positionPriseMultiple[1] - 2 >= 0){
                                    if(plateau[positionPriseMultiple[0] - 2][positionPriseMultiple[1] - 2].pion === null && plateau[positionPriseMultiple[0] - 1][positionPriseMultiple[1] - 1].pion === tmp){
                                        if(case_x === positionPriseMultiple[0] - 2 && case_y === positionPriseMultiple[1] - 2){
                                            plateau[positionPriseMultiple[0] - 2][positionPriseMultiple[1] - 2].pion = joueur;
                                            plateau[positionPriseMultiple[0] - 1][positionPriseMultiple[1] - 1].pion = null;
                                            plateau[positionPriseMultiple[0]][positionPriseMultiple[1]].pion = null;
                                            afficherPlateau(plateau);
                                        }
                                    }
                                    else{
                                        if(positionPriseMultiple[0] + 2 < 10 && positionPriseMultiple[1] - 2 >= 0){
                                            if(plateau[positionPriseMultiple[0] + 2][positionPriseMultiple[1] - 2].pion === null && plateau[positionPriseMultiple[0] + 1][positionPriseMultiple[1] - 1].pion === tmp){
                                                if(case_x === positionPriseMultiple[0] + 2 && case_y === positionPriseMultiple[1] - 2){
                                                    plateau[positionPriseMultiple[0] + 2][positionPriseMultiple[1] - 2].pion = joueur;
                                                    plateau[positionPriseMultiple[0] + 1][positionPriseMultiple[1] - 1].pion = null;
                                                    plateau[positionPriseMultiple[0]][positionPriseMultiple[1]].pion = null;
                                                    afficherPlateau(plateau);    
                                                }
                                            }
                                            else{
                                                encoreUnePrisePossible = false;
                                                gererClicCase(case_x,case_y);
                                            } 
                                        }  
                                    } 
                                }
                            }
                        }
                    }    
                }
            }
        }
    }
}
plateauDiv.addEventListener("click", dameClic);
  



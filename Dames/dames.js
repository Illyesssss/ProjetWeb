const menuHamburger = document.querySelector(".menu-slide");	
const navLinks = document.querySelector(".nav-link");

menuHamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile-menu')
})

function damierclic(event) {
    var damier = document.getElementById('damier');
    var hauteur_damier = damier.offsetHeight;
    var largeur_damier = damier.offsetWidth;
    var hauteur_case = hauteur_damier / 10;
    var largeur_case = largeur_damier / 10;
    var rect = damier.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var case_x = Math.ceil(x / largeur_case);
    var lcase_x;
    switch(case_x){
    case 1:
        lcase_x = "A";
        break;
    case 2:
        lcase_x = "B";
        break;
    case 3:
        lcase_x = "C";
        break;
    case 4:
        lcase_x = "D";
        break;
    case 5:
        lcase_x = "E";
        break;
    case 6:
        lcase_x = "F";
        break;
    case 7:
        lcase_x = "G";
        break;
    case 8:
        lcase_x = "H";
        break;
    case 9:
        lcase_x = "I";
        break;
    case 10:
        lcase_x = "J";
        break;
    default:
        lcase_x = null;
    }
    var case_y = Math.ceil(y / hauteur_case);
    console.log("clic sur la case " + lcase_x + case_y);
}
const damier = document.getElementById('damier');
damier.addEventListener('click',damierclic);

var t_damier = [];
function initialiser() {
    var i;
    var j;
    for(i = 0;i < 10;i++){
        damier[i] = [];
        for(j = 0;j < 10;j++){
            if((i + j) % 2 == 0){
                damier[i][j] = -1; /*damier[i][j] = -1 sinifie case inactive et damier[i][j] = null signifie case inutile*/ 
            }
            else{
                damier[i][j] = null;
            }
        }
    }

    for(i = 0;i < 4;i++){
        for(j = 0;j < 10;j++){
            if((i + j) % 2 != 0){
                damier[i][j] = 1; /*damier[i][j] = 1 sinifie que la case contient un pion noir*/
            }
        }
    }

    for(i = 6;i < 10;i++){
        for(j = 0;j < 10;j++){
            if((i + j) % 2 != 0){
                damier[i][j] = 2; /*damier[i][j] = 2 sinifie que la case contient un pion blanc*/
            }
        }
    }
    affichedamier1();
}



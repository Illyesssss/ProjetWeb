const menuHamburger = document.querySelector(".menu-slide");	
const navLinks = document.querySelector(".nav-link");

menuHamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile-menu')
})

var lescases = document.getElementById("cases");
var formulaireparties = document.getElementById("parties");
var fossenoir = document.getElementById("fossejoueurA");
var fosseblanc = document.getElementById("fossejoueurB");
var pionchoisi = "null";
var ichoisi = -1;
var jchoisi = -1;
var tourjoueur = "blanc";
var deplacementpionchoisi = new Array();
swal("⭐⭐⭐Bienvenue!⭐⭐⭐"," Dans un jeu d'échecs les blancs et les noirs jouent à tour de rôle. Les Blancs jouent le premier coup de la partie. Pour plus de détails lisez les règles à droite.");
var stopTime = 3;
var bienvenue = document.getElementById('bienvenue');
bienvenue.currentTime = 0;
bienvenue.volume = 0.2;
bienvenue.play();
bienvenue.addEventListener('timeupdate', function() {
  if (this.currentTime > stopTime) {
    this.pause();
  }
}, false);

var caseblanche = "<div style=\"align-content: center; justify-content: center;\" id=\"";
var casenoir = "<div style=\"align-content: center; justify-content: center;\" id=\"";

var roinoir = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios-filled/75/000000/king.png\"/>";
var damenoir = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios-filled/75/000000/queen.png\"/>";
var founoir = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios-filled/75/000000/bishop.png\"/>";
var cavaliernoir = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios-filled/75/000000/knight.png\"/>";
var tournoir = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios-filled/75/000000/rook.png\"/>";
var pionnoir = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios-filled/75/000000/pawn.png\"/>";
var roiblanc = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios/75/000000/king.png\"/>";
var dameblanc = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios/75/000000/queen.png\"/>";
var foublanc = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios/75/000000/bishop.png\"/>";
var cavalierblanc = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios/75/000000/knight.png\"/>";
var tourblanc = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios/75/000000/rook.png\"/>";
var pionblanc = "<img class=\"imagepion\" src=\"https://img.icons8.com/ios/75/000000/pawn--v1.png\"/>";

var codecases = new Array();
var etatpartie;
var nompartie;
var pionfossenoir;
var pionfosseblanc;
var idpartie = -1;
var lesparties = new Array();

//remplissage cases à l'ouverture de la page
nouveletat();
for (var i = 0; i <4; i++) {
  for (var j = 0; j <4; j++) {
    var ligne = 8-i*2;
    var colonne = 65+j*2;
    var codeb = "case" + String.fromCharCode(colonne) + ligne.toString();
    var coden = "case" + String.fromCharCode(colonne+1) + ligne.toString();
    lescases.innerHTML += caseblanche + codeb + "\" onclick=\"deplacement(" + codeb + ")\"></div>";
    codecases.push(codeb);
    lescases.innerHTML += caseblanche + coden + "\" onclick=\"deplacement(" + coden + ")\"></div>";
    codecases.push(coden);
  }
  for (var j = 0; j <4; j++) {
    var ligne = 7-i*2;
    var colonne = 65+j*2;
    var codeb = "case" + String.fromCharCode(colonne) + ligne.toString();
    var coden = "case" + String.fromCharCode(colonne+1) + ligne.toString();
    lescases.innerHTML += caseblanche + codeb + "\" onclick=\"deplacement(" + codeb + ")\"></div>";
    codecases.push(codeb);
    lescases.innerHTML += caseblanche + coden + "\" onclick=\"deplacement(" + coden + ")\"></div>";
    codecases.push(coden);
  }
}

// Initialisation d'une partie
function nouvellepartie() {
  tourjoueur = "blanc";
  var d = new Date();
    nompartie = d.toDateString() + " " + d.toTimeString().substring(0,8);
    document.getElementById("menu2").innerHTML = "<input class=\"menu1\" type=\"text\" id=\"nomdelapartie\" placeholder=\"Nom de la partie\" required value=\"" + nompartie + "\"></input>";
    remplissagematrice();
    remplissagepion();
  idpartie += 1;
}

// Sauvegarde
function sauvegarde() {
  var formulairesauvegarde = document.getElementById("nomdelapartie");
  if (!formulairesauvegarde.checkValidity()) {
    alert(formulairesauvegarde.validationMessage);
  } else {
    if (idpartie>=0) {
      var nom = formulairesauvegarde.value;
      var unepartie = new Array(5);
      unepartie[0] = nom;
      unepartie[1] = etatpartie;
      unepartie[2] = tourjoueur;
      unepartie[3] = pionfossenoir;
      unepartie[4] = pionfosseblanc;
      lesparties.push(unepartie);
      var chaineserialize = JSON.stringify(lesparties);
      document.cookie = "lesparties=" + chaineserialize;
      miseajourform();
      swal("Succès!", "La partie a été sauvegardée sous le nom de " + nom, "success");
      var validation = document.getElementById('validation');
      validation.currentTime = 0;
      validation.volume = 0.2;
      validation.play();
      validation.addEventListener('timeupdate', function() {
        if (this.currentTime > stopTime) {
          this.pause();
        }
      }, false);
    } 
  }
}

// Charger partie
function miseajourform() {
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith('lesparties')).split('=')[1];
  var chainedeserialize = JSON.parse(cookieValue);
  formulaireparties.innerHTML = "";
  for(var i = 0; i<chainedeserialize.length; i++){
    formulaireparties.innerHTML += "<option value=\"" + chainedeserialize[i][0] + "\">" + chainedeserialize[i][0] + "</option>";
  }
}

function chargerpartie() {
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith('lesparties')).split('=')[1];
  var chainedeserialize = JSON.parse(cookieValue);
  lesparties = chainedeserialize;
  if (!formulaireparties.checkValidity()) {
    alert(formulaireparties.validationMessage);
  } else {
    if (idpartie>=0) {
      var nom = formulaireparties.value;
      for(var i = 0; i<lesparties.length; i++){
        if(lesparties[i][0]==nom){
          nompartie = lesparties[i][0];
          etatpartie = lesparties[i][1];
          tourjoueur = lesparties[i][2];
          pionfossenoir = lesparties[i][3];
          pionfosseblanc = lesparties[i][4];
          remplissagepion();
          swal("Succès!", nom + " a été chargée", "success");
          var validation = document.getElementById('validation');
          validation.currentTime = 0;
          validation.volume = 0.2;
          validation.play();
          validation.addEventListener('timeupdate', function() {
            if (this.currentTime > stopTime) {
              this.pause();
            }
          }, false);
          document.getElementById("menu2").innerHTML = "<input class=\"menu1\" type=\"text\" id=\"nomdelapartie\" placeholder=\"Nom de la partie\" required value=\"" + nompartie + "\"></input>";
        }
      }
    } 
  }
}

// Remplissage pions
function remplissagepion() {
  var balisedelacase;
  for (var i = 0; i < etatpartie.length; i++) {
    for (var j = 0; j < etatpartie[i].length; j++) {
      id = "case" + String.fromCharCode(65+j) + (i+1);
      balisedelacase  = document.getElementById(id);
      if (etatpartie[i][j] == "pionnoir") {
        balisedelacase.innerHTML = pionnoir;
      }
      if (etatpartie[i][j] == "pionblanc") {
        balisedelacase.innerHTML = pionblanc;
      }
      if (etatpartie[i][j] == "cavaliernoir") {
        balisedelacase.innerHTML = cavaliernoir;
      }
      if (etatpartie[i][j] == "cavalierblanc") {
        balisedelacase.innerHTML = cavalierblanc;
      }
      if (etatpartie[i][j] == "founoir") {
        balisedelacase.innerHTML = founoir;
      }
      if (etatpartie[i][j] == "foublanc") {
        balisedelacase.innerHTML = foublanc;
      }
      if (etatpartie[i][j] == "tournoir") {
        balisedelacase.innerHTML = tournoir;
      }
      if (etatpartie[i][j] == "tourblanc") {
        balisedelacase.innerHTML = tourblanc;
      }
      if (etatpartie[i][j] == "damenoir") {
        balisedelacase.innerHTML = damenoir;
      }
      if (etatpartie[i][j] == "dameblanc") {
        balisedelacase.innerHTML = dameblanc;
      }
      if (etatpartie[i][j] == "roinoir") {
        balisedelacase.innerHTML = roinoir;
      }
      if (etatpartie[i][j] == "roiblanc") {
        balisedelacase.innerHTML = roiblanc;
      }
      if (etatpartie[i][j] == "null") {
        balisedelacase.innerHTML = "";
      }
    }
  }
  var fossenoir = document.getElementById("fossejoueurA");
  var fosseblanc = document.getElementById("fossejoueurB");
  fossenoir.innerHTML = "";
  for (var i = 0; i < pionfossenoir.length ; i++) {
    if (pionfossenoir[i] == "pionnoir") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + pionnoir + "</div>";
    }
    if (pionfossenoir[i] == "pionblanc") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + pionblanc + "</div>";
    }
    if (pionfossenoir[i] == "cavaliernoir") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + cavaliernoir + "</div>";
    }
    if (pionfossenoir[i] == "cavalierblanc") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + cavalierblanc + "</div>";
    }
    if (pionfossenoir[i] == "founoir") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + founoir + "</div>";
    }
    if (pionfossenoir[i] == "foublanc") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + foublanc + "</div>";
    }
    if (pionfossenoir[i] == "tournoir") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + tournoir + "</div>";
    }
    if (pionfossenoir[i] == "tourblanc") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + tourblanc + "</div>";
    }
    if (pionfossenoir[i] == "damenoir") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + damenoir + "</div>";
    }
    if (pionfossenoir[i] == "dameblanc") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + dameblanc + "</div>";
    }
    if (pionfossenoir[i] == "roinoir") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + roinoir + "</div>";
    }
    if (pionfossenoir[i] == "roiblanc") {
      fossenoir.innerHTML += "<div class=\"pionfosseA\">" + roiblanc + "</div>";
    }
    if (pionfossenoir[i] == "null") {
      fossenoir.innerHTML += "";
    }
  }
  fosseblanc.innerHTML = "";
  for (var i = 0; i < pionfosseblanc.length ; i++) {
    if (pionfosseblanc[i] == "pionnoir") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + pionnoir + "</div>";
    }
    if (pionfosseblanc[i] == "pionblanc") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + pionblanc + "</div>";
    }
    if (pionfosseblanc[i] == "cavaliernoir") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + cavaliernoir + "</div>";
    }
    if (pionfosseblanc[i] == "cavalierblanc") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + cavalierblanc + "</div>";
    }
    if (pionfosseblanc[i] == "founoir") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + founoir + "</div>";
    }
    if (pionfosseblanc[i] == "foublanc") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + foublanc + "</div>";
    }
    if (pionfosseblanc[i] == "tournoir") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + tournoir + "</div>";
    }
    if (pionfosseblanc[i] == "tourblanc") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + tourblanc + "</div>";
    }
    if (pionfosseblanc[i] == "damenoir") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + damenoir + "</div>";
    }
    if (pionfosseblanc[i] == "dameblanc") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + dameblanc + "</div>";
    }
    if (pionfosseblanc[i] == "roinoir") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + roinoir + "</div>";
    }
    if (pionfosseblanc[i] == "roiblanc") {
      fosseblanc.innerHTML += "<div class=\"pionfosseB\">" + roiblanc + "</div>";
    }
    if (pionfosseblanc[i] == "null") {
      fosseblanc.innerHTML += "";
    }
  }
}

function remplissagematrice() {
  nouveletat();
    for (var i=0; i<8; i++) {
      etatpartie[7-1][i] = "pionnoir";
      etatpartie[2-1][i] = "pionblanc";
    }
    etatpartie[8-1][0] = "tournoir";
    etatpartie[8-1][7] = "tournoir";
    etatpartie[1-1][0] = "tourblanc";
    etatpartie[1-1][7] = "tourblanc";

    etatpartie[8-1][1] = "cavaliernoir";
    etatpartie[8-1][6] = "cavaliernoir";
    etatpartie[1-1][1] = "cavalierblanc";
    etatpartie[1-1][6] = "cavalierblanc";
  
    etatpartie[8-1][2] = "founoir";
    etatpartie[8-1][5] = "founoir";
    etatpartie[1-1][2] = "foublanc";
    etatpartie[1-1][5] = "foublanc";
  
    etatpartie[8-1][3] = "damenoir";
    etatpartie[8-1][4] = "roinoir";
    etatpartie[1-1][3] = "dameblanc";
    etatpartie[1-1][4] = "roiblanc";
}

// Initialisation de l'état de la partie
function nouveletat() {
  etatpartie = new Array(8);
  for (var i = 0; i < etatpartie.length; i++)
  {
    etatpartie[i] = new Array(8);
    for (var j = 0; j < etatpartie[i].length; j++) {
      etatpartie[i][j] = "null";
    }
  }
  pionfossenoir = new Array(16);
  pionfosseblanc = new Array(16);
}

// Proposition de jeu
function deplacement(code) {
  var id = code.id;
  var j = id.charCodeAt(4)-65;
  var i = id.charCodeAt(5)-49;
  if(etatpartie[i][j]!="null" && pionchoisi=="null") {
    var str = etatpartie[i][j];
    if (str.substr(str.length - 4) == tourjoueur) {
      pionchoisi = etatpartie[i][j];
      ichoisi = i;
      jchoisi = j;
      deplacementpionchoisi = calculdeplacement(i,j,etatpartie[i][j]);
      for (const element of deplacementpionchoisi) {
        colorier(element);
      }
    }
  } 
  else if(etatpartie[i][j]!="null" && pionchoisi!="null") {
    var str = etatpartie[i][j];
    if (str.substr(str.length - 4) == tourjoueur) {
      remplissagepion();
      pionchoisi = etatpartie[i][j];
      ichoisi = i;
      jchoisi = j;
      deplacementpionchoisi = calculdeplacement(i,j,etatpartie[i][j]);
      for (const element of deplacementpionchoisi) {
        colorier(element);
      }
    }
    else
    {
      for (const element of deplacementpionchoisi) {
        if (i==element.i && j==element.j) {
          if (tourjoueur == "blanc" && pionchoisi == "pionblanc" && i==7) {
            for (var k = 0; k < pionfossenoir.length; k++) {
              if (pionfossenoir[k] == "dameblanc") {
                pionfossenoir[k] = pionchoisi;
                pionchoisi = "dameblanc";
              }
            }
          }
          else if (tourjoueur == "noir" && pionchoisi == "pionnoir" && i==0) {
            for (var k = 0; k < pionfosseblanc.length; k++) {
              if (pionfosseblanc[k] == "damenoir") {
                pionfosseblanc[k] = pionchoisi;
                pionchoisi = "damenoir";
              }
            }
          }
          etatpartie[i][j] = pionchoisi;
          etatpartie[ichoisi][jchoisi] = "null";
          if (tourjoueur == "blanc") {
            tourjoueur = "noir";
            pionfosseblanc.push(str);
          }
          else
          {
            tourjoueur = "blanc";
            pionfossenoir.push(str);
          }
          remplissagepion();
          pionchoisi = "null";
          ichoisi = -1;
          jchoisi = -1;
        }
      }
      gameover(str);
    }  
  } 
  else if(etatpartie[i][j]=="null" && pionchoisi!="null") {
    for (const element of deplacementpionchoisi) {
      if (i==element.i && j==element.j) {
        if (tourjoueur == "blanc" && pionchoisi == "pionblanc" && i==7) {
          for (var k = 0; k < pionfossenoir.length; k++) {
            if (pionfossenoir[k] == "dameblanc") {
              pionfossenoir[k] = pionchoisi;
              pionchoisi = "dameblanc";
            }
          }
        }
        else if (tourjoueur == "noir" && pionchoisi == "pionnoir" && i==0) {
          for (var k = 0; k < pionfosseblanc.length; k++) {
            if (pionfosseblanc[k] == "damenoir") {
              pionfosseblanc[k] = pionchoisi;
              pionchoisi = "damenoir";
            }
          }
        }
        etatpartie[i][j] = pionchoisi;
        etatpartie[ichoisi][jchoisi] = "null";
        var str = etatpartie[i][j];
        if (str.substr(str.length - 4) == "noir") {
          tourjoueur = "blanc";
        }
        else
        {
          tourjoueur = "noir";
        }
      }
    }
    remplissagepion();
    pionchoisi = "null";
  }
}

function gameover(pion) {
  if (pion == "roiblanc") {
    swal("Félicitations!", "Les noirs ont gagné", "success");
    nouvellepartie();
    tourjoueur = "blanc";
    var stopTime = 5;
    var victoire1 = document.getElementById('victoire1');
    victoire1.currentTime = 0;
    victoire1.play();
    victoire1.addEventListener('timeupdate', function() {
      if (this.currentTime > stopTime) {
        this.pause();
      }
    }, false);
    var victoire2 = document.getElementById('victoire2');
    victoire2.currentTime = 0;
    victoire2.play();
    victoire2.addEventListener('timeupdate', function() {
      if (this.currentTime > stopTime) {
        this.pause();
      }
    }, false);
    var victoire3 = document.getElementById('victoire3');
    victoire3.currentTime = 0;
    victoire3.play();
    victoire3.addEventListener('timeupdate', function() {
      if (this.currentTime > stopTime) {
        this.pause();
      }
    }, false);
  }
  if (pion == "roinoir") {
    swal("Félicitations!", "Les blancs ont gagné", "success");
    nouvellepartie();
    tourjoueur = "blanc";
    var stopTime = 5;
    var victoire1 = document.getElementById('victoire1');
    victoire1.currentTime = 0;
    victoire1.play();
    victoire1.addEventListener('timeupdate', function() {
      if (this.currentTime > stopTime) {
        this.pause();
      }
    }, false);
    var victoire2 = document.getElementById('victoire2');
    victoire2.currentTime = 0;
    victoire2.play();
    victoire2.addEventListener('timeupdate', function() {
      if (this.currentTime > stopTime) {
        this.pause();
      }
    }, false);
    var victoire3 = document.getElementById('victoire3');
    victoire3.currentTime = 0;
    victoire3.play();
    victoire3.addEventListener('timeupdate', function() {
      if (this.currentTime > stopTime) {
        this.pause();
      }
    }, false);
  }
}

function colorier(element) {
  var balise;
  var id;
  id = "case" + String.fromCharCode(65+element.j) + (element.i+1);
  balise = document.getElementById(id);
  balise.innerHTML += "<div id=\"cercle\"></div>";
}

function calculdeplacement(i,j,pion) {
  switch(pion) {
    case 'pionnoir':
      return calculdeplacementpionnoir(i,j);
    case 'pionblanc':
      return calculdeplacementpionblanc(i,j);
    case 'tournoir':
      return calculdeplacementtour(i,j);
    case 'tourblanc':
      return calculdeplacementtour(i,j);
    case 'cavaliernoir':
      return calculdeplacementcavalier(i,j);
    case 'cavalierblanc':
      return calculdeplacementcavalier(i,j);
    case 'founoir':
      return calculdeplacementfou(i,j);
    case 'foublanc':
      return calculdeplacementfou(i,j);
    case 'damenoir':
      return calculdeplacementdame(i,j);
    case 'dameblanc':
      return calculdeplacementdame(i,j);
    case 'roinoir':
      return calculdeplacementroi(i,j);
    case 'roiblanc':
      return calculdeplacementroi(i,j);
  }
}

function calculdeplacementpionnoir(i,j) {
  var deplacements = new Array();
  var elem;
  if (i!=0 && etatpartie[i-1][j] == "null") {
    elem = {i: i-1, j: j};
    deplacements.push(elem);
  }
  if (i==6 && etatpartie[i-1][j] == "null" && etatpartie[i-2][j] == "null") {
    elem = {i: i-2, j: j};
    deplacements.push(elem);
  }
  if (j!=0) {
    var str = etatpartie[i-1][j-1];
    if (str.substr(str.length - 4) == "blanc") {
      elem = {i: i-1, j: j-1};
      deplacements.push(elem);
    }
  }
  if (j!=7) {
    str = etatpartie[i-1][j+1];
    if (str.substr(str.length - 4) == "blanc") {
      elem = {i: i-1, j: j+1};
      deplacements.push(elem);
    }
  }
  return deplacements;
}

function calculdeplacementpionblanc(i,j) {
  var deplacements = new Array();
  var elem;
  if (i==1 && etatpartie[i+1][j] == "null" && etatpartie[i+2][j] == "null") {
    elem = {i: i+2, j: j};
    deplacements.push(elem);
  }
  if (i!=7 && etatpartie[i+1][j] == "null") {
    elem = {i: i+1, j: j};
    deplacements.push(elem);
  }
  if (j!=0) {
    var str = etatpartie[i+1][j-1];
    if (str.substr(str.length - 4) == "noir") {
      elem = {i: i+1, j: j-1};
      deplacements.push(elem);
    }
  }
  if (j!=7) {
    str = etatpartie[i+1][j+1];
    if (str.substr(str.length - 4) == "noir") {
      elem = {i: i+1, j: j+1};
      deplacements.push(elem);
    }
  }
  return deplacements;
}

function calculdeplacementtour(i,j) {
  var deplacements = new Array();
  var elem;
  for (var k = j+1; k <= 7; k++) {
    if (etatpartie[i][k] == "null") {
      elem = {i: i, j: k};
      deplacements.push(elem);
    } else {
      str1 = etatpartie[i][j];
      str2 = etatpartie[i][k];
      if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
        elem = {i: i, j: k};
        deplacements.push(elem);
      }
      break;
    }
  }
  for (var k = j-1; k >= 0; k--) {
    if (etatpartie[i][k] == "null") {
      elem = {i: i, j: k};
      deplacements.push(elem);
    } else {
      str1 = etatpartie[i][j];
      str2 = etatpartie[i][k];
      if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
        elem = {i: i, j: k};
        deplacements.push(elem);
      }
      break;
    }
  }
  for (var k = i+1; k <= 7; k++) {
    if (etatpartie[k][j] == "null") {
      elem = {i: k, j: j};
      deplacements.push(elem);
    } else {
      str1 = etatpartie[i][j];
      str2 = etatpartie[k][j];
      if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
        elem = {i: k, j: j};
        deplacements.push(elem);
      }
      break;
    }
  }
  for (var k = i-1; k >= 0; k--) {
    if (etatpartie[k][j] == "null") {
      elem = {i: k, j: j};
      deplacements.push(elem);
    } else {
      str1 = etatpartie[i][j];
      str2 = etatpartie[k][j];
      if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
        elem = {i: k, j: j};
        deplacements.push(elem);
      }
      break;
    }
  }
  return deplacements;
}

function calculdeplacementcavalier(i,j) {
  var deplacements = new Array();
  var deplace = [-2,-1,1,2];
  for (var m = 0; m < deplace.length; m++) {
    for (var n = 0; n < deplace.length; n++) {
      var k = i+deplace[m];
      var l = j+deplace[n];
      if (Math.abs(deplace[m])!=Math.abs(deplace[n])) {
        if (k>=0 && k<=7 && l>=0 && l<=7) {
          if (etatpartie[k][l] == "null") {
            elem = {i: k, j: l};
            deplacements.push(elem);
          } else {
            str1 = etatpartie[i][j];
            str2 = etatpartie[k][l];
            if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
              elem = {i: k, j: l};
              deplacements.push(elem);
            }
          }
        }
      }
    }
  }
  return deplacements;
}

function calculdeplacementfou(i,j) {
  var deplacements = new Array();
  var elem;
  var k,l;
  for (k = i+1, l = j+1; k <= 7 && l<=7; k++, l++) {
    if (etatpartie[k][l] == "null") {
      elem = {i: k, j: l};
      deplacements.push(elem);
    } else {
      str1 = etatpartie[i][j];
      str2 = etatpartie[k][l];
      if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
        elem = {i: k, j: l};
        deplacements.push(elem);
      }
      break;
    }
  }
  for (k = i-1, l = j-1; k >= 0 && l>=0; k--, l--) {
    if (etatpartie[k][l] == "null") {
      elem = {i: k, j: l};
      deplacements.push(elem);
    } else {
      str1 = etatpartie[i][j];
      str2 = etatpartie[k][l];
      if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
        elem = {i: k, j: l};
        deplacements.push(elem);
      }
      break;
    }
  }
  for (k = i+1, l = j-1; k <= 7 && l>=0; k++, l--) {
    if (etatpartie[k][l] == "null") {
      elem = {i: k, j: l};
      deplacements.push(elem);
    } else {
      str1 = etatpartie[i][j];
      str2 = etatpartie[k][l];
      if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
        elem = {i: k, j: l};
        deplacements.push(elem);
      }
      break;
    }
  }
  for (k = i-1, l = j+1; k >= 0 && l<=7; k--, l++) {
    if (etatpartie[k][l] == "null") {
      elem = {i: k, j: l};
      deplacements.push(elem);
    } else {
      str1 = etatpartie[i][j];
      str2 = etatpartie[k][l];
      if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
        elem = {i: k, j: l};
        deplacements.push(elem);
      }
      break;
    }
  }
  return deplacements;
}

function calculdeplacementdame(i,j) {
  fou = calculdeplacementfou(i,j);
  tour = calculdeplacementtour(i,j);
  var deplacements = new Array();
  deplacements = fou.concat(tour);
  return deplacements;
}

function calculdeplacementroi(i,j) {
  var deplacements = new Array();
  var deplace = [-1,0,1];
  for (var m = 0; m < deplace.length; m++) {
    for (var n = 0; n < deplace.length; n++) {
      var k = i+deplace[m];
      var l = j+deplace[n];
      if (k>=0 && k<=7 && l>=0 && l<=7) {
        if (etatpartie[k][l] == "null") {
          elem = {i: k, j: l};
          deplacements.push(elem);
        } else {
          str1 = etatpartie[i][j];
          str2 = etatpartie[k][l];
          if (str1.substr(str1.length - 4) != str2.substr(str2.length - 4)) {
            elem = {i: k, j: l};
            deplacements.push(elem);
          }
        }
      }
    }
  }
  /*var deplacementadverse = new Array();
  for (var i = 0; i < etatpartie.length; i++) {
    for (var j = 0; j < etatpartie[i].length; j++) {
      str = etatpartie[i][j];
      if (str.substr(str.length - 4) == tourjoueur) {
        deplacementadverse.concat(calculdeplacement(i,j,str));
      }
    }
  }
  var retour = new Array();
  var x = new Boolean(true);
  for (const elementd of deplacements) {
    for (const elementadv of deplacementadverse) {
      if(elementd.i == elementadv.i && elementd.j == elementadv.j) {
        x = new Boolean(false);
      }
    }
    if(x == true){
      retour.push(elementd);
    } else {
      x = new Boolean(true);
    }
  }*/
  return deplacements;
}
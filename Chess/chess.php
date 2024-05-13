<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">

    <title>PlayNation</title>
    <link rel="stylesheet" href="chess.css">
    <link rel="Icone2" href="../images/logo.png">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <audio id="bienvenue" src="https://lasonotheque.org/UPLOAD/mp3/0433.mp3"></audio>
    <audio id="validation" src="https://lasonotheque.org/UPLOAD/mp3/1111.mp3"></audio>
    <audio id="victoire1" src="https://lasonotheque.org/UPLOAD/mp3/0812.mp3"></audio>
    <audio id="victoire2" src="https://lasonotheque.org/UPLOAD/mp3/0237.mp3"></audio>
    <audio id="victoire3" src="https://lasonotheque.org/UPLOAD/mp3/0831.mp3"></audio>

  </head>
  <body>
    <nav class="navbar">
      <a href="../Main/main.php"><img src="../images/logo.png" class="logo" alt="PlayNation" width="125"></img></a>
      <a href="../Main/main.php" class="liens_menu">Home</a>
      <a href="../Forum/forum.php" class="liens_menu">Forum</a>
      <a href="../Contact/contact.php" class="liens_menu">Contact</a>
      <a href="../Connexion/connexion.php" class="liens_menu connexion">Se connecter</a>
      <div class="nav-link">
      	<ul>
      	  <li><a href="chess.php"><img src="../images/chess.png" alt="Echec" class="chess" width="150"></a></li><br>
      	  <li><a href="../Dames/dames.php"><img src="../images/dames.png" alt="Dames" class="dames" width="150"></a></li><br>
      	  <li><a href="../Morpion/morpion.php"><img src="../images/morpion.png" alt="Morpion" class="morpion" width="150"></a></li><br>
      	</ul>
      </div>
      <img src="../images/menu-btn.png" alt="Menu slide" class="menu-slide">
    </nav>
    <div class="container">
      <div class="jeu">
				<div id="fossejoueurA">      
				</div>
				<div class="plateau ">
	  			<div class="lettrehaut">
	    			<div class="lettre">A</div>
					  <div class="lettre">B</div>
					  <div class="lettre">C</div>
					  <div class="lettre">D</div>
					  <div class="lettre">E</div>
					  <div class="lettre">F</div>
					  <div class="lettre">G</div>
					  <div class="lettre">H</div>
	  			</div>
	  		<div class="milieu">
	    		<div class="chiffregauche">
			      <div class="chiffre">1</div>
			      <div class="chiffre">2</div>
			      <div class="chiffre">3</div>
			      <div class="chiffre">4</div>
			      <div class="chiffre">5</div>
			      <div class="chiffre">6</div>
			      <div class="chiffre">7</div>
			      <div class="chiffre">8</div>
	    		</div>
	    		<div id="cases">
	    		</div>
	    		<div class="chiffredroit">
	      		<div class="chiffre">1</div>
			      <div class="chiffre">2</div>
			      <div class="chiffre">3</div>
			      <div class="chiffre">4</div>
			      <div class="chiffre">5</div>
			      <div class="chiffre">6</div>
			      <div class="chiffre">7</div>
			      <div class="chiffre">8</div>
	    		</div>
	  		</div>
	  		<div class="lettrebas">
			    <div class="lettre">A</div>
			    <div class="lettre">B</div>
			    <div class="lettre">C</div>
			    <div class="lettre">D</div>
			    <div class="lettre">E</div>
			    <div class="lettre">F</div>
			    <div class="lettre">G</div>
			    <div class="lettre">H</div>
	  		</div>
			</div>
			<div id="fossejoueurB">
			</div>
		</div>
    <div class="menu">
			<h1 class="w3-myfont"><i class="fa fa-home"></i>Chess Game</h1>
			<div class="menujeu">
	  		<button class="w3-button w3-light-green w3-hover-white" onclick="nouvellepartie()">Commencer une nouvelle partie</button>
        <div>
	    		<select class="menu1" name="partie" id="parties">
          </select>
	  		</div>
	  		<button class="w3-button w3-light-green w3-hover-white" type="submit" onclick="chargerpartie()">Charger une partie</button>
        <div id="menu2">
          <input  class="menu1" type="text" id="nomdelapartie" placeholder="Nom de la partie" required></input>
	  		</div>
	  		<button class="w3-button w3-light-green w3-hover-white"  onclick="sauvegarde()">Sauvegarder la partie</button>
				</div>
      </div>
    </div>	
  </body>
  <script src="chess.js"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</html>



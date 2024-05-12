<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>PlayNation</title>
    <link rel="stylesheet" href="morpion.css">
    <link rel="Icone" href="../images/logo.png">
  </head>
  <body>
    <nav class="navbar">
      <a href="../Main/main.php"><img src="../images/logo.png" class="logo" alt="PlayNation" width="125"></a>
      <a href="../Main/main.php" class="liens_menu">Home</a>
      <a href="../Forum/forum.php" class="liens_menu">Forum</a>
      <a href="../Contact/contact.php" class="liens_menu">Contact</a>
      <a href="../Connexion/connexion.php" class="liens_menu connexion">Se connecter</a>
      <div class="nav-link">
      	<ul>
      	  <li><a href="../Chess/chess.php"><img src="../images/chess.png" alt="Echec" class="chess" width="150"></a></li><br>
      	  <li><a href="../Dames/dames.php"><img src="../images/dames.png" alt="Dames" class="dames" width="150"></a></li><br>
      	  <li><a href="morpion.php"><img src="../images/morpion.png" alt="Morpion" class="morpion" width="150"></a></li><br>
      	</ul>
      </div>
      <img src="../images/menu-btn.png" alt="Menu slide" class="menu-slide">
    </nav>
    <div id="quadrillage-box">
      <img id="quadrillage" src="../images/quadrillage_violet.png" alt="Quadrillage du jeu de morpion" >
    </div>
  </body>
  <script src="morpion.js"></script>
</html>

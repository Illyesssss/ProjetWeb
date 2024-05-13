<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>PlayNation</title>
    <link rel="stylesheet" href="main.css">
    <link rel="Icone" href="../images/logo.png">
  </head>
  <body>
    <?php 
      session_start();
      if(isset($_POST['pseudo_connexion'], $_POST['mdp_connexion'])){
        var_dump($pseudo_connex);
        $pseudo_connex = $_POST['pseudo_connexion'];
        $mdp_connex = $_POST['mdp_connexion'];

        include '../BDD/connex.inc.php';
        $pdo = connexion('../BDD/arman.sqlite');

        try{
          $stmt = $pdo->prepare('SELECT * FROM informations_user WHERE pseudo=:pseudo_connexion');
          $stmt->bindParam(':pseudo_connexion', $pseudo_connex);
          $stmt->execute(); 
          $user = $stmt->fetch(PDO::FETCH_ASSOC);

          $coonecte = 0;

          if($user['pseudo'] == $pseudo_connex){
            if(password_verify($mdp_connex, $user['mdp'])){
              $_SESSION['pseudo'] = $pseudo_connex;
              echo "<script>alert('Connexion réussie')</script>";
              $connecte = 1;
            }
            else{
              echo "<script>alert('Le mot de passe est incorrect')</script>";
            }
          }
          if($connecte == 0){
            echo "<script>alert('Le nom d\'utilisateur n\'existe pas')</script>";
          }

          $stmt->closeCursor();
          $pdo = null;
        }catch(PDOException $e){
          echo $e->getMessage();
          echo "<p> Erreur BDD </p>";
        }
      }
    ?>


    <nav class="navbar">
      <a href="main.php"><img src="../images/logo.png" class="logo" alt="PlayNation" width="125"></img></a>
      <a href="main.php" class="liens_menu">Home</a>
      <a href="../Forum/forum.php" class="liens_menu">Forum</a>
      <a href="../Contact/contact.php" class="liens_menu">Contact</a>
      <!--<a href="../Param/parametre.php"><img src="../images/ecrou.png" class="image" alt="ecrou_parametre" width="40"></img></a>-->
      <a href="../Connexion/connexion.php" class="liens_menu connexion">Se connecter</a>
      <div class="nav-link">
      	<ul>
      	  <li><a href="../Chess/chess.php"><img src="../images/chess.png" alt="Echec" class="chess" width="175"></a></li><br>
      	  <li><a href="../Dames/dames.php"><img src="../images/dames.png" alt="Dames" class="dames" width="175"></a></li><br>
      	  <li><a href="../Morpion/morpion.php"><img src="../images/morpion.png" alt="Morpion" class="morpion" width="175"></a></li><br>
      	</ul>
      </div>
      <img src="../images/menu-btn.png" alt="Menu slide" class="menu-slide">
    </nav>
    <p> &copy; </p>
  </body>
  <script src="main.js"></script>
</html>

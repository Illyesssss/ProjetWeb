<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <link rel="stylesheet" href="connexion.css">
  </head>
  <body>
	<?php 
		include '../BDD/connex.inc.php';
		$pdo = connexion('../BDD/arman.sqlite');
		if(isset($_POST['mail'], $_POST['pseudo_inscription'], $_POST['mdp_inscription'], $_POST['mdp_inscription_confirmer'])){
			$mail = $_POST['mail'];
			$pseudo = $_POST['pseudo_inscription'];
			$mdp = $_POST['mdp_inscription']; 
			$mdp_conf = $_POST['mdp_inscription_confirmer'];
		
			if($mdp != $mdp_conf){
				echo "<script>alert('les mots de passe sont differents')</script>";
			} else {
				$mdp_hash = password_hash($mdp, PASSWORD_DEFAULT);
				try{
					$stmt = $pdo->prepare('INSERT INTO informations_user (id, pseudo, mail, mdp) VALUES (NULL, :pseudo_inscription, :mail, :mdp_inscription)');
					$stmt->bindParam(':pseudo_inscription', $pseudo);
					$stmt->bindParam(':mail', $mail);
					$stmt->bindParam(':mdp_inscription', $mdp_hash);
		
					$stmt->execute();
				} catch(PDOException $e){
					echo $e->getMessage();
					echo "<p> Erreur BDD </p>";
				}
			}
		}
	?>
	<nav class="navbar">
		<a href="../Main/main.php"><img src="../images/logo.png" class="logo" alt="PlayNation" width="125"></a>
	</nav>
    <div class="connex">
      <form action="../Main/main.php" method="post">
		<h1>Connectez-vous</h1>
	    <div class="box">
	      <input type="text" placeholder="Pseudo" maxlength="50" class="boxbox" name="pseudo_connexion" required>  <img src="../images/login.png" alt="image_login" width="15">
	    </div>
	    <div class="box">
	      <input type="password" placeholder="Mot de passe" maxlength="50" class="boxbox" name="mdp_connexion" required>  <img src="../images/cadenas.png" alt="image_cadenas" width="15">
	    </div>
	    <div class="rappel_oubli">
	      <label><input type="checkbox">Se souvenir de moi</label>
	      <a href="#">Mot de passe oublié</a>
	    </div>
	    <div class="se_connecter">
	      <button type="submit" class="boutton_connexion">Se Connecter</button>
	    </div>
	    <div class="creer_compte">
	      <p>Vous n'avez pas de compte ? <a href="../Inscription/inscription.php">Créer un compte</a></p>
	    </div>
	  </form>
    </div>
  </body>
</html>
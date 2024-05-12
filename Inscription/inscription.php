<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <link rel="stylesheet" href="inscription.css">
  </head>
  <body>
    <nav class="navbar">
      <a href="../Main/main.php"><img src="../images/logo.png" class="logo" alt="PlayNation" width="125"></a>
    </nav>
    <div class="connex">
      <form action="../Connexion/connexion.php" method="post">
	      <h1>Créer votre compte</h1>
        <div class="box">
          <input type="email" placeholder="Adresse email" maxlength="50" class="boxbox" name="mail" required> <img src="../images/mail.png" alt="logo_mail" width="15">
	      </div>
        <div class="box">
          <input type="text" placeholder="Pseudo" maxlength="50" class="boxbox" name="pseudo_inscription" required>  <img src="../images/login.png" alt="image_login" width="15">
        </div>
        <div class="box">
          <input type="password" id="password" placeholder="Mot de passe" maxlength="50" class="boxbox" name="mdp_inscription" required> 
        </div>
        <div class="box">
          <input type="password" id="password_confirm" placeholder="Confirmez le mot de passe" maxlength="50" class="boxbox" name="mdp_inscription_confirmer" required>  
        </div>
        <div class="s_inscrire">
          <button type="submit" class="boutton_inscription">S'inscrire</button>
        </div>
        <div class="retour_creer">
          <p>Vous avez déjà un compte ? <a href="../Connexion/connexion.php">Se connecter</a></p>
        </div>
      </form>
    </div>
  </body>
</html>

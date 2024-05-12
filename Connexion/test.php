<?php 
include '../BDD/connex.inc.php';
$pdo = connexion('../BDD/arman.sqlite');
if(isset($_POST['mail'], $_POST['pseudo_inscription'], $_POST['mdp_inscription'], $_POST['mdp_inscription_confirmer'])){
    $mail = $_POST['mail'];
    $pseudo = $_POST['pseudo_inscription'];
    $mdp = $_POST['mdp_inscription']; 
    $mdp_conf = $_POST['mdp_inscription_confirmer'];

    if($mdp != $mdp_conf){
        echo "mdp diff";
    } else {
        $mdp_hash = password_hash($mdp, PASSWORD_DEFAULT);
        try{
            $stmt = $pdo->prepare('INSERT INTO informations_user (id, pseudo, mail, mdp) VALUES (NULL, :pseudo_inscription, :mail, :mdp_inscription)');
            $stmt->bindParam(':pseudo_inscription', $pseudo);
            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':mdp_inscription', $mdp_hash);

            $stmt->execute();
            echo "Utilisateur inséré avec succès!";
        } catch(PDOException $e){
            echo $e->getMessage();
            echo "<p> Erreur BDD </p>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registeren</title>

    <link rel="icon" href="./pictures/crossbow.png">
    
    <link rel="stylesheet/less" type="text/css" href="styles/main.less" />
    <link rel="stylesheet/less" type="text/css" href="styles/forms.less" />
    <script src="https://cdn.jsdelivr.net/npm/less@4" ></script>
</head>

<body>
    <?php echo file_get_contents('./elements/navbar.html') ?>

    <div class="main">
        <div class="loginForm" id="registerForm">
            <h1>Registreren</h1>
            <form method="post">

              <div class="txt_field">
                <input type="text" required>
                <span></span>
                <label>Gebruikersnaam</label>
              </div>

              <div class="txt_field">
                <input type="text" required>
                <span></span>
                <label>Email</label>
              </div>

              <div class="txt_field">
                <input type="password" required>
                <span></span>
                <label>Wachtwoord</label>
              </div>

              <input type="submit" value="Login">
              <div class="signup_link">
                Al wel een account? <a href="./login.php">Inloggen</a>
              </div>
            </form>
          </div>
    </div>
</body>
</html>
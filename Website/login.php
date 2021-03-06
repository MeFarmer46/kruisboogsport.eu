<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inloggen</title>

    <link rel="icon" href="./pictures/crossbow.png">
    
    <link rel="stylesheet/less" type="text/css" href="styles/main.less" />
    <link rel="stylesheet/less" type="text/css" href="styles/forms.less" />
    <script src="https://cdn.jsdelivr.net/npm/less@4" ></script>
    <script src="js/login.js" defer></script>
    <script src="./js/main.js" defer></script>
</head>

<body>
    <?php echo file_get_contents('./elements/navbar.html') ?>

    <div class="main">
        <div class="loginForm" id="loginForm">
            <h1>Inloggen</h1>
            <form method="post">
              <div class="txt_field">
                <input type="text" id="email" required>
                <span></span>
                <label>Emailadres</label>
              </div>
              <div class="txt_field">
                <input type="password" id="password" required>
                <span></span>
                <label>Wachtwoord</label>
              </div>
              <p style="color:red;" id="errormsg"></p>
              <div class="pass">Wachtwoord vergeten?</div>
              <input type="submit" value="Login">
              <div class="signup_link">
                Nog geen account? <a href="./register.php">Registeren</a>
              </div>
            </form>
          </div>
    </div>
</body>
</html>
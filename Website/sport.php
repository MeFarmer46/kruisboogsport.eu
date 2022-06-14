<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>De sport</title>

    <link rel="icon" href="./pictures/crossbow.png">
    
    <link rel="stylesheet/less" type="text/css" href="styles/main.less" />
    <link rel="stylesheet/less" type="text/css" href="styles/content.less" />
    <script src="https://cdn.jsdelivr.net/npm/less@4" ></script>
    <script src="js/fetch.js" defer></script>
</head>

<body>
    <?php echo file_get_contents('./elements/navbar.html') ?>

    <div class="main">

        <div class="contentBlock">
            <h1>Disciplines N.K.B.</h1>
            <hr>
            <p><?php echo file_get_contents('./elements/content/sport/disciplines.txt'); ?></p>
        </div>

    </div>
</body>
</html>
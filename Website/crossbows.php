<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soorten kruisbogen</title>

    <link rel="icon" href="./pictures/crossbow.png">
    
    <link rel="stylesheet/less" type="text/css" href="styles/main.less" />
    <link rel="stylesheet/less" type="text/css" href="styles/content.less" />
    <script src="https://cdn.jsdelivr.net/npm/less@4" ></script>
    <script src="https://kit.fontawesome.com/b7eaa74f9d.js" crossorigin="anonymous"></script>
</head>

<body>
    <?php echo file_get_contents('./elements/navbar.html') ?>
    <div class="main" style="padding: 1%;">

        <div class="contentBlock">
            <h1>De steenboog</h1>
            <hr>
            <p><?php echo file_get_contents('./elements/content/crossbows/steenboog.txt'); ?></p>
        </div>

        <div class="contentBlock">
            <h1>De kogelkruisboog</h1>
            <hr>
            <p><?php echo file_get_contents('./elements/content/crossbows/kogelkruisboog.txt'); ?></p>
        </div>

        <div class="contentBlock">
            <h1>De balkruisboog</h1>
            <hr>
            <p><?php echo file_get_contents('./elements/content/crossbows/balkruisboog.txt'); ?></p>
        </div>

        <div class="contentBlock">
            <h1>De Chinese repeteerkruisboog</h1>
            <hr>
            <p><?php echo file_get_contents('./elements/content/crossbows/repeteerboog.txt'); ?></p>
        </div>

    </div>
</body>
</html>
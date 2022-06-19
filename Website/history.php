<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geschiedenis</title>

    <link rel="icon" href="./pictures/crossbow.png">
    
    <link rel="stylesheet/less" type="text/css" href="styles/main.less" />
    <link rel="stylesheet/less" type="text/css" href="styles/content.less" />
    <script src="https://cdn.jsdelivr.net/npm/less@4" ></script>
    <script src="./js/main.js" defer></script>
</head>

<body>
    <?php echo file_get_contents('./elements/navbar.html') ?>

    <div class="main">

        <div class="contentBlock">
            <h1>De kruisboog</h1>
            <hr>
            <p><?php echo file_get_contents('./elements/content/history/de_kruisboog.txt'); ?></p>
        </div>

        <div class="contentBlock">
            <h1>Wilhelm Tell</h1>
            <hr>
            <p><?php echo file_get_contents('./elements/content/history/wilhelm_tell.txt'); ?></p>
        </div>

        <div class="contentBlock">
            <h1>Vanuit China</h1>
            <hr>
            <p><?php echo file_get_contents('./elements/content/history/vanuit_china.txt'); ?></p>
        </div>

        <div class="contentBlock">
            <h1>Niet alleen militair wapen</h1>
            <hr>
            <p><?php echo file_get_contents('./elements/content/history/niet_alleen_militair.txt'); ?></p>
        </div>

    </div>
</body>
</html>
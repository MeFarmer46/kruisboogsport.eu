<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kruisboogsport</title>

    <link rel="icon" href="./pictures/crossbow.png">
    
    <link rel="stylesheet/less" type="text/css" href="styles/main.less" />
    <link rel="stylesheet/less" type="text/css" href="styles/home.less" />
    <script src="https://cdn.jsdelivr.net/npm/less@4" ></script>
    <script src="https://kit.fontawesome.com/b7eaa74f9d.js" crossorigin="anonymous"></script>
    <script src="js/fetch.js" defer></script>
</head>

<body>
    <?php echo file_get_contents('./elements/navbar.html') ?>
    <div class="main" style="padding: 1%;">
        <div class="homePage">
            <div class="left">
            <div class="contentBlock">
                <h1>De kruisboog</h1>
                <hr>
                <p><?php echo file_get_contents('./elements/content/history/de_kruisboog.txt'); ?></p>
            </div>
            <div class="contentBlock">
                <h1>De sport</h1>
                <hr>
                <div class="imgDiv">
                    <img src="./pictures/vizier.jpg" alt="vizier">
                    <p><?php echo file_get_contents('./elements/content/home/de_sport.txt'); ?></p>
                </div>
                
            </div>
            </div>
            <div class="right">
                <div class="blockOne">
                    <h1 class="agenda">Agenda</h1>
                    <div class="agendaAction">
                        <p class="title">20M: Koning der Koningen</p>
                        <p> <i class="fa-solid fa-calendar-days red"></i> 18-6-2022</p>
                        <p> <i class="fa-solid fa-location-dot red"></i> De Kruisridders, Oudemolen</p>
                    </div>
                    <div class="agendaAction">
                        <p class="title">20M: België-Nederland</p>
                        <p> <i class="fa-solid fa-calendar-days red"></i> 19-6-2022</p>
                        <p> <i class="fa-solid fa-location-dot red"></i> Meer, België</p>
                    </div>
                    <div class="agendaAction">
                        <p class="title">20M: 3e NKB concours noord</p>
                        <p> <i class="fa-solid fa-calendar-days red"></i> 29-6-2022</p>
                        <p> <i class="fa-solid fa-location-dot red"></i> Willem Tell, Aalden</p>
                    </div>
                    <div class="agendaAction">
                        <p class="title">20M: 3e masters NKB</p>
                        <p> <i class="fa-solid fa-calendar-days red"></i> 29-6-2022</p>
                        <p> <i class="fa-solid fa-location-dot red"></i> Komst des Vredes, Achtmaal</p>
                    </div>
                </div>

                <div class="blockTwo">
                    <div class="contentBlock">
                        <h1>Kijk ook naar:</h1>
                        <hr>
                        <a href="https://www.nkbkruisboog.nl">Klik hier!</a>
                        <p><?php echo file_get_contents('./elements/content/home/nkb.txt'); ?></p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</body>
</html>
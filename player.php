<?php include 'settings.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><?php echo $site_title; ?></title>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <script src="https://use.fontawesome.com/0b3993a8e0.js"></script>
  <!-- Videojs: -->
  <link href="http://vjs.zencdn.net/5.19/video-js.css" rel="stylesheet">

  <link href="https://fonts.googleapis.com/css?family=Oswald:400,700&amp;subset=latin-ext" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Quicksand:400,700&amp;subset=latin-ext" rel="stylesheet">

  <script src="http://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>

  <!-- Bootstrap: -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<?php include 'navigation.php'; ?>

<main>
  <div class="container container--no-gutter">
    <div class="container__video">
      <div class="video vjs-big-play-centered"><video id="videoPlayer" class="video-js vjs-fluid"></video></div>
    </div>
  </div>
  <div class="container container--no-gutter">
    <div class="player__info">
      <div id="videoTitle" class="player__description"></div>
      <div id="videoDescription" class="player__description"></div>
      <div id="videoTags" class="player__tags"><i class="fa fa-tags" aria-hidden="true"></i></div>
    </div>
  </div>
</main>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script src="//vjs.zencdn.net/5.19/video.min.js"></script>
<script src="scripts/scripts.js"></script>
<script>
  $( document ).ready(function() {
    getVideoInfo(<?php echo $_GET['id']; ?>);
  });
</script>
</body>
</html>
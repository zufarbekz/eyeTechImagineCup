// css toggle

let subMenu = document.getElementById("subMenu");

function toggleMenu() {
    subMenu.classList.toggle("open-menu");
}

// 

GazeRecorderAPI.OnNavigation = function (url) {
      document.getElementById("url").value = url;
    }

function replayRec(){
  GazePlayer.PlayResults();
}

    function EndRec() {
      document.getElementById("navi").style.display = 'none';
      GazeRecorderAPI.StopRec();
      GazeCloudAPI.StopEyeTracking();
    }

    function PlayRec() {
      EndRec(); 
      GazePlayer.SetCountainer(document.getElementById("playerdiv"));
      var SesionReplayData = GazeRecorderAPI.GetRecData();
      GazePlayer.PlayResultsData(SesionReplayData);
    }

    function Navigate() {
      GazeRecorderAPI.Navigate();
    }

    // Appear Image
    function AppearImage() {
      const startImg = document.getElementById("ecg-image");
      const startBtn = document.getElementById("start-training");
      startImg.style.display = "block";
      startBtn.style.display = "none";
    }

    // Start Image
    function start() {
      document.getElementById("navi").style.display = 'block';
      GazeCloudAPI.StartEyeTracking();
      GazeCloudAPI.OnCalibrationComplete = function () {
        GazeRecorderAPI.Rec();
        AppearImage();
        setTimeout(PlayRec, 10000);
      }
    }

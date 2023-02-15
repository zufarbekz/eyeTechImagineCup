function PlayRec() {
  EndRec();
  GazePlayer.SetCountainer(document.getElementById("playerdiv"));
  var SessionReplayData = GazeRecorderAPI.GetRecData();
  GazePlayer.PlayResultsData(SessionReplayData);
}

function replayRec() {
  GazePlayer.PlayResults();
}

function EndRec() {
  document.getElementById("navi").style.display = 'none';
  GazeRecorderAPI.StopRec();
  GazeCloudAPI.StopEyeTracking();
}

function AppearImage() {
  const startImg = document.getElementById("ecg-image");
  const startBtn = document.getElementById("start-training");
  startImg.style.display = "block";
  startBtn.style.display = "none";
}

function startTraining() {
  document.getElementById("navi").style.display = 'block';
  GazeCloudAPI.StartEyeTracking();
  GazeCloudAPI.OnCalibrationComplete = function () {
    GazeRecorderAPI.Rec();
    AppearImage();
    setTimeout(PlayRec, 10000);
  }
}

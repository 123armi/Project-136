status = "";
value = "";
objects = "";

function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(480, 380);
  video.hide();
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  value = document.getElementById("n_object").value;
}

function modelLoaded()
{
  console.log("Model Loaded!")
  status = true;
}

function draw()
{
  image(video, 0, 0, 480, 380);

  if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Found";
 
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

          if (objects[i].label == value)
          {
            video.stop();
            objectDetector.detect(gotResult);
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance( value + " Found")
            synth.speak(utterThis);
            document.getElementById("status").innerHTML = value + " Found";
          }

          else
          {
            document.getElementById("status").innerHTML = value + "Not Found";
          }
        }
      }
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}
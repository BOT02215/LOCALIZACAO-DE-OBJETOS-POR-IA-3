modelStatus = false

function setup() {
    canvas = createCanvas(532, 350)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}

function startScanning() {
    objectDetected = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Identificando objetos"
    inputValue = document.getElementById("inputValue").value
}

function modelLoaded() {
    console.log("Modelo Carregado")
    modelStatus = true
}

object = []
function gotResult(error, result) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(result)
        object = result
    }
}

function draw() {
    image(video, 0, 0, 640, 360)

    if (modelStatus) {
        objectDetected.detect(video, gotResult)
        for (i = 0; i < object.length; i++) {
            fill("red")
            stroke("red")
            text(object[i].label + ": " + object[i].confidence.toFixed(2) * 100 + "%", object[i].x, object[i].y)
            noFill()
            stroke("red")
            rect(object[i].x, object[i].y, object[i].width, object[i].height)

            if (object[i].label = inputValue) {
                video.stop()
                objectDetected.detect(gotResult)
                document.getElementById("status").innerHTML = "Objeto encontrado"
                const synth = window.speechSynthesis
                const utterThis = new SpeechSynthesisUtterance(inputValue);
                synth.speak(utterThis)
            }
        }
    }
}
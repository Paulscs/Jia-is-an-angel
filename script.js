var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const responseButtons = document.getElementById("response-buttons");
const mediaContainer = document.getElementById("media-container");
const finalMessage = document.getElementById("final-message");
const boomSound = document.getElementById("sound-boom");
const bazookaSound = document.getElementById("sound-bazooka");

noButton.addEventListener("click", () => {
    boomSound.currentTime = 0;
    boomSound.play();

    // Show The Rock GIF
    mediaContainer.innerHTML = '<img src="assets/images/the-rock.gif" alt="The Rock" style="width: 100%; max-width: 300px; border-radius: 10px;">';
    mediaContainer.classList.remove("hidden");
    mediaContainer.style.top = "20%"; // Move GIF slightly lower (was 10%)

    // Hide No button and update text
    noButton.style.display = "none";

    // Optional: Add text feedback
    const feedback = document.createElement("div");
    feedback.textContent = "Try choosing again";
    feedback.style.color = "white";
    feedback.style.marginTop = "10px";
    feedback.style.fontSize = "20px";
    feedback.style.fontFamily = "'Roboto', sans-serif";
    mediaContainer.appendChild(feedback);
});

yesButton.addEventListener("click", () => {
    bazookaSound.currentTime = 0;
    bazookaSound.play();

    // Hide everything else
    canvas.style.display = "none";
    responseButtons.style.display = "none";
    // Also force hide the individual buttons just in case
    yesButton.style.display = "none";
    noButton.style.display = "none";
    mediaContainer.innerHTML = ''; // Clear previous GIF
    mediaContainer.classList.remove("hidden");
    mediaContainer.style.top = "50%"; // Reset position for Yes screen

    // Show AI Baby GIF
    mediaContainer.innerHTML = `
        <img src="assets/images/ai-baby.gif" alt="AI Baby" style="width: 100%; max-width: 800px; border-radius: 10px;">
        <div style="
            color: white; 
            margin-top: 20px; 
            font-size: 30px; 
            font-family: 'Roboto', sans-serif;
            text-align: center;
        ">Saturday is officially written in the stars. See you then!</div>
    `;

    // Center the container nicely for the final screen
    mediaContainer.style.position = "absolute";
    mediaContainer.style.top = "50%";
    mediaContainer.style.left = "50%";
    mediaContainer.style.transform = "translate(-50%, -50%)";
    mediaContainer.style.textAlign = "center";
    mediaContainer.style.zIndex = "1000";
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px 'Roboto', sans-serif";
    context.textAlign = "center";

    // glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if (frameNumber < 250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("I find myself struck by the astronomical odds...", canvas.width / 2, canvas.height / 2);
        opacity = opacity + 0.01;
    }
    //fades out the text by decreasing the opacity
    if (frameNumber >= 250 && frameNumber < 500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("I find myself struck by the astronomical odds...", canvas.width / 2, canvas.height / 2);
        opacity = opacity - 0.01;
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if (frameNumber == 500) {
        opacity = 0;
    }
    if (frameNumber > 500 && frameNumber < 750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {           //shortens long sentence for mobile screens
            drawTextWithLineBreaks(["Amongst trillions of stars,", "and billions of years,", "the fact that our paths", "actually crossed"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Amongst trillions of stars and billions of years, the fact that our paths actually crossed", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity + 0.01;
    }
    if (frameNumber >= 750 && frameNumber < 1000) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["Amongst trillions of stars,", "and billions of years,", "the fact that our paths", "actually crossed"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Amongst trillions of stars and billions of years, the fact that our paths actually crossed", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity - 0.01;
    }

    if (frameNumber == 1000) {
        opacity = 0;
    }
    if (frameNumber > 1000 && frameNumber < 1250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely.", canvas.width / 2, canvas.height / 2);
        opacity = opacity + 0.01;
    }
    if (frameNumber >= 1250 && frameNumber < 1500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely.", canvas.width / 2, canvas.height / 2);
        opacity = opacity - 0.01;
    }

    if (frameNumber == 1500) {
        opacity = 0;
    }
    if (frameNumber > 1500 && frameNumber < 1750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("And yet, here I am, getting the chance to know you.", canvas.width / 2, canvas.height / 2);
        opacity = opacity + 0.01;
    }
    if (frameNumber >= 1750 && frameNumber < 2000) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("And yet, here I am, getting the chance to know you.", canvas.width / 2, canvas.height / 2);
        opacity = opacity - 0.01;
    }

    if (frameNumber == 2000) {
        opacity = 0;
    }
    if (frameNumber > 2000 && frameNumber < 2250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["There is still a lifetime of things", "I want to uncover about you,"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("There is still a lifetime of things I want to uncover about you,", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity + 0.01;
    }
    if (frameNumber >= 2250 && frameNumber < 2500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["There is still a lifetime of things", "I want to uncover about you,"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("There is still a lifetime of things I want to uncover about you,", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity - 0.01;
    }

    if (frameNumber == 2500) {
        opacity = 0;
    }
    if (frameNumber > 2500 && frameNumber < 2750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["but even the brief glimpse I’ve had", "so far has already filled", "my world completely."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("but even the brief glimpse I’ve had so far has already filled my world completely.", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity + 0.01;
    }
    if (frameNumber >= 2750 && frameNumber < 3000) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["but even the brief glimpse I’ve had", "so far has already filled", "my world completely."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("but even the brief glimpse I’ve had so far has already filled my world completely.", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity - 0.01;
    }

    if (frameNumber == 3000) {
        opacity = 0;
    }
    if (frameNumber > 3000 && frameNumber < 3250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I like you a lot, Jia. ", "Probably more than I", "want to admit just yet."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("I like you a lot, Jia. Probably more than I want to admit just yet.", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity + 0.01;
    }
    if (frameNumber >= 3250 && frameNumber < 3500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I like you a lot, Jia. ", "Probably more than I", "want to admit just yet."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("I like you a lot, Jia. Probably more than I want to admit just yet.", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity - 0.01;
    }

    if (frameNumber == 3500) {
        opacity = 0;
    }
    if (frameNumber > 3500 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I’m really happy", "that our orbits happened to overlap."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("I’m really happy that our orbits happened to overlap.", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity + 0.01;
    }

    if (frameNumber >= 3750 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${secondOpacity})`;


        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["Will you be my Valentine? <3"], canvas.width / 2, (canvas.height / 2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("Will you be my Valentine? <3", canvas.width / 2, (canvas.height / 2 + 50));
        }

        secondOpacity = secondOpacity + 0.01;
    }

    if (frameNumber >= 4000 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${thirdOpacity})`;
        context.fillText("", canvas.width / 2, (canvas.height / 2 + 120));
        thirdOpacity = thirdOpacity + 0.01;

        responseButtons.classList.remove("hidden");
        // Ensure flex display for buttons
        responseButtons.style.display = "flex";
    }

    // Reset the shadow effect after drawing the text
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);

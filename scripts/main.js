let canvas, ctx, W, H, img, imgData;
let circleList = [], iterationLimit = 0;

//event listeners for onload & resize
window.addEventListener('resize', init);
window.addEventListener('load', init);

window.onclick = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    console.log(x + "," + y + " color : " + getColor(x, y));
    document.body.style.background = getColor(x, y);
}


//initial function,
function init() {
    //setting things up
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    W = canvas.width = window.innerWidth - 2;
    H = canvas.height = window.innerHeight - 6;

    // get and draw image
    img = new Image();
    img.src = "./images/nature.jpg";
    img.onload = () => {

        // figure out ratio
        let hRatio = W / img.width;
        let vRatio = H / img.height;
        let ratio = Math.min(hRatio, vRatio);
        let centerShift_x = (canvas.width - img.width * ratio) / 2;
        let centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

        imgData = ctx.getImageData(0, 0, img.width, img.height).data;

        //drawing function
        draw();
    }
}

function draw() {
    //clearing canvas
    ctx.fillStyle = '#262626';
    ctx.fillRect(0, 0, W, H);

    if (true) {
        let i = 0;
        while (i < 100) {
            let x = random(0, W);
            let y = random(0, H);
            let newCircle = new Circle(x, y, getColor(x, y));
            if (!isCircleColliding(newCircle) && isWithinEdge(newCircle) && getColor(x, y) != "rgba(255,255,255,255)") {
                circleList.push(newCircle);
            }
            i++;
        }
    }
    for (let i = 0; i < circleList.length; i++) {
        circleList[i].update();
        circleList[i].draw();

    }

    requestAnimationFrame(draw);
}

// get random 
const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const getColor = (x = 0, y = 0) => {
    let colorIndices = getColorIndicesForCoord(x, y, img.width);
    if (x < img.width && y < img.height) {
        let color = `rgba(${imgData[colorIndices[0]]},${imgData[colorIndices[1]]},${imgData[colorIndices[2]]},${imgData[colorIndices[3]]})`;
        return color;
    }
    return "rgba(255,255,255,255)";
}
const getColorIndicesForCoord = (x, y, width) => {
    let red = y * (width * 4) + x * 4;
    return [red, red + 1, red + 2, red + 3];
}
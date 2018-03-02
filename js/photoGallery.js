var picturePaths = ["../Productivity_Web_Site/images/brushes.jpeg","../Productivity_Web_Site/images/free_weight.jpeg","../Productivity_Web_Site/images/4 wheelin.jpg",
    "../Productivity_Web_Site/images/bench_press.jpeg","../Productivity_Web_Site/images/bike_race.jpeg","../Productivity_Web_Site/images/car_race.jpeg",
    "../Productivity_Web_Site/images/graphs.jpeg","../Productivity_Web_Site/images/job_hunt.jpeg","../Productivity_Web_Site/images/light_coding.jpg",
    "../Productivity_Web_Site/images/mountain.jpeg","../Productivity_Web_Site/images/organize.jpeg","../Productivity_Web_Site/images/outdoor_squat.jpeg",
    "../Productivity_Web_Site/images/road.jpeg","../Productivity_Web_Site/images/rock_climb.jpeg","../Productivity_Web_Site/images/sahara.jpeg",
    "../Productivity_Web_Site/images/sun_water.jpeg","../Productivity_Web_Site/images/tower.jpg","../Productivity_Web_Site/images/track.jpg",
    "../Productivity_Web_Site/images/world_bubble.jpeg","../Productivity_Web_Site/images/stand_weight.jpeg"];

var currentPictureID;
var intervalID;

function openModal(pictureID) {
    var modal = document.getElementById("myModal");
    var body = document.getElementsByTagName("BODY")[0];
    var content = document.getElementById("modal_content");
    content.classList.remove("addedToRemove");

    modal.style.display = "block";
    body.style.overflow = "hidden";
    changePicture(pictureID);
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    var content = document.getElementById("modal_content");
    if(event.target == modal) {
        content.classList.add("addedToRemove");
        setTimeout(function(){
            modal.style.display = "none";
            var body = document.getElementsByTagName("BODY")[0];
            body.style.overflow = "auto";
        }, 400);
        stopSlideShow();
    }
}

window.onkeydown = function (event) {
    if(event.keyCode === 37){
        goToLeftImage();
    } else if(event.keyCode === 39){
        goToRightImage()
    } else if(event.keyCode === 27){
        closeModal();
    }
}

function changePicture(pictureID, isSlide) {
    if(intervalID !== undefined && isSlide === undefined) {
        stopSlideShow();
        startSlideShow();
    }
    var img = new Image();
    var container = document.getElementById("modal_body");

    img.src=picturePaths[pictureID];
    img.style.width = "60%";
    img.classList.add("picture");
    img.classList.add("pictureFadeIn");
    img.id = "bigImage";

    currentPictureID = pictureID;
    var holder = document.getElementById(currentPictureID);
    holder.scrollIntoView();
    holder.focus();
    container.innerHTML="";
    container.appendChild(img);

}

function goToRightImage(slideShow) {
    currentPictureID = (currentPictureID+1)%20;
    changePicture(currentPictureID,slideShow);
}

function goToLeftImage() {
    if(currentPictureID === 0){
        currentPictureID = 19;
    } else {
        currentPictureID = currentPictureID-1;
    }
    changePicture(currentPictureID);
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.click();
}

function startSlideShow() {
    intervalID = setInterval(function () {
        goToRightImage(true);
    }, 10000)
}

function stopSlideShow() {
    if(intervalID !== undefined) {
        clearInterval(intervalID);
        intervalID = undefined;
    }

}
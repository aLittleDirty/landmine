
window.onload = function () {
    mainLand.initGame("llevel");
};
let levelElement = document.getElementById("chooseLevel");
levelElement.onclick = function (event) {
    let e = event || window.event;
    let target = e.target;
    if (target.tagName.toLocaleLowerCase() == "input") {
        let level = target.getAttribute("id");
        mainLand.chooseLevel(level);
    }
};
let button = document.getElementById("btn");
button.onclick = function () {
    mainLand.startGame();
    console.log(mainLand.array);
    button.disabled = true;
    levelElement.disabled = true;

};


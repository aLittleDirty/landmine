let mainLand = (function () {
    let doc = document;
    let timeTip = doc.getElementById("time");
    let time = 0;
    let minesTip = doc.getElementById("mineNum");
    let array = [];
    let minesArray = [];
    let value = 0;
    let totalMines = 0;
    let openCells = 0;
    let allMines;
    let addTime;

    function isTbody(rowLen, colLen) {
        let array = [];
        for (let i = 0; i < colLen; i++) {
            array.push("<tr>");
            for (let j = 0; j < rowLen; j++) {
                array.push("<td id='" + i + "-" + j + "'></td>");
            }
            array.push("</tr>");
        }
        return "<tbody>" + array.join("") + "</tbody>";
    }

    function setTable(rowNum, colNum) {
        const table = doc.getElementById("mineLand");
        table.innerHTML = isTbody(rowNum, colNum);
        return table;
    }

    function setArea(value) {
        const wholeBoxElement = doc.getElementById("whole");
        const introduction = doc.getElementById("introduction");
        let wholeWidth = (40 * value) + introduction.offsetWidth + 10;
        wholeBoxElement.style.width = wholeWidth + "px";
    }

    function countTime() {
        time = time + 1;
        timeTip.innerHTML = time.toString();
        addTime = setTimeout(countTime, 1000);
    }

    function setTotalMines(value) {
        let minMinesNumber = value * value * 0.1;
        totalMines = Math.floor(Math.random() * minMinesNumber + minMinesNumber);
        allMines = totalMines;

    }

    function setInitialNumbers(rows, cols) {
        for (let i = 0; i < rows; i++) {
            array[i] = [];
            for (let j = 0; j < cols; j++) {
                array[i][j] = 0;
            }
        }
    }

    function setMinesNumber(rows, cols) {
        setInitialNumbers(rows, cols);
        for (let i = 0; i < totalMines; i++) {
            let posX = Math.floor(Math.random() * rows);
            let posY = Math.floor(Math.random() * cols);
            if (array[posX][posY] == 9) {
                i--;
                continue;
            }
            array[posX][posY] = 9;
            let mine = doc.getElementById(posX + "-" + posY);
            minesArray.push(mine);
        }
    }

    function setFinalNumbers(rows, cols) {
        setMinesNumber(rows, cols);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (array[i][j] == 9) {
                    continue;
                }
                if (i > 0 && j > 0) {
                    if (array[i - 1][j - 1] == 9) {
                        array[i][j]++;
                    }
                }
                if (i > 0) {
                    if (array[i - 1][j] == 9) {
                        array[i][j]++;
                    }
                }
                if (i > 0 && j < rows - 1) {
                    if (array[i - 1][j + 1] == 9) {
                        array[i][j]++;
                    }
                }
                if (j > 0) {
                    if (array[i][j - 1] == 9) {
                        array[i][j]++;
                    }
                }
                if (j < rows - 1) {
                    if (array[i][j + 1] == 9) {
                        array[i][j]++;
                    }
                }
                if (i < cols - 1 && j > 0) {
                    if (array[i + 1][j - 1] == 9) {
                        array[i][j]++;
                    }
                }
                if (i < cols - 1) {
                    if (array[i + 1][j] == 9) {
                        array[i][j]++;
                    }
                }
                if (i < cols - 1 && j < rows - 1) {
                    if (array[i + 1][j + 1] == 9) {
                        array[i][j]++;
                    }
                }
            }

        }
    }

    function showLandMine() {
        for (let i = 0; i < minesArray.length; i++) {
            minesArray[i].className = "mine normal";
        }

    }

    function setValue(level) {
        const levelMap = {"llevel": 10, "mlevel": 15, "hlevel": 20};
        value = levelMap[level];
    }

    function getCellId(id) {
        return doc.getElementById(id);
    }

    function reduceMine() {
        totalMines--;
        minesTip.innerHTML = totalMines;
        if(totalMines<0){
            minesTip.innerHTML = 0;
        }
    }

    function addMine() {
            totalMines++;
            minesTip.innerHTML = totalMines;
        if(totalMines<0){
            minesTip.innerHTML = 0;
        }
    }

    function gameOver() {
        showLandMine();
        alert("game over!");
        clearTimeout(addTime);
        looseCellsClick();
        levelElement.disabled = false;
        button.disabled = false;
    }

    function winGame() {
        clearTimeout(addTime);
        alert("success!");
        looseCellsClick();
        levelElement.disabled = false;
        button.disabled = false;
    }

    function showBlank(i, j) {
        for (let x = i - 1; x < i + 2; x++) {
            for (let y = j - 1; y < j + 2; y++) {
                if (getCellId(x + "-" + y) && getCellId(x + "-" + y).className == "") {
                    if (x==i && y==j){
                        continue;
                    }
                    if (array[x][y] == 9) {
                        continue;
                    }
                    if (array[x][y] != 0) {
                        getCellId(x + "-" + y).innerHTML = array[x][y];
                        getCellId(x + "-" + y).setAttribute("class", "normal");
                        getCellId(x + "-" + y).onmousedown=null;
                        openCells++;
                        continue;
                    }
                    getCellId(x + "-" + y).setAttribute("class", "normal");
                    getCellId(x + "-" + y).onmousedown=null;
                    openCells++;
                    showBlank(x, y);
                }
            }
        }

    }

    function clickCells() {
        for (let i = 0; i < value; i++) {
            for (let j = 0; j < value; j++) {
                getCellId(i + "-" + j).oncontextmenu = function (e) {
                    e.preventDefault();
                };
                getCellId(i + "-" + j).onmousedown = function (e) {
                    e = e || window.event;
                    if (e.button == 0) {
                        if (array[i][j] == 9) {
                            gameOver();
                        }
                        if(this.className=="flag"){
                            addMine();
                        }
                        if (array[i][j] > 0 && array[i][j] < 9) {
                            this.innerHTML = array[i][j];
                            this.setAttribute("class", "normal");
                            this.onmousedown=null;
                            openCells++;
                            console.log("click 0-9:"+openCells);
                        }
                        if (array[i][j] == 0) {
                            this.setAttribute("class", "normal");
                            this.onmousedown=null;
                            openCells++;
                            showBlank(i, j);
                            console.log("click 0:"+openCells);
                        }

                        if (openCells + allMines == value * value) {
                            winGame();
                            console.log("winGame:"+openCells);
                        }
                    }
                    if (e.button == 2) {
                        if (this.className == "flag") {
                            this.className = "";
                            addMine();
                        } else {
                                this.className = "flag";
                                reduceMine();
                        }
                    }
                }
            }
        }
    }

    function initTips() {
        time = 0;
        minesTip.innerHTML = totalMines;
    }

    function clearCells(rows, cols) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let tdCell = getCellId(i + "-" + j);
                tdCell.className = "";
                tdCell.innerHTML = "";
            }
        }
        openCells = 0;
        minesArray = [];
    }
    function looseCellsClick() {
        for (let i = 0; i < value; i++) {
            for (let j = 0; j < value; j++) {
                let tdCell = getCellId(i + "-" + j);
                tdCell.onmousedown = null;
            }
        }
    }


    return {
        array,
        chooseLevel: function (level) {
            timeTip.innerHTML = 0;
            minesTip.innerHTML = 0;
            setValue(level);
            setArea(value);
            setTable(value, value);
        },
        initGame: function (level) {
            let levelElement = document.getElementById(level);
            levelElement.checked = "checked";
            setValue(level);
            setArea(value);
            setTable(value, value);
        },
        startGame: function () {
            clearCells(value, value);
            setTotalMines(value, value);
            setFinalNumbers(value, value);
            initTips();
            countTime();
            clickCells();
        },
    }
})();

//Code pour le jeu du démineur
var difficultes = {
	"easy" : [5, 5, 2],
	"average" : [16, 16, 40],
	"expert" : [22, 22, 100],
	"master" : [30, 30, 250]
}
var niveauChoisi;
var table;
var canPlay=false;

document.getElementById("newgame").setAttribute("disabled","disabled");

class Board{
	constructor(x,y, nbrMines){
		this.nbrMines = nbrMines;
		this.table = [];
		this.selectable = (x*y)-nbrMines;

		document.getElementById("gameboard").innerHTML = "";
		var table = document.createElement("table");
		document.getElementById("gameboard").appendChild(table);

		for(var i=0; i<x; i++){
            var tr = document.createElement("tr");
            document.querySelector("table").appendChild(tr);
            this.table.push([]);
            for(var j=0; j<y; j++){
                var td = document.createElement("td");
                td.dataset.row=""+i;
                td.dataset.column=""+j;
                var img = document.createElement("img");
                img.src = "images/normal.png";
                td.appendChild(img);
                tr.appendChild(td);
                this.table[i].push(new Case());

                td.addEventListener("click", function(){
                	if(canPlay){
						selectionCase(this);
                	}
                })

                td.addEventListener("contextmenu", function(event){
                	if(canPlay){
                		event.preventDefault();
                		flagCase(this);
                	}
                })
			}
		}
	}

	isMined(row, column){
		if(row < 0 || row >= this.table[0].length || column < 0 || column >= this.table.length){
			return false;
		}
		else{
			return this.table[row][column].mine;
		}
	}

	isSelected(row, column){
		if(row < 0 || row >= this.table[0].length || column < 0 || column >= this.table.length){
			return true;
		}
		else{
			return this.table[row][column].select;
		}
	}

	isFlaged(row, column){
		return this.table[row][column].flag;
	}
}

class Case{
	constructor(){
		this.mine = false;
		this.select = false;
		this.flag = false;
	}
}

document.getElementById("newgame").addEventListener("click", function(){
	canPlay=true;
	var e = document.getElementById("level");
	var level = e.options[e.selectedIndex].value;

	var sizeX = difficultes[level][0];
	var sizeY = difficultes[level][1];
	var nbrMines = difficultes[level][2];
	table = new Board(sizeX, sizeY, nbrMines);
	document.getElementById("nbflag").textContent = nbrMines;
	randomMines(nbrMines);
	start();
})

document.getElementById("level").addEventListener("change", function(){
	var e = document.getElementById("level");
	var level = e.options[e.selectedIndex].value;

	if(level == ""){
		document.getElementById("newgame").setAttribute("disabled","disabled");
	}
	else{
		document.getElementById("newgame").removeAttribute("disabled");
	}
});

function randomMines(number){
	for(i=0; i<number; i++){
		rX = Math.floor(Math.random()*table.table[0].length);
		rY = Math.floor(Math.random()*table.table.length);
		if(!table.table[rY][rX].mine){
			table.table[rY][rX].mine = true;
		}
		else{
			i--;
		}
	}
}


var temp;
var date;
var current_timer;

function time(current_timer) {
	var ms = document.getElementById("ms");
	ms.textContent = (current_timer%1000).toString().padStart(3, "0");
	var sec = document.getElementById("sec");
	sec.textContent = ((Math.floor(current_timer/1000))%60).toString().padStart(2, "0");
	var min = document.getElementById("min");
	min.textContent = ((Math.floor(current_timer/60000))%60).toString().padStart(2, "0");
}


function start () {
	date = Date.now();
	temp = setInterval(function () {
		current_timer = Date.now() - date;
		time(current_timer);
	}, 50);
}

function selectionCase(elm){
	row = parseInt(elm.dataset.row)
	column = parseInt(elm.dataset.column)
	selectionPosition(row, column);
}

function selectionPosition(row, column){
	if(row < 0 || row >= table.table[0].length || column < 0 || column >= table.table.length){
		return;
	}

	if(table.isFlaged(row, column)){
		table.nbrMines++;
		document.getElementById("nbflag").textContent = table.nbrMines;
	}

	if(table.isSelected(row,column)){
		return;
	}

	else{
		if(table.isMined(row, column)){
			canPlay=false;
			alert("game over");
			clearInterval(temp);
			showMines();
		}

		else{
			table.selectable--;
			var nbrMines = checkAround(row, column);

			if(!nbrMines){
				document.querySelector("td[data-row='"+row+"'][data-column='"+column+"']").childNodes[0].src = "images/empty.png";
			}
			else{
				document.querySelector("td[data-row='"+row+"'][data-column='"+column+"']").childNodes[0].src = "images/"+nbrMines+".png";
			}

			table.table[row][column].select = true;	
		}

		if(!table.selectable){
			alert("You win !");
			canPlay = false;
			clearInterval(temp);
		}
	}
}

function checkAround(row, col){
	var nbrMines = 0;

	if(table.isMined(row-1,col-1)) nbrMines++;
	if(table.isMined(row+1,col-1)) nbrMines++;
	if(table.isMined(row-1,col+1)) nbrMines++;
	if(table.isMined(row+1,col+1)) nbrMines++;
	if(table.isMined(row-1,col)) nbrMines++;
	if(table.isMined(row+1,col)) nbrMines++;
	if(table.isMined(row,col+1)) nbrMines++;
	if(table.isMined(row,col-1)) nbrMines++;

	return nbrMines;
}

function flagCase(elm){
	row = parseInt(elm.dataset.row);
	column = parseInt(elm.dataset.column);

	if(!table.isSelected(row, column)){
		table.table[row][column].flag = !table.table[row][column].flag;
		table.table[row][column].flag ? table.nbrMines-- : table.nbrMines++;
		document.getElementById("nbflag").textContent = table.nbrMines;
	
		table.table[row][column].flag ? img = "flag" : img = "normal";
		document.querySelector("td[data-row='"+row+"'][data-column='"+column+"']").childNodes[0].src = "images/"+img+".png";
		var img;
	}
}

function showMines(){
	for(i=0; i<table.table.length ; i++){
		for(j=0; j<table.table[0].length ; j++){
			if(table.isMined(i,j)){
				document.querySelector("td[data-row='"+i+"'][data-column='"+j+"']").childNodes[0].src = "images/bomb.png";
			}
		}
	}
}
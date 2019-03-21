//Code pour le jeu du démineur
var difficultes = {
	"easy" : [9, 9, 10],
	"average" : [16, 16, 40],
	"expert" : [22, 22, 100],
	"master" : [30, 30, 250]
}
var niveauChoisi = "master";
var table;

document.getElementById("newgame").setAttribute("disabled","disabled");

class Board{
	constructor(x,y, nbrMines){
		this.nbrMines = nbrMines;
		this.table = [];

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
                this.table[i].push(new Case(td));

                td.addEventListener("click", function(){
                	selectionCase(this);
                })
			}
		}
	}
}

class Case{
	constructor(elm){
		this.mine = false;
		this.discovered = false;
		this.element = elm;
	}
}

$("#newgame").on("click", function(){
	var e = document.getElementById("level");
	var level = e.options[e.selectedIndex].value;


	var sizeX = difficultes[level][0];
	var sizeY = difficultes[level][1];
	var nbrMines = difficultes[level][2];
	table = new Board(sizeX, sizeY, nbrMines);

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
	selectionPosition(elm.dataset.row, elm.dataset.column);
}

function selectionPosition(x, y){
	console.log(x + "," + y);
}
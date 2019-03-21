//Code pour le jeu du démineur
var difficultes = {
	"easy" : [9, 9, 10],
	"average" : [16, 16, 40],
	"expert" : [22, 22, 100],
	"master" : [30, 30, 250]
}
var niveauChoisi = "master";
var table;

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
				var img = document.createElement("img");
				img.src = "images/empty.png";
				td.appendChild(img);
				tr.appendChild(td);
				this.table[i].push(new Case(td));
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
	var level = $("#level").children("option:selected").val();
	var sizeX = difficultes[level][0];
	var sizeY = difficultes[level][1];
	var nbrMines = difficultes[level][2];
	table = new Board(sizeX, sizeY, nbrMines);

	table.table[1][1].element.childNodes[0].src = "";
})

function randomMines(number){
	rX = Math.floor(Math.random()*table.table[0].length);
	rY = Math.floor(Math.random()*table.table.length);

	for(i=0; i<number; i++){
		if(!table.table[rY][rX].mine){
			table.table[rY][rX].mine = true
		}
		else{
			i--;
		}
	}
}

//Code pour le jeu du démineur
var difficultes = {
	"easy" : [9, 9, 10],
	"average" : [16, 16, 40],
	"expert" : [22, 22, 100],
	"master" : [30, 30, 250]
}
var niveauChoisi = "master";

class Board{
	constructor(x,y){
		this.table = [];
		for(i=0; i<x; i++){
			this.table.push([]);
			for(j=0; j<y; j++){
				this.table[i].push(new Case());
			}
		}
	}
}

class Case{
	constructor(){
		this.mine = false;
		this.discovered = false;
	}
}

$("#newgame").on("click", function(){
	niveauChoisi = $("#level").children("option:selected").val();

	$("#gameboard").empty().append("<table></table>");

	for(var i=0 ; i<difficultes[niveauChoisi][0] ; i++){
		$("table").append("<tr></tr>");
	}

	for(var j=0; j<difficultes[niveauChoisi][0] ; j++){
		$("table tr").append("<td><img src='images/empty.png'></td>");
	}
})
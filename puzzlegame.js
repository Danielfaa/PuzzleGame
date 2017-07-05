//global variables
	var Tiles = [];
	var TilesTemp = [];
	var rules = [];
	var permutations = [];
	var trueMaps = [];
	var TilesDrawn = 0;
	var numbersInGame = 5; 
	var tempQ = 0;
	var tempR = 0;
	//canvas variables
		var canvas = document.querySelector("canvas");
		var context = canvas.getContext("2d");
		var transX = canvas.width * 0.5, transY = canvas.height * 0.5;
		context.translate(transX, transY);

//Tile superclass

	 function Tile([q,r],number){
	 	this.tiletype = "hexagon";
	 	this.qr = [q,r];
	 	this.q = this.qr[0];
	 	this.r = this.qr[1];
	 	this.number = number;
	 	this.rules = [];
	 }
	//Methods to class Tile
	function newTile(q,r){

		var qr = [q,r];

		var number = Math.floor(Math.random()*numbersInGame+1);

		Tiles[Tiles.length] = new Tile(qr,number);}

	//Finds the Tileagon object based on q and r coordinate
	function findObjectInTiles(Tile){

		return Tile.qr[0] == tempQ && Tile.qr[1]==tempR;}
	//Finds the Tileagon object based on q and r coordinate
	function useTile(q,r){
		tempQ = q;
		tempR = r;

		if(Tiles.findIndex(findObjectInTiles)>=0){
			return Tiles.find(findObjectInTiles);
		}
		else{
			return false;
			
		}}


		function pushUnlessEmpty(array,q,r){

			if(useTile(q,r)!=false){

				array.push(useTile(q,r));

			}
		}

//Find connecting tiles
	//finds connecting Tiles based on q and r coordinate
	function Neighbours(type,q,r){

		var neighbours = [];

		switch(type){
			case "hexagon" :
				pushUnlessEmpty(neighbours,q-1,r);
				pushUnlessEmpty(neighbours,q-1,r+1);
				pushUnlessEmpty(neighbours,q,r-1);
				pushUnlessEmpty(neighbours,q,r+1);
				pushUnlessEmpty(neighbours,q+1,r-1);
				pushUnlessEmpty(neighbours,q+1,r);
				return neighbours;
				break;
		}
	}
		
		

	//Returns connecting Tiles  
	Tile.prototype.connecting = function(){
		return Neighbours(this.tiletype,this.q,this.r);
		}

	//find connecting Tiles
	Rule.prototype.connecting = function(){
		return Neighbours(this.tiletype,this.q,this.r);}


	//make a rule-object and push to this.rules if true and possible. 
		//Use Rule.name. "rEqual" etc.  
	Tile.prototype.newRule = function(rule){
		var newRule = 0; 

		switch(rule){

			case "rEqual": 
				newRule = new rEqual(this.q,this.r);
				this.getRule(newRule);
			break;

			case "rOtherIsSmaller":
				newRule = new rOtherIsSmaller(this.q,this.r);
				this.getRule(newRule);
			break;
			case "rOtherIsLarger":
				newRule = new rOtherIsLarger(this.q,this.r);
				this.getRule(newRule);
			break;
			case "rOtherPlusOne":
				newRule = new rOtherPlusOne(this.q,this.r);
				this.getRule(newRule);
			break;
			case "rOtherPlusThree":
				newRule = new rOtherPlusThree(this.q,this.r);
				this.getRule(newRule);
			break;
			case "rNoneEqual":
				newRule = new rNoneEqual(this.q,this.r);
				this.getRule(newRule);
			break;
			case "rThreeConsec":
				newRule = new rThreeConsec(this.q,this.r);
				this.getRule(newRule);
			break;
			case "rTwoConsec":
				newRule = new rTwoConsec(this.q,this.r);
				this.getRule(newRule);
			break;
		}
	}

	//push rule-object to this.rules if true and possible;
	Tile.prototype.getRule = function(rule){
		
		if(rule.checkRule()){
			if(this.rules.length>0){
				for(var i=0; i<this.rules.length; i++){
					if(compareRules(this.rules[i],rule)){
						this.rules.push(rule);
						return true;
					}
				}
			}
			else{
				this.rules.push(rule);
				return true;
			}
		}
		else{
			return false;
		}}

		//forces push of new rule. 
		Tile.prototype.forceNewRule = function(rule,pos){

			var newRule = 0; 

		switch(rule){

			case "rEqual": 
				newRule = new rEqual(this.q,this.r);
				this.rules.splice(pos,1,newRule);
			break;

			case "rOtherIsSmaller":
				newRule = new rOtherIsSmaller(this.q,this.r);
				this.rules.splice(pos,1,newRule);
			break;
			case "rOtherIsLarger":
				newRule = new rOtherIsLarger(this.q,this.r);
				this.rules.splice(pos,1,newRule);
			break;
			case "rOtherPlusOne":
				newRule = new rOtherPlusOne(this.q,this.r);
				this.rules.splice(pos,1,newRule);
			break;
			case "rOtherPlusThree":
				newRule = new rOtherPlusThree(this.q,this.r);
				this.rules.splice(pos,1,newRule);
			break;
			case "rNoneEqual":
				newRule = new rNoneEqual(this.q,this.r);
				this.rules.splice(pos,1,newRule);
			break;
			case "rThreeConsec":
				newRule = new rThreeConsec(this.q,this.r);
				this.rules.splice(pos,1,newRule);
			break;
			case "rTwoConsec":
				newRule = new rTwoConsec(this.q,this.r);
				this.rules.splice(pos,1,newRule);
			break;
		}

		}
		//returns all the names of the rules that the current Tile contains
		Tile.prototype.returnRulesName = function(){
			var temp = [];
			var tempName = "";

			for(var i=0; i<this.rules.length; i++){
				tempName = this.rules[i].name;
				temp.push(tempName);
			}
			return temp;
		}
		Tile.prototype.returnRules = function(){
			var temp = [];
			for(var i=0; i<this.rules.length; i++){
				temp.push(this.rules);
			}

		}
		//changes the number of the Tile
		Tile.prototype.reassignNumber = function(number){

			this.number = number;
			return this.number;

		}
		//removes all rules from a given 
		Tile.prototype.removeAllRules = function(){

			this.rules = [];


		}

	//compares two rules to see if they are the same. Returns false if they are the same
	function compareRules(rule1,rule2){

		if(rule1.name == rule2.name){
			if(rule1.type=="multipleTarget"){
				return false;
			}
			else if(rule1.type=="singleTarget" && rule1.trueTiles.length<2){
				return false;
			}
			
		
			else{
				return true;
			}
		}
		else{
			return true;
		}}

	//Removes all rules from all Tiles
	function removeAllRules(){
		rules = [];
		for(var i=0; i<Tiles.length; i++){
			Tiles[i].removeAllRules();
		}
	}

	//Finds all true rules based on the numbers of the Tiles
	function assignRulesToTiles(){

		for(var i=0; i<Tiles.length; i++){

			Tiles[i].newRule("rNoneEqual");
			Tiles[i].newRule("rEqual");
			Tiles[i].newRule("rThreeConsec");
			Tiles[i].newRule("rOtherIsLarger");
			Tiles[i].newRule("rOtherIsSmaller");
			Tiles[i].newRule("rOtherPlusThree");
			Tiles[i].newRule("rOtherPlusOne");
			

		}}	

//Rules
	//Rules superclass
		function Rule(q,r){
		this.q = q;
		this.r = r;
		this.tiletype = "hexagon";
		 }
				
	//Methods to superclass

	

	//Remove rule
		Rule.prototype.remove = function(){

			return useTile(this.q,this.r).rules.splice(useTile(this.q,this.r).rules.indexOf(this),1,new emptyRule(this.q,this.r));

		}

		function emptyRule(q,r){
			Rule.call(this);
			this.q = q;
			this.r = r;
			this.name = "empty";
		}
		emptyRule.prototype = Object.create(Rule.prototype);
		emptyRule.prototype.constructor = emptyRule;

		emptyRule.prototype.checkRule = function(){
			return true;
		}

					//Rules subclass

	//Rules subclasses	
		//SingleTargetRule
		//MultitargetRule
		function singleTargetRule(q,r){
			Rule.call(this);
			this.q = q;
			this.r = r;	
			this.type = "singleTarget";
			this.trueTiles = [];}
			singleTargetRule.prototype = Object.create(Rule.prototype);
			singleTargetRule.prototype.constructor = singleTargetRule;


			singleTargetRule.prototype.specificRule = function(otherTile){
				if(1>0){
					return true;
				}
				else{
					return false;
				}}

			singleTargetRule.prototype.checkRule = function(){
				
				var temp = this.connecting();
				var trueTiles = [];

				for(var i=0; i<temp.length; i++){
				
					if(this.specificRule(temp[i])){
						trueTiles.push(temp[i]);
						
						
					}
				}

				if(trueTiles.length>0){
					this.trueTiles = trueTiles;
					
					return true;
				}	

				else{
					return false;
				}}


		function multipleTargetRule(q,r){
			Rule.call(this);
			this.q = q;
			this.r = r;
			this.type = "multipleTarget";
			
		}
			multipleTargetRule.prototype = Object.create(Rule.prototype);
			multipleTargetRule.prototype.constructor = multipleTargetRule;

		multipleTargetRule.prototype.checkRule = function(){

			return true;


		}

	//single target rule subclass

	//at least on other is equal 
			function rEqual(q,r){

				singleTargetRule.call(this);
				this.q = q;
				this.r = r;
				this.name = "rEqual"; }

				rEqual.prototype = Object.create(singleTargetRule.prototype);
				rEqual.prototype.constructor = rEqual;


			rEqual.prototype.specificRule = function(otherTile){

				if(useTile(this.q,this.r).number==otherTile.number){
					return true;
				}

				else{
					return false;
				}}	

	//at least one other is smaller than
			function rOtherIsSmaller(q,r){

				singleTargetRule.call(this);
				this.q = q;
				this.r = r; 
				this.name = "rOtherIsSmaller";
			}

				rOtherIsSmaller.prototype = Object.create(singleTargetRule.prototype);
				rOtherIsSmaller.prototype.constructor = rOtherIsSmaller;


			rOtherIsSmaller.prototype.specificRule = function(otherTile){

				if(useTile(this.q,this.r).number>otherTile.number){
					return true;
				}

				else{
					return false;
				}

			}

	//at least one other is larger than
			function rOtherIsLarger(q,r){

				singleTargetRule.call(this);
				this.q = q;
				this.r = r; 
				this.name = "rOtherIsLarger";
			}

				rOtherIsLarger.prototype = Object.create(singleTargetRule.prototype);
				rOtherIsLarger.prototype.constructor = rOtherIsLarger;


			rOtherIsLarger.prototype.specificRule = function(otherTile){

				if(useTile(this.q,this.r).number<otherTile.number){
					return true;
				}

				else{
					return false;
				}

			}

			function rOtherPlusOne(q,r){

				singleTargetRule.call(this);
				this.q = q;
				this.r = r; 
				this.name = "rOtherPlusOne";
			}

				rOtherPlusOne.prototype = Object.create(singleTargetRule.prototype);
				rOtherPlusOne.prototype.constructor = rOtherPlusOne;


			rOtherPlusOne.prototype.specificRule = function(otherTile){

				if(useTile(this.q,this.r).number+1==otherTile.number){
					return true;
				}

				else{
					return false;
				}

			}
			function rOtherPlusThree(q,r){

				singleTargetRule.call(this);
				this.q = q;
				this.r = r; 
				this.name = "rOtherPlusThree";
			}

				rOtherPlusThree.prototype = Object.create(singleTargetRule.prototype);
				rOtherPlusThree.prototype.constructor = rOtherPlusThree;


			rOtherPlusThree.prototype.specificRule = function(otherTile){

				if(useTile(this.q,this.r).number+3==otherTile.number){
					return true;
				}

				else{
					return false;
				}

			}

	//multiple target rule subclass
	//none other is equal
		function rNoneEqual(q,r){
		multipleTargetRule.call(this);
		this.q = q;
		this.r = r;
		this.name = "rNoneEqual";}
		rNoneEqual.prototype = Object.create(multipleTargetRule.prototype);
		rNoneEqual.prototype.constructor = rNoneEqual;

		rNoneEqual.prototype.checkRule = function(){
			var temp = this.connecting();
			var isTrue = true;

			for(var i=0; i<temp.length; i++){

				if(useTile(this.q,this.r).number==temp[i].number){

					isTrue = false;
					break;
				}
			}

			if(isTrue){
				return true;
			}
			else{
				return false;
			}}

	//three in a row
		function rThreeConsec(q,r){
		multipleTargetRule.call(this);
		this.q = q;
		this.r = r;
		this.name = "rThreeConsec";}
		rThreeConsec.prototype = Object.create(multipleTargetRule.prototype);
		rThreeConsec.prototype.constructor = rThreeConsec;

		rThreeConsec.prototype.checkRule = function(){
		var temp = this.connecting();

		for(var i=0; i<temp.length; i++){
			temp[i] = temp[i].number;
		}
		temp.sort();
		

		for(var i=1; i<=numbersInGame; i++){
			if(temp.indexOf(i)>=0&& temp.indexOf(i+1)>=0 && temp.indexOf(i+2)>=0){
				return true;

			}

		}
		return false;

	}

	//two in a row
		function rTwoConsec(q,r){
		multipleTargetRule.call(this);
		this.q = q;
		this.r = r;
		this.name = "rTwoConsec";}
		rTwoConsec.prototype = Object.create(multipleTargetRule.prototype);
		rTwoConsec.prototype.constructor = rTwoConsec;

		rTwoConsec.prototype.checkRule = function(){
		var temp = this.connecting();

		for(var i=0; i<temp.length; i++){
			temp[i] = temp[i].number;
		}
		temp.sort();
		

		for(var i=1; i<=numbersInGame; i++){
			if(temp.indexOf(i)>=0&& temp.indexOf(i+1)>=0 && temp.indexOf(i+2)>=0){
				return true;

			}

		}
		return false;

	}

//Prepare the map
	//ClearGame
	//MakeNewMap
	//DrawMapInTerminal
	//ShowRules
	//Initate

	//clears everything
	function clearGame(){
		Tiles = [];
		rules = [];
		permutations = [];
		trueMaps = [];
		TilesDrawn = 0;
		document.getElementById("buttons").innerHTML = "";
	}
	//makes new Tileagons.  
	function makeNewMap(radius){
		Tiles = [];
		newTile(0,0);
		for(var r=0; r>-radius; r--){
			for(var q= -r-1; q>-radius-r; q--){
				newTile(q,r);
			}
		}
		for(var r=1; r<radius; r++){
			for(var q= 0; q>-radius; q--){
				newTile(q,r);
			}
		}
		for(var q=1; q<radius; q++){
			for(var r=-q; r<radius-q; r++){
				newTile(q,r);
			}
		}}

	function drawMapInTerminal(){
		console.log("\n");
		console.log("     0,-1"+ useTile(0,-1).number); 
		console.log("-1,0         1,-1");
		console.log("     0,0");
		console.log("-1,1         1,0");
		console.log("     0,1");}


	function showRules(){
		rules = [];
		for(var i=0; i<Tiles.length; i++){

			
			rules.push(Tiles[i].returnRulesName());

		}}

	function initiate(radius){
		clearGame();
		makeNewMap(radius);
		//drawMapInTerminal();
		assignRulesToTiles();
		permutation(Tiles.length,"",numbersInGame);
		showRules();
		TilesTemp = Tiles; 
		drawMap();
		 }


//solve the map based on rules
	//permutations
	//newNumbersOnMap
	//newNumbersFromPermutation
	//checkMap
	
	function permutation(numberofresults,string,numbers){
		if(numberofresults>0){

			for(var i=1; i<=numbers; i++){
				
				permutation(numberofresults-1,string+i,numbers);

			}
		}

		else{
		
			string = string.split("");
			for(var i=0; i<string.length; i++){
				string[i] = parseInt(string[i]);
			}
			permutations.push(string);
			return string;
		}}

	function newNumbersOnMap(arrayOfNumbers){

		for(var i=0; i<Tiles.length; i++){
				Tiles[i].reassignNumber(arrayOfNumbers[i]); 
				
		}
	}
	//fills the numbers in the Tiles based on the rules. If there are more than 1 set of correct numbers the loop breaks.
	//trueMaps contains the correct answer 
	function newNumbersFromPermutation(){
		trueMaps = [];

		for(var i=0; i<permutations.length; i++){

			newNumbersOnMap(permutations[i]);

			if(checkMap()){
				if(trueMaps.length>=1){	
						trueMaps.push(permutations[i]);
						drawSolution();
						break;
					}
					else{
						trueMaps.push(permutations[i]);
						drawSolution();
						
					}
				}	
			}
		}
		

	//check each rule on the map to see if it's true. Returns false if one rule is false.
	function checkMap(){

		for(var i=0; i<Tiles.length; i++){
			for(var j=0; j<Tiles[i].rules.length; j++){

				if(!Tiles[i].rules[j].checkRule()){
					return false;	
				}
			}
		}
		return true;
	}


//Draw the game in browser
	//drawMap
	//updateMap
	//drawTile
	//drawSolution
	//newMap
	//bShowRules
	//removeAndUpdate
	//initElements
	//newMap
	function drawMap(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "lightgrey";
		context.fillRect(-500, -250, 1000, 500);
		context.fillStyle = "black";
		context.font = "20px Cambria";
	}

	function updateMap(){
		TilesDrawn = 0;
		drawMap();
		newNumbersFromPermutation();
	}

	//draw figures and text
		//Honeycomb hex pattern
		Tile.prototype.draw = function(addx,addy){

			context.fillText(this.number,addx+25*(this.q+0.5*this.r),addy+25*this.r);

		}

		function createButton(context, func,id,position){
		    var button = document.createElement("input");
		    button.type = "button";
		    button.value = id.name;

		    button.id = id;
		    button.name = id.q+" "+id.r+" "+position;
		    button.onclick = func;
		    context.appendChild(button);
	}

	function createDiv(name){
		var newDiv =document.createElement('div');
		newDiv.id = name;

		document.getElementById("buttons").appendChild(newDiv);
	}
		

		function drawSolution(){
			for(var i=0; i<Tiles.length; i++){
			Tiles[i].draw(-300+TilesDrawn*150,0);

			}
			TilesDrawn ++;}



	//recursive function. If there's not a unique answer it calls itself again.
	function newMap(){

		clearGame();
		initiate(2);
		bShowRules();
		newNumbersFromPermutation();
		if(trueMaps.length>1){

			newMap();
			return;

		}
		
		findFewerRules();
		
	}
	
	//draws buttons with all the rules
	function bShowRules(){

		for(var i=0; i<Tiles.length; i++){
			createDiv(i);
			var text = document.createElement('p');
			text.textContent = Tiles[i].q+" "+Tiles[i].r;
			
			document.getElementById(i).appendChild(text);
			for(var j=0; j<Tiles[i].rules.length; j++){
				createButton(document.getElementById(i),removeAndUpdate,Tiles[i].rules[j],j);
			}
		}	
	}

	//removes a rule and updates the map. this.name refers to the attribute of the button
	function removeAndUpdate(){
		var temp = this.name.split(" ");
			var tempQ = temp[0];
			var tempR = temp[1];
			var position = temp[2];

		if(this.style.color!=="red"){
			this.style.color = "red";
			
			useTile(tempQ,tempR).rules[position].remove();
			updateMap();
		}
		else{
			this.style.color = "black";
	
			useTile(tempQ,tempR).forceNewRule(this.value,position);
			updateMap();

		}
	}

	//remove a rule on at a time and then update the map to see if there's still a unique answer 
	function findFewerRules(){
		var tempRule = 0;
		
		for(var i=0; i<Tiles.length; i++){
			
			for(var j=0; j<Tiles[i].rules.length; j++){

				tempRule = Tiles[i].rules[j].remove();	
				updateMap();			
				var button = document.getElementsByName(Tiles[i].q+" "+Tiles[i].r+" "+j);
				button[0].style.color = "red";
				
				if(trueMaps.length>1){
					Tiles[i].forceNewRule(tempRule[0].name,j);
					updateMap();
					button[0].style.color ="black";
				}
			}
		}
		alert("finished");

	}


function initElements(){
		document.getElementById("buttonNewMap").onclick = newMap;
		document.getElementById("buttonSolutions").onclick = download;

		newMap();}

function returnMapInFormat(){
	
	var temp = "";

	for(var i=0; i<Tiles.length; i++){
		temp += Tiles[i].q + " "+Tiles[i].r +" "+trueMaps[0][i];
		
		for(var j=0; j<Tiles[i].rules.length; j++){
			if(Tiles[i].rules[j].name!="empty"){
				temp += " "+Tiles[i].rules[j].name;
			}
		}
		temp += "\n";
	}
	

	return temp;}


function download() {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(returnMapInFormat()));
    pom.setAttribute('download', "puzzlegame.txt");

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}















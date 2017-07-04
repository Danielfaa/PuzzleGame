//global variables
	var hexes = [];
	var hexesTemp = [];
	var rules = [];
	var permutations = [];
	var trueMaps = [];
	var hexesDrawn = 0;
	var numbersInGame = 5;
	var rulesInGame = 2; 
	var tempQ = 0;
	var tempR = 0;
	//canvas variables
		var canvas = document.querySelector("canvas");
		var context = canvas.getContext("2d");
		var transX = canvas.width * 0.5, transY = canvas.height * 0.5;
		context.translate(transX, transY);

//Hex class
	/*class Hex{
		constructor([q,r],number){
			this.qr = [q,r];
			this.number = number;
			this.rules = [];
	 	}}*/

	 function Hex([q,r],number){
	 	this.qr = [q,r];
	 	this.q = this.qr[0];
	 	this.r = this.qr[1];
	 	this.number = number;
	 	this.rules = [];
	 }
	//Methods to class Hex
	function newHex(q,r){

		var qr = [q,r];

		var number = Math.floor(Math.random()*numbersInGame+1);

		hexes[hexes.length] = new Hex(qr,number);}

	function findObjectInHexes(hex){

		return hex.qr[0] == tempQ && hex.qr[1]==tempR;}

	function useHex(q,r){
		tempQ = q;
		tempR = r;

		if(hexes.findIndex(findObjectInHexes)>=0){
			return hexes.find(findObjectInHexes);
		}
		else{
			return false;
			
		}}

	function pushUnlessEmpty(array,q,r){

		if(useHex(q,r)!=false){

			array.push(useHex(q,r));

		}
		else{
			
		}}

	function Neighbours(q,r){

		var neighbours = [];

		pushUnlessEmpty(neighbours,q-1,r);
		pushUnlessEmpty(neighbours,q-1,r+1);
		pushUnlessEmpty(neighbours,q,r-1);
		pushUnlessEmpty(neighbours,q,r+1);
		pushUnlessEmpty(neighbours,q+1,r-1);
		pushUnlessEmpty(neighbours,q+1,r);
		
		

		return neighbours;}

	Hex.prototype.connecting = function(){

		var neighbours = [];

		pushUnlessEmpty(neighbours,q-1,r);
		pushUnlessEmpty(neighbours,q-1,r+1);
		pushUnlessEmpty(neighbours,q,r-1);
		pushUnlessEmpty(neighbours,q,r+1);
		pushUnlessEmpty(neighbours,q+1,r-1);
		pushUnlessEmpty(neighbours,q+1,r);
		
		

		return neighbours;}

	//make a rule-object and push to this.rules if true and possible. 
		//Use Rule.name. "rEqual" etc.  
	Hex.prototype.newRule = function(rule){
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
	Hex.prototype.getRule = function(rule){
		
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

		Hex.prototype.forceNewRule = function(rule,pos){

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

		Hex.prototype.returnRulesName = function(){
			var temp = [];
			var tempName = "";

			for(var i=0; i<this.rules.length; i++){
				tempName = this.rules[i].name;
				temp.push(tempName);
			}
			return temp;
		}
		Hex.prototype.returnRules = function(){
			var temp = [];
			for(var i=0; i<this.rules.length; i++){
				temp.push(this.rules);
			}

		}
		Hex.prototype.reassignNumber = function(number){

			this.number = number;
			return this.number;

		}

		Hex.prototype.removeAllRules = function(){

			this.rules = [];


		}

	function compareRules(rule1,rule2){

		if(rule1.name == rule2.name){
			if(rule1.type=="multipleTarget"){
				return false;
			}
			else if(rule1.type=="singleTarget" && rule1.trueHexes.length<2){
				return false;
			}
			
		
			else{
				return true;
			}
		}
		else{
			return true;
		}}


	function removeAllRules(){
		rules = [];
		for(var i=0; i<hexes.length; i++){
			hexes[i].removeAllRules();
		}
	}
	function assignRulesToHexes(){

		for(var i=0; i<hexes.length; i++){

			hexes[i].newRule("rNoneEqual");
			hexes[i].newRule("rEqual");
			hexes[i].newRule("rThreeConsec");
			hexes[i].newRule("rOtherIsLarger");
			hexes[i].newRule("rOtherIsSmaller");
			hexes[i].newRule("rOtherPlusThree");
			hexes[i].newRule("rOtherPlusOne");
			

		}}	

//Rules
	//Rules superclass
		function Rule(q,r){
		this.q = q;
		this.r = r;
		 }
				
	//Methods to superclass

	//find connecting hexes
		Rule.prototype.connecting = function(){

			return Neighbours(this.q,this.r);}

	//Remove rule
		Rule.prototype.remove = function(){

			return useHex(this.q,this.r).rules.splice(useHex(this.q,this.r).rules.indexOf(this),1,new emptyRule(this.q,this.r));

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
			this.trueHexes = [];}
			singleTargetRule.prototype = Object.create(Rule.prototype);
			singleTargetRule.prototype.constructor = singleTargetRule;


			singleTargetRule.prototype.specificRule = function(otherhex){
				if(1>0){
					return true;
				}
				else{
					return false;
				}}

			singleTargetRule.prototype.checkRule = function(){
				
				var temp = this.connecting();
				var trueHexes = [];

				for(var i=0; i<temp.length; i++){
				
					if(this.specificRule(temp[i])){
						trueHexes.push(temp[i]);
						
						
					}
				}

				if(trueHexes.length>0){
					this.trueHexes = trueHexes;
					
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


			rEqual.prototype.specificRule = function(otherhex){

				if(useHex(this.q,this.r).number==otherhex.number){
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


			rOtherIsSmaller.prototype.specificRule = function(otherhex){

				if(useHex(this.q,this.r).number>otherhex.number){
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


			rOtherIsLarger.prototype.specificRule = function(otherhex){

				if(useHex(this.q,this.r).number<otherhex.number){
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


			rOtherPlusOne.prototype.specificRule = function(otherhex){

				if(useHex(this.q,this.r).number+1==otherhex.number){
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


			rOtherPlusThree.prototype.specificRule = function(otherhex){

				if(useHex(this.q,this.r).number+3==otherhex.number){
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

				if(useHex(this.q,this.r).number==temp[i].number){

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


	function clearGame(){
	hexes = [];
	rules = [];
	permutations = [];
	trueMaps = [];
	hexesDrawn = 0;
	document.getElementById("buttons").innerHTML = "";

	}

	function makeNewMap(radius){

		hexes = [];

		newHex(0,0);

		for(var r=0; r>-radius; r--){
			for(var q= -r-1; q>-radius-r; q--){
				newHex(q,r);
			}
		}

		for(var r=1; r<radius; r++){
			for(var q= 0; q>-radius; q--){
				newHex(q,r);
			}
		}

		for(var q=1; q<radius; q++){
			for(var r=-q; r<radius-q; r++){
				newHex(q,r);
			}
		}}

	function drawMapInTerminal(){
		console.log("\n");
		console.log("     0,-1"+ useHex(0,-1).number); 

		console.log("-1,0         1,-1");

		console.log("     0,0");

		console.log("-1,1         1,0");

		console.log("     0,1");}


	function showRules(){
		rules = [];
		for(var i=0; i<hexes.length; i++){

			
			rules.push(hexes[i].returnRulesName());

		}}

	function initiate(radius){
		clearGame();
		makeNewMap(radius);
		//drawMapInTerminal();
		assignRulesToHexes();
		permutation(hexes.length,"",numbersInGame);
		showRules();
		hexesTemp = hexes; 
		drawMap();
		 }


//solve the map based on rules
	//permutations
	//newNumbersOnMap
	//newNumbersFromPermutation
	//checkMap
	//
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

		for(var i=0; i<hexes.length; i++){
				hexes[i].reassignNumber(arrayOfNumbers[i]); 
				
		}
	}

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
		


	function checkMap(){

		for(var i=0; i<hexes.length; i++){
			for(var j=0; j<hexes[i].rules.length; j++){

				if(!hexes[i].rules[j].checkRule()){

					
					return false;
					
				}
			}
		}


		return true;
	}


//Draw the game in browser
	//drawMap
	//updateMap
	//drawHex
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
		hexesDrawn = 0;
		drawMap();
		newNumbersFromPermutation();



	}

	//draw figures and text
		function drawHex(hex,addx,addy){
			
			context.fillText(hex.number,addx+25*(hex.q+0.5*hex.r),addy+25*hex.r);

			
		}

		function drawSolution(){
			for(var i=0; i<hexes.length; i++){
			drawHex(hexes[i],-300+hexesDrawn*150,0);
			}
			hexesDrawn ++;}

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
	
	
	function bShowRules(){

		for(var i=0; i<hexes.length; i++){
			createDiv(i);
			var text = document.createElement('p');
			text.textContent = hexes[i].q+" "+hexes[i].r;
			
			document.getElementById(i).appendChild(text);
			for(var j=0; j<hexes[i].rules.length; j++){
				createButton(document.getElementById(i),removeAndUpdate,hexes[i].rules[j],j);
			}
		}	
	}

	function removeAndUpdate(){
		var temp = this.name.split(" ");
			var tempQ = temp[0];
			var tempR = temp[1];
			var position = temp[2];

		if(this.style.color!=="red"){
			this.style.color = "red";
			
			useHex(tempQ,tempR).rules[position].remove();
			updateMap();
		}
		else{
			this.style.color = "black";
	
			useHex(tempQ,tempR).forceNewRule(this.value,position);
			updateMap();

		}

		
	}

	//remove a rule on at a time and then update the map to see if it's neccessary 
	function findFewerRules(){
		var tempRule = 0;
		
		for(var i=0; i<hexes.length; i++){
			
			for(var j=0; j<hexes[i].rules.length; j++){

				tempRule = hexes[i].rules[j].remove();	
				updateMap();			
				var button = document.getElementsByName(hexes[i].q+" "+hexes[i].r+" "+j);
				button[0].style.color = "red";
				

				if(trueMaps.length>1){

					hexes[i].forceNewRule(tempRule[0].name,j);
					updateMap();
					button[0].style.color ="black";

				}


			}



		}
		alert("finished");

	}

	function resetStuff(){

		hexes = hexesTemp;
		updateMap();

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

	function initElements(){
	document.getElementById("buttonNewMap").onclick = newMap;
	document.getElementById("buttonSolutions").onclick = download;

	newMap();
	

	
	}

function returnMapInFormat(){
	
	var temp = "";

	for(var i=0; i<hexes.length; i++){
		temp += hexes[i].q + " "+hexes[i].r +" "+trueMaps[0][i];
		
		for(var j=0; j<hexes[i].rules.length; j++){
			if(hexes[i].rules[j].name!="empty"){
				temp += " "+hexes[i].rules[j].name;
			}
		}
		temp += "\n";
	}
	

	return temp;

}




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















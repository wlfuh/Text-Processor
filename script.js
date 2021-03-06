var over, out; //the overlay; variable that will hold the "outside" div
var c, ctx; //c is the canvas element, ctx is needed to paint shapes
var cHeight, cWidth; //canvas height and width
var firstCall=true; 
var list = []; //words from text are stored here
var a, words=[], values=[]; //a is the associative array of text and values, words-[] of words, values-[] of count
var plottingPoints = [];
var getX = 0, getY = 1; //seletors for plottingPoints
var pointXDistance, pointYDistance, gap;
var radius = 5; //radius for the points
var ticks = [1,2,5,10,20,50,100,500,1000];
var maxCount; //max value of values[]
var graphType, typeData; //what type of graph, and what type of data to graph
var textData;
window.onload=function(){ //Is called when page is loaded
	c = document.getElementById('graph');
	cHeight = c.offsetHeight-1;
	cWidth = c.offsetWidth-1;
	ctx = c.getContext('2d');
	a = new AssociativeArray();
	out = document.getElementById('outside');
	console.log("loaded called");
	if(!preload) //only transition when data is imported or the default is used
		transitionOut(importedData);
	this.textBox = document.getElementById('subitbox');
	textBox.addEventListener('click', textListener, false);
	}
	;
var textListener = function(e){
	var tbs = document.getElementsByTagName('textarea');
	for(i=0;i<tbs.length;i++){
		if(tbs[i].value!=null){
			transitionOut(tbs[i].value);
			return;
			}
		}
	sampleData(null);
	};
function transitionOut(data){ //For removing overlay, does not code for graph
	textData = data;
  over = document.getElementById('over');
	var msgover = document.getElementsByClassName('message')[0];
	msgover.style.display="none";
	over.addEventListener('transitionend', function(){over.style.display="none";sampleData(textData);},false);
	over.style.zIndex="-3";
	over.style.opacity="0";
	}
function sampleData(text){ //sets data
		ctx.clearRect(0,0,c.width,c.height); //empty canvas
		graphType = "bar"; //default types
		typeData="word";
		if(text!=null){ //checks if "text" has text
			list = parseText(text);
			dataToPlot(typeData);
			}
		else{ //the sample data
	  list[0] = "Cow";
	  list[1] = "Pig";
		list[2] = "Human";
		list[3] = "Cow";
		list[4] = "Cow";
		list[5] = "Wombat";
		list[6] = "Human";
		for(i=7;i<300;i++){
			list[i]="Pig";
			}
		for(i=300;i<500;i++){
			list[i]="pIg";
			}
		}
		dataToPlot(typeData);
	}
function parseText(rawData){ //parses words in string into an array
		rawData = rawData.trim();
		var newString = rawData.valueOf();
		console.log(rawData);
		for(i=0;i<rawData.length;i++){
			var firstChar = newString.charAt(i).toUpperCase();
					if(firstChar.toLowerCase() == firstChar){
						newString=newString.substring(0,i)+" "+newString.substring(i+1,newString.length);
						}
			}
		var newList = newString.split(" ");
		for(j=0;j<newList.length;j++){
			newList[j].trim();
			if(newList[j]==""){
				newList.splice(j,1);
			  j--;
				}	
			}
			return newList;
	}
function findPoints(){
		a.sortByDesNum();
		words=a.items;
		for(i=0;i<words.length;i++)
			values[i]=words[i].value;
		maxCount = Math.max.apply(null, values);
	 	pointYDistance = (cHeight-radius)/maxCount;
		pointXDistance = cWidth/words.length;
		gap = pointXDistance * 0.1;
		pointXDistance = 0.8*pointXDistance + gap;
		var startX = gap;
		for(i=0;i<words.length;i++){
			plottingPoints[i] = [startX, cHeight-pointYDistance*words[i].value];
			startX+=(pointXDistance+gap);
		}
	}
function drawGraph(type){
		if(firstCall){
			clearEvery();
			firstCall=false;
		}
		ctx.clearRect(0,0,c.width,c.height);
		var nodes = out.getElementsByTagName('DIV');
		var i=0;
		while (i<nodes.length){
    if (nodes[i].name== "hover") 
    	out.removeChild(nodes[i]);
    else
    	i++;
  	}
		this.graphType=type;
		if(type=="bar")
			drawBarGraph();
		else if(type=="scatter")
			drawScatter();
		else
			drawLineGraph();
	}
function drawScatter(){;
		for(i=0;i<words.length;i++){
				ctx.beginPath();
				ctx.arc(plottingPoints[i][getX], plottingPoints[i][getY], radius, 0, 2*Math.PI,false);
				ctx.fillStyle = "red";
				ctx.fill();
			}
		hoverArea(pointXDistance,"");
	}
function drawLineGraph(){
		for(i=0;i<plottingPoints.length;i++){
				if(1+i<plottingPoints.length){
					ctx.beginPath();
     			ctx.moveTo(plottingPoints[i][getX], plottingPoints[i][getY]);
      		ctx.lineTo(plottingPoints[i+1][getX], plottingPoints[i+1][getY]);
      		ctx.strokeStyle = "orange";
      		ctx.stroke();
					}		
			}
		drawScatter();
	}
function drawBarGraph(){
	for(i=0;i<plottingPoints.length;i++){
			ctx.fillStyle = "blue";
			ctx.fillRect(plottingPoints[i][getX], plottingPoints[i][getY], pointXDistance, pointYDistance * values[i]);
		}
	hoverArea(pointXDistance,"bar");
	}
function drawLabel(){ //For count of word
		var gt = document.getElementById("graphTitle");
		gt.innerHTML="Amount of Words";
		//y-axis
		var interval = function(){
					for(i=0;i<ticks.length;i++){ //note there can only be 10 or less spots in the interval
						if(maxCount<=(ticks[i]*10)){
								return ticks[i];
				}		
			}
		console.log("error somehow");
			};
		for(j=Math.floor(maxCount/interval());j>=0;j--){
				var div = document.createElement("div");
				var num = j*interval();
				div.className="Labels";
				div.innerHTML=num+"-";
				div.style.left=386-11*(num.toString().length-1)+"px";
				div.style.top=c.offsetTop+(maxCount-num)*pointYDistance-7
				+"px";
				out.appendChild(div);
			}
		drawTitleLabel("Number of words", "Word");
	}
function clearEvery(){
		ctx.clearRect(0,0,c.width,c.height);
		var nodes = out.getElementsByTagName('DIV');
		var i=0;
    while (i<nodes.length){
    if (nodes[i].className.split(" ")[0] == "Labels") 
    	out.removeChild(nodes[i]);
    else
    	i++;
  	}
	}
function drawTitleLabel(verticalText, horizontalText){
		var div = document.createElement("div");
		var div2= document.createElement("div");
		div.className="Labels vertical";
		div2.className="Labels";
		div.innerHTML=verticalText;
		div2.innerHTML=horizontalText;
		div.style.left="250px";
		div.style.top=c.offsetTop+cHeight/2-verticalText.length+"px";
		div2.style.left=c.offsetLeft+cWidth/2-horizontalText.length+"px";
		div2.style.top=c.offsetTop+cHeight+50+"px";
		out.appendChild(div);
		out.appendChild(div2);
	}	 

function hoverArea(hoverWidth, specs){ //specific
	var quote = "\"";
		for(i=0;i<plottingPoints.length;i++){
				var div = document.createElement("div");
				var leftValue=c.offsetLeft+1+plottingPoints[i][getX];
				var topValue=c.offsetTop+plottingPoints[i][getY];
				div.className="Labels";
				div.name="hover";
				if(specs=="bar"){
					div.style.height=pointYDistance * values[i]+"px";
					div.style.width=hoverWidth+"px";
				}
				else{
					div.style.height=2*radius+"px";
					div.style.width=2*radius+"px";
					div.style.borderRadius=radius+"px";
					leftValue-=5;
					topValue-=5;
				}
				div.style.left=leftValue+"px";
				div.style.top=topValue+"px";
				if(typeData=="word")
					div.title="The word "+quote+words[i].key+quote+" appears "+words[i].value+" times";
				else
					div.title="The letter \""+words[i].key+"\" appears "+words[i].value+" times";
				out.appendChild(div);
			}
	}
function dataToPlot(type){
	typeData=type;
	firstCall=true;
	plottingPoints=[]; //removes points
	var w = document.getElementById('wrd');
	var l = document.getElementById('ltr');
		if(type=="word"){
			wordDist(graphType);
			w.className="dataMode selected";
			l.className="dataMode";
		}
		else{
			letterDist(graphType);
			l.className="dataMode selected";
			w.className="dataMode";
		}
	}
function wordDist(type){
	a = new AssociativeArray();
	a.items=[];
	var x = 0;
	while(x!=list.length){
			a.add(list[x].charAt(0).toUpperCase()+list[x].substring(1,list[x].length).toLowerCase()); //format all words to be capitilized
			x++;
			}
		findPoints();
		if(type=="bar"){
			drawGraph("bar");
		}
		else{
			drawGraph(type);
			}			
		drawLabel();
	}
function letterDist(type){
	a=new AssociativeArray();
	a.items=[];
	var x = 0;
	while(x!=list.length){
		var i=0;
		while(i!=list[x].length){
			a.add(list[x].charAt(i).toUpperCase());
			i++;
		}
		x++;
		}
	findPointsLetters();
	if(type=="bar"){
			drawGraph("bar");
			hoverArea(pointXDistance,"bar");
		}
		else{
			drawGraph(type);
			hoverArea(pointXDistance,"");
			}	
	drawLettersLabel();
	}

function findPointsLetters(){
		a.sortByKey();
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

function drawLettersLabel(){
	var gt = document.getElementById("graphTitle");
		gt.innerHTML="Frequency of Letters";
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
		drawTitleLabel("Number of letters", "Letter");
		//x-axis
		for(i=0;i<words.length;i++){
				var div = document.createElement("div");
				div.className="Labels";
				div.innerHTML="|"+"</br>"+words[i].key;
				div.style.left=gap*(i+1)+401+pointXDistance*i+"px";
				div.style.width=pointXDistance+"px";
				div.style.top=c.offsetTop+c.height-3+"px";
				out.appendChild(div);
			}
	}
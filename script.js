
var inputDisplay = document.getElementById('input')
var phaseDisplay = document.getElementById("phase")
var outputDisplay = document.getElementById("output")
const carbonInput = document.getElementById("carbonInput")
const temperatureInput = document.getElementById("temperatureInput")
const button = document.getElementById("button")



    var width = 1500;
    var height = 1000;

    var xScale = d3.scaleLinear().domain([0, 6.67]).range([0, 1334]);
    var yScale = d3.scaleLinear().domain([0, 1600]).range([800,0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    const svg = d3.select(".Phase-Diagram")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "Phase_Diagram")
        .append("g")
        .attr("transform", "translate(100,100)");
        

    svg.append("g")
        .attr("class","x-axis")
        .attr("transform","translate(0,800)")
        .call(xAxis);
    



    svg.append("g")
        .attr("class","y-axis")
        .call(yAxis)
    svg.append("text")
    .attr("class", "y-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -350)
    .attr("y", -70) 
    .attr("font-size", "30px")
    .style("text-anchor", "middle")
    .text("Temperature (°C)");



    

              

const phases=[
			{ name: "Background",
       vertx:[],
       verty:[],  
       points: "0,800 0,0 1334,0 1334,800" },

			{vertx:[0,0.76,2.1,0.16,0], 
			verty:[910,727,1147,1493,1410], 
			name:"Austenite", 
			points: "0,345 152,436.5 420,226.5 32,53.5 0,95"},
			
			
			{vertx:[0.008,6.67,6.67,0.022],
			verty:[0,0,727,727], 
			name:"Alpha Ferrite + Cementite", 
			leftPhase:"Alpha Ferrite",
			leftVertices:{x1:0.008,y1:0,x2:0.022,y2:727},
			rightPhase:"Cementite",
			rightVertices:{x1:6.67,y1:0,x2:6.67,y2:727},
			points: "1.6,800 4.4,436.5 1334,436.5 1334,800"},
			
			
			{vertx:[0.022,0.76,0],
			verty:[727,727,910], 
			name:"Alpha Ferrite + Austenite",
			leftPhase:"Alpha Ferrite",
			leftVertices:{x1:0.022,y1:727,x2:0,y2:910},
			rightPhase:"Austenite",
			rightVertices:{x1:0.76,y1:727,x2:0,y2:910},
			points: "0,345 4.4,436.5 152,436.5"},
			
			
			{vertx:[0.008,0.022,0],
			verty:[0,727,910], 
			name:"Alpha Ferrite",
			points: "0,800 1.6,800 4.4,436.5 0,345"},
			
			
			{vertx:[0.76,6.67,6.67,2.1],
			verty:[727,727,1147,1147], 
			name:"Austenite + Cementite",
			leftPhase:"Austenite",
			leftVertices:{x1:0.76,y1:727,x2:2.1,y2:1147}, 
			rightPhase:"Cementite",
			rightVertices:{x1:6.67,y1:727,x2:6.67,y2:1147},
			points: "152,436.5 420,226.5 1334,226.5 1334,436.5"},
			
			
			{vertx:[2.1,4.3,0.51,0.16], 
			verty:[1147,1147,1493,1493], 
			name:"Austenite + Liquid",
			leftPhase:"Austenite",
			leftVertices:{x1:2.1,y1:1147,x2:0.16,y2:1493}, 
			rightPhase:"Liquid",rightVertices:{x1:4.3,y1:1147,x2:0.51,y2:1493},
			points: "32,53.5 102,53.5 860,226.5 420,226.5"},
			
			
			{vertx:[0,0.16,0.09], 
			verty:[1410,1493,1493], 
			name:"Delta Ferrite + Austenite",
			leftPhase:"Delta Ferrite",
			leftVertices:{x1:0,y1:1410,x2:0.09,y2:1493}, 
			rightPhase:"Austenite",
			rightVertices:{x1:0,y1:1410,x2:0.16,y2:1493},
			points: "32,53.5 0,95 18,53.5"},
			
			
			{vertx:[0,0.09,0],
			verty:[1410,1493,1535],
			name:"Delta Ferrite",
			points: "0,95 18,53.5 0,32.5"},
			
			
			{vertx:[0.09,0.51,0],
			verty:[1493,1493,1535],
			name:"Delta Ferrite + Liquid",
			leftPhase:"Delta Ferrite",
			leftVertices:{x1:0.09,y1:1493,x2:0,y2:1535},
			rightPhase:"Liquid",
			rightVertices:{x1:0.51,y1:1493,x2:0,y2:1535},
			points: "0,32.5 18,53.5 102,53.5"},
			
			
			{vertx:[0,0.51,4.3,6.67,6.67,0],
			verty:[1535,1493,1147,1320,1600,1600],
			name:"Liquid",
			points: "0,0 0,32.5 860,226.5 1334,140 1334,0"},
			
			
			{vertx:[4.3,6.67,6.67],
			verty:[1147,1147,1320],
			name:"Liquid + Cementite",
			leftPhase:"Liquid",
       leftVertices:{x1:4.3,y1:1147,x2:6.67,y2:1320},
			rightPhase:"Cementite",
			rightVertices:{x1:6.67,y1:1149,x2:6.67,y2:1320},
			points: "860,226.5, 1334,226.5 1334,140"}
			]

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const startColor = '#C0C0FF';
const endColor = '#400080';
const interpolatePurple = d3.interpolate(startColor, endColor);
const colorScalePurple = d3.scaleOrdinal().range(d3.range(10).map(i => interpolatePurple(i / 9)));

  const diagram = svg.selectAll("polygon")
    .data(phases)
    .enter().append("polygon")
    .attr("points", d => d.points)
    .attr("fill", (d,i) => colorScale(i))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("class", "polygon")
    .on("mouseover", (event, d) => {
        phaseDisplay.innerHTML = "<strong>Phases: </strong>" + d.name;
    });

diagram.on("mousemove", (event) => {
    var xPos = ((event.offsetX - 100) * 0.005);
    var yPos = 1800 - (event.offsetY * 2);

    if (!isNaN(xPos) && !isNaN(yPos)) { 
        inputDisplay.innerHTML = "<strong>Carbon Percentage :</strong> " + xPos.toFixed(3) + "%" + "<br><strong>Temperature :</strong> " + yPos + "\u00B0C";
    }
});

diagram.on("click", function onclick(event, d) { 
    var mouseX = ((event.offsetX - 100) * 0.005); 
    var mouseY = 1800 - (event.offsetY * 2);

    if (d.name.includes("+")) {
        var leftVertices = d.leftVertices;
        var rightVertices = d.rightVertices;

        var m1 = (leftVertices.y2 - leftVertices.y1) / (leftVertices.x2 - leftVertices.x1);
        var b1 = leftVertices.y1 - m1 * leftVertices.x1;
        CPLP = (mouseY - b1) / m1;

        var m2 = (rightVertices.y2 - rightVertices.y1) / (rightVertices.x2 - rightVertices.x1);
        var b2 = rightVertices.y2 - m2 * rightVertices.x2;

        if (d.rightPhase == "Cementite") {
            CPRP = 6.67;
        } else {
            CPRP = (mouseY - b2) / m2;
        }

        WPLP = ((CPRP - mouseX) / (CPRP - CPLP)) * 100;
        WPRP = ((mouseX - CPLP) / (CPRP - CPLP)) * 100;
      if(mouseX<0.76 && mouseY<727){
        WPLP2=((0.76-mouseX)/(0.76-CPLP))*100;
        WPRP2=((mouseX-CPLP)/(0.76-CPLP))*100;
      }
      else if(mouseX>0.76 && mouseX<2.10 && mouseY<727){
        WPLP2=((CPRP-mouseX)/(CPRP-0.76))*100;
        WPRP2=((mouseX-0.76)/(CPRP-0.76))*100;
      }

        outputDisplay.innerHTML = "<strong>Carbon% in " + d.leftPhase + ":</strong> " + CPLP.toFixed(3) +
            "<br><strong>Carbon% in " + d.rightPhase + ":</strong> " + CPRP.toFixed(3) +
            "<br><strong>Weight% of " + d.leftPhase + ":</strong> " + WPLP.toFixed(2) +
            "<br><strong>Weight% of " + d.rightPhase + ":</strong> " + WPRP.toFixed(2)


      if(mouseX<0.76 && mouseY<727){
        console.log("hii")
      outputDisplay.innerHTML+="<br><strong>Weight% of Pro-Eutectiod Ferrite=</strong> "+WPLP2.toFixed(2)+"<br><strong>Weight% of Pearlite=</strong> "+WPRP2.toFixed(2)}
        else if(mouseX>0.76 && mouseX <2.10 && mouseY<727){
           outputDisplay.innerHTML+="<br><strong>Weight% of Pearlite=</strong> "+WPLP2.toFixed(2)+"<br><strong>Weight% of Pro-Eutectoid Cementite=</strong> "+WPRP2.toFixed(2)
        }











      
        svg.select(".line").remove();
        svg.append("line")
            .attr("class","line")
            .attr("x1", CPLP / 0.005)
            .attr("y1", (1600 - mouseY) / 2)
            .attr("x2", CPRP / 0.005)
            .attr("y2", (1600 - mouseY) / 2)
            .attr("stroke", "black")
            .style("stroke-dasharray","3,3")
            .attr("stroke-width", 1);
    } else {
        outputDisplay.textContent = "";
    }

    console.log(mouseX, mouseY);


    svg.select(".pointer").remove();

    svg.append("g")
        .attr("class", "pointer")
        .attr("transform", "translate(" + mouseX/0.005 + "," + (1600-mouseY)/2 + ")scale(0.3)")
        .append("path")
        .attr("d", "M0-1c-14.5-25.6-14.5-25.7-14.5-33.8c0-8.1,6.5-14.6,14.5-14.6s14.5,6.6,14.5,14.6C14.5-26.7,14.5-26.6,0-1z")
        .append("path")
        .attr("d", "M0-49c7.7,0,14,6.3,14,14.1c0,8,0,8.1-14,32.8c-14-24.7-14-24.9-14-32.8C-14-42.7-7.7-49,0-49 M0-50c-8.3,0-15,6.8-15,15.1 S-15-26.5,0,0c15-26.5,15-26.5,15-34.9S8.3-50,0-50L0-50z");

});


svg.select("#line").remove()
svg.append("line")
    .attr("id", "line")
    .attr("x1", 152)
    .attr("y1", 436.5)
    .attr("x2", 152)
    .attr("y2", 800)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .style("stroke-dasharray","3,3")

svg.append("line")
    .attr("x1", 420)
    .attr("y1", 226.5)
    .attr("x2", 420)
    .attr("y2", 800)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .style("stroke-dasharray","3,3")

svg.append("line")
    .attr("x1", 860)
    .attr("y1", 226.5)
    .attr("x2", 860)
    .attr("y2", 800)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .style("stroke-dasharray","3,3")

svg.append("line")
    .attr("x1", 4.4)
    .attr("y1", 436.5)
    .attr("x2", 4.4)
    .attr("y2", 800)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .style("stroke-dasharray","3,3")


svg.append("text")
    .attr("x", 152) 
    .attr("y", 455) 
    .text("0.76%") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", 4.4) 
    .attr("y", 455) 
    .text("0.022%") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", 420) 
    .attr("y", 245) 
    .text("2.10%") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", 860) 
    .attr("y", 245) 
    .text("4.30%") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", 1280) 
    .attr("y", 455) 
    .text("6.67%") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", -40) 
    .attr("y", 445) 
    .text("727") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", -40) 
    .attr("y", 355) 
    .text("910") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", -45) 
    .attr("y", 245) 
    .text("1147") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", 10) 
    .attr("y", 100) 
    .text("1410") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", -45) 
    .attr("y", 60) 
    .text("1493") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", -45) 
    .attr("y", 40) 
    .text("1535") 
    .attr("font-size", "18px") 
    .attr("fill", "black");
svg.append("text")
    .attr("x", 1334) 
    .attr("y", 140) 
    .text("1320") 
    .attr("font-size", "18px") 
    .attr("fill", "black");






function pnpoly(vertx,verty,testx,testy,phaseName) {
	var i,j,c=false;
	
	for(i = 0, j = vertx.length - 1; i < vertx.length; j = i++){
		if(((verty[i]>testy)!=(verty[j]>testy))&&(testx<(vertx[j]-vertx[i])*(testy-verty[i])/(verty[j]-verty[i])+vertx[i])){
		c=!c;}
	}
	if(c==true){phaseDisplay.innerHTML="<strong>Phase:</strong> "+phaseName
				};}



function indexSelect(vertx,verty,testx,testy){
	var i,j,c=false;
	
	for(i = 0, j = vertx.length - 1; i < vertx.length; j = i++){
		if(((verty[i]>testy)!=(verty[j]>testy))&&(testx<(vertx[j]-vertx[i])*(testy-verty[i])/(verty[j]-verty[i])+vertx[i])){
		c=!c;}
	}
	if(c==true){currentIndex=index};}








  function onclick(){
	var xPos=parseFloat(carbonInput.value)
	var yPos=parseFloat(temperatureInput.value)
	if(xPos<=6.67&& xPos>=0&&yPos<=1600&&yPos>=0){
	
	for (let index = 0; index < phases.length; index++) {
        pnpoly(phases[index].vertx, phases[index].verty, xPos, yPos, phases[index].name);
    }
	if (!isNaN(xPos) && !isNaN(yPos)) { 
        inputDisplay.innerHTML = "<strong>Carbon Percentage :</strong> " + xPos.toFixed(2) + "%" + "<br><strong>Temperature :</strong> " + yPos + "\u00B0C";
    }
	
	if(phaseDisplay.textContent.includes("+")){
		currentIndex=-1
		for(index = 0; index < phases.length; index++){
		indexSelect(phases[index].vertx,phases[index].verty,xPos,yPos,);}
		if(currentIndex !==-1){
		outputCal(xPos,yPos,currentIndex);
		outputDisplay.innerHTML="<strong>Carbon% in "+phases[currentIndex].leftPhase+"=</strong> "+CPLP.toFixed(3)+"<br><strong>Carbon% in "+phases[currentIndex].rightPhase+"=</strong> "+CPRP.toFixed(3)
									+ "<br><strong>Weight% of "+phases[currentIndex].leftPhase+"=</strong> "+WPLP.toFixed(2)+"<br><strong>Weight% of "+phases[currentIndex].rightPhase+"=</strong> "+WPRP.toFixed(2)
    
    if(xPos<0.76 && yPos<727){
      console.log("hii")
    outputDisplay.innerHTML+="<br><strong>Weight% of Pro-Eutectiod Ferrite=</strong> "+WPLP2.toFixed(2)+"<br><strong>Weight% of Pearlite=</strong> "+WPRP2.toFixed(2)}
      else if(xPos>0.76 && xPos <2.10 && yPos<727){
         outputDisplay.innerHTML+="<br><strong>Weight% of Pearlite=</strong> "+WPLP2.toFixed(2)+"<br><strong>Weight% of Pro-Eutectoid Cementite=</strong> "+WPRP2.toFixed(2)
      }
    
    
    
		 svg.select(".line").remove();
        svg.append("line")
            .attr("class","line")
            .attr("x1", CPLP / 0.005)
            .attr("y1", (1600 - yPos) / 2)
            .attr("x2", CPRP / 0.005)
            .attr("y2", (1600 - yPos) / 2)
            .attr("stroke", "black")
            .style("stroke-dasharray","3,3")
            .attr("stroke-width", 1);
  }
	else{outputDisplay.textContent=""}
  svg.select(".pointer").remove();

    svg.append("g")
        .attr("class", "pointer")
        .attr("transform", "translate(" + xPos/0.005 + "," + (1600-yPos)/2 + ")scale(0.3)")
        .append("path")
        .attr("d", "M0-1c-14.5-25.6-14.5-25.7-14.5-33.8c0-8.1,6.5-14.6,14.5-14.6s14.5,6.6,14.5,14.6C14.5-26.7,14.5-26.6,0-1z")
        .append("path")
        .attr("d", "M0-49c7.7,0,14,6.3,14,14.1c0,8,0,8.1-14,32.8c-14-24.7-14-24.9-14-32.8C-14-42.7-7.7-49,0-49 M0-50c-8.3,0-15,6.8-15,15.1 S-15-26.5,0,0c15-26.5,15-26.5,15-34.9S8.3-50,0-50L0-50z");
  }
	else{inputDisplay.innerHTML = "<strong>Carbon Percentage :</strong> Invalid" + "<br><strong>Temperature :</strong> Invalid";
		}
  }


  }

function outputCal(x,y, index) {
    var leftVertices = phases[index].leftVertices;
    var rightVertices = phases[index].rightVertices;

    var m1 = (leftVertices.y2 - leftVertices.y1) / (leftVertices.x2 - leftVertices.x1);
    var b1 = leftVertices.y1 - m1 * leftVertices.x1;
    CPLP = (y - b1) / m1;
	

    var m2 = (rightVertices.y2 - rightVertices.y1) / (rightVertices.x2 - rightVertices.x1);
    var b2 = rightVertices.y2 - m2 * rightVertices.x2;
    if(phases[index].rightPhase=="Cementite"){CPRP=6.67}
	else{CPRP = (y - b2) / m2};
	WPLP = ((CPRP-x)/(CPRP-CPLP))*100;
	WPRP = ((x-CPLP)/(CPRP-CPLP))*100;


  var xPos=parseFloat(carbonInput.value)
  var yPos=parseFloat(temperatureInput.value)

  if(xPos<0.76 && yPos<727){
    WPLP2=((0.76-x)/(0.76-CPLP))*100;
    WPRP2=((x-CPLP)/(0.76-CPLP))*100;
	}
  else if(xPos>0.76 && xPos<2.10 && yPos<727){
    WPLP2=((CPRP-x)/(CPRP-0.76))*100;
    WPRP2=((x-0.76)/(CPRP-0.76))*100;
  }
    
}


  button.addEventListener("click",onclick)
svg.append("text")
    .attr("class", "x-axis-label")
    .attr("x", (width / 2)-100)
    .attr("y", height-140)
    .attr("font-size","30px")
    .style("text-anchor", "middle")
    .text("Carbon Percentage (%)");


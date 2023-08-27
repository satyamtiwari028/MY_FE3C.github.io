var c=document.getElementById("Phase_Diagram");
var c2=document.getElementById("Temperature_Scale");
var inputDisplay = document.getElementById('input')
var phaseDisplay = document.getElementById("phase")
var outputDisplay = document.getElementById("output")
const carbonInput = document.getElementById("carbonInput")
const temperatureInput = document.getElementById("temperatureInput")
const button = document.getElementById("button")

var ctx=c.getContext("2d");
var ctx2=c2.getContext("2d");
ctx.lineWidth=1;
ctx.strokeStyle="purple"
ctx.beginPath()
ctx.moveTo(0,800)
ctx.lineTo(0,0)
ctx.lineTo(1334,0)
ctx.lineTo(1334,800)
ctx.lineTo(0,800)

ctx.moveTo(1334,436.5)
ctx.lineTo(4.4,436.5)
ctx.lineTo(0,345)
ctx.lineTo(152,436.5)

ctx.lineTo(420,226.5)
ctx.lineTo(1334,226.5)

ctx.moveTo(420,226.5)
ctx.lineTo(32,53.5)
ctx.lineTo(0,95)

ctx.lineTo(18,53.5)
ctx.lineTo(0,32.5)

ctx.lineTo(102,53.5)
ctx.lineTo(860,226.5)
ctx.lineTo(1334,140)
ctx.moveTo(18,51.5)
ctx.lineTo(102,52.5)
ctx.moveTo(4.4,436.5)
ctx.lineTo(1.6,800)
ctx.stroke()
ctx.closePath()




ctx.font = "20px Arial";
ctx.fillStyle = "black"

ctx.fillText("0.008%",1.6,795)
ctx.fillText("0.022%",4.4,456.5)
ctx.fillText("0.76%",152,456.5)
ctx.fillText("2.10%",420,246.5)
ctx.fillText("4.30%",860,246.5)
ctx.fillText("6.67%",1270,456.5)
ctx.fillText("\u03B4",0.3,60)
ctx.strokeStyle="black"
ctx.beginPath()
ctx.moveTo(15,70)
ctx.lineTo(30,110)
ctx.stroke()
ctx.closePath()
ctx.fillText("\u03B4+\u03B3",30,120)
ctx.font = "15px Arial";
ctx.fillText("\u03B4+L",15,50)

ctx.font = "30px Arial"
ctx.fillText("\u03B3",152,246.5)
ctx.fillText("\u03B1 + \u03B3",8,406.5)
ctx.fillText("\u03B3 + L",420,170)
ctx.fillText("L",850,120)
ctx.fillText("\u03B3 + Fe3C",860,320)
ctx.fillText("L + Fe3C",1170,200)
ctx.fillText("\u03B1 + Fe3C",500,600)



ctx2.font = "20px Arial";
ctx2.fillSyle = "black";
ctx2.fillText("0",70,800)
ctx2.fillText("727",50,436.5)
ctx2.fillText("910",50,345)
ctx2.fillText("1147",50,226.5)
ctx2.fillText("1410",50,95)
ctx2.fillText("1493",50,53.5)
ctx2.fillText("1535",50,32.5)

ctx2.font = "30px Arial";
ctx2.fillText("\u03B1",50,530)
ctx2.beginPath()
ctx2.moveTo(65,510)
ctx2.lineTo(100,450)
ctx2.stroke()
ctx2.closePath()






let currentIndex=-1

const phases=[
			{vertx:[0,0.76,2.1,0.16,0], verty:[910,727,1147,1493,1410], name:"Austenite"},
			{vertx:[0.008,6.67,6.67,0.022],verty:[0,0,727,727], name:"Ferrite + Cementite", 
			leftPhase:"Ferrite",leftVertices:{x1:0.008,y1:0,x2:0.022,y2:727}, rightPhase:"Cementite",rightVertices:{x1:6.67,y1:0,x2:6.67,y2:727}},
			{vertx:[0.022,0.76,0],verty:[727,727,910], name:"Ferrite + Austenite",
			leftPhase:"Ferrite",leftVertices:{x1:0.022,y1:727,x2:0,y2:910}, rightPhase:"Austenite",rightVertices:{x1:0.76,y1:727,x2:0,y2:910}},
			{vertx:[0.008,0.022,0],verty:[0,727,910], name:"Ferrite"},
			{vertx:[0.76,6.67,6.67,2.1],verty:[727,727,1147,1147], name:"Austenite + Cementite",
			leftPhase:"Austenite",leftVertices:{x1:0.76,y1:727,x2:2.1,y2:1147}, rightPhase:"Cementite",rightVertices:{x1:6.67,y1:727,x2:6.67,y2:1147}},
			{vertx:[2.1,4.3,0.51,0.16], verty:[1147,1147,1493,1493], name:"Austenite + Liquid",
			leftPhase:"Austenite",leftVertices:{x1:2.1,y1:1147,x2:0.16,y2:1493}, rightPhase:"Liquid",rightVertices:{x1:4.3,y1:1147,x2:0.51,y2:1493}},
			{vertx:[0,0.16,0.09], verty:[1410,1493,1493], name:"Delta Ferrite + Austenite",
			leftPhase:"Delta Ferrite",leftVertices:{x1:0,y1:1410,x2:0.09,y2:1493}, rightPhase:"Austenite",rightVertices:{x1:0,y1:1410,x2:0.16,y2:1493}},
			{vertx:[0,0.09,0],verty:[1410,1493,1535],name:"Delta Ferrite"},
			{vertx:[0.09,0.51,0],verty:[1493,1493,1535],name:"Delta Ferrite + Liquid",
			leftPhase:"Delta Ferrite",leftVertices:{x1:0.09,y1:1493,x2:0,y2:1535}, rightPhase:"Liquid",rightVertices:{x1:0.51,y1:1493,x2:0,y2:1535}},
			{vertx:[0,0.51,4.3,6.67,6.67,0],verty:[1535,1493,1147,1320,1600,1600],name:"Liquid"},
			{vertx:[4.3,6.67,6.67],verty:[1147,1147,1320],name:"Liquid + Cementite",
			leftPhase:"Liquid",leftVertices:{x1:4.3,y1:1147,x2:6.67,y2:1320}, rightPhase:"Cementite",rightVertices:{x1:6.67,y1:1149,x2:6.67,y2:1320}}
			]


c.addEventListener("click", function(event){
	
	
	let x = event.offsetX;
	let y = event.offsetY;
	var xPos = (event.offsetX)*0.005;
	var yPos = 1600-(event.offsetY*2);

	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(x,y,2,0, Math.PI*2);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	if(phaseDisplay.textContent.includes("+")){
		currentIndex=-1
		for(index = 0; index < phases.length; index++){
		indexSelect(phases[index].vertx,phases[index].verty,xPos,yPos,);}
		if(currentIndex !==-1){
		outputCal(xPos,yPos,currentIndex);
		outputDisplay.innerHTML="<strong>Carbon% in "+phases[currentIndex].leftPhase+"=</strong> "+CPLP.toFixed(3)+"<br><strong>Carbon% in "+phases[currentIndex].rightPhase+"=</strong> "+CPRP.toFixed(3)
									+ "<br><strong>Weight% of "+phases[currentIndex].leftPhase+"=</strong> "+WPLP.toFixed(3)+"<br><strong>Weight% of "+phases[currentIndex].rightPhase+"=</strong> "+WPRP.toFixed(3)}
		}
	else{outputDisplay.textContent=""}
	})


c.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
    const xPos = (event.offsetX) * 0.005;
    const yPos = 1600 - (event.offsetY * 2);


    for (let index = 0; index < phases.length; index++) {
        pnpoly(phases[index].vertx, phases[index].verty, xPos, yPos, phases[index].name);
    }
}



c.addEventListener("mousemove",coordinates)

function coordinates(event) {
    var xPos, yPos;

        xPos = (event.offsetX) * 0.005;
        yPos = 1600 - (event.offsetY * 2);

    if (!isNaN(xPos) && !isNaN(yPos)) { 
        inputDisplay.innerHTML = "<strong>Carbon Percentage :</strong> " + xPos.toFixed(2) + "%" + "<br><strong>Temperature :</strong> " + yPos + "\u00B0C";
    }
}


function pnpoly(vertx,verty,testx,testy,phaseName) {
	var i,j,c=false;
	
	for(i = 0, j = vertx.length - 1; i < vertx.length; j = i++){
		if(((verty[i]>testy)!=(verty[j]>testy))&&(testx<(vertx[j]-vertx[i])*(testy-verty[i])/(verty[j]-verty[i])+vertx[i])){
		c=!c;}
	}
	if(c==true){phaseDisplay.innerHTML="<strong>Phase:</strong> "+phaseName
				};
}

function indexSelect(vertx,verty,testx,testy){
	var i,j,c=false;
	
	for(i = 0, j = vertx.length - 1; i < vertx.length; j = i++){
		if(((verty[i]>testy)!=(verty[j]>testy))&&(testx<(vertx[j]-vertx[i])*(testy-verty[i])/(verty[j]-verty[i])+vertx[i])){
		c=!c;}
	}
	if(c==true){currentIndex=index};
	
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
	
	}

function onclick(){
	var xPos=parseFloat(carbonInput.value)
	var yPos=parseFloat(temperatureInput.value)
	if(xPos<=6.67&& xPos>=0&&yPos<=1600&&yPos>=0){
	let x = xPos/0.005;
	let y = (1600-yPos)/2;
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(x,y,2,0, Math.PI*2);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	
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
									+ "<br><strong>Weight% of "+phases[currentIndex].leftPhase+"=</strong> "+WPLP.toFixed(3)+"<br><strong>Weight% of "+phases[currentIndex].rightPhase+"=</strong> "+WPRP.toFixed(3)}
		}
	else{outputDisplay.textContent=""}}
	else{inputDisplay.innerHTML = "<strong>Carbon Percentage :</strong> Invalid" + "<br><strong>Temperature :</strong> Invalid";
		}
	
	
	
	
	
}

button.addEventListener("click",onclick)
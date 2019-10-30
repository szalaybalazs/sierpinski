var canvas, ctx;
var interval = null,
    timesToRun = 7,
    x = 1;
var toSplitTemp = [],
    toDraw = [],
    toSplit = []; 
var topCol = '#cc0000',
    rightCol = '#00cc00',
    leftCol = '#0000ff';
var colFil = true;
var duration = 1;

function triangle() {
    this.a = [0, 0];
    this.b = [0, 0];
    this.c = [0, 0];
    this.color = '';
}

function firstTri(){
    var first_tri = new triangle();
    first_tri.a = [canvas.width/2, 0];
    first_tri.b = [canvas.width, canvas.height];
    first_tri.c = [0, canvas.height];
    first_tri.color = rightCol;
    toDraw.push(first_tri);
    toSplit.push(first_tri);
}

window.onload = function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 700;
    
    start();
    loadGui();   
}

function start(){    
    firstTri();    
    interval = setInterval(draw, duration / timesToRun * 1000);    
}

function draw(){
    drawBlock(0,0, canvas.width,canvas.height,'#f4f4f4'); 
    
    for(var i = 0; i < toDraw.length; i++){  
        ctx.beginPath();
        ctx.moveTo(toDraw[i].a[0],toDraw[i].a[1]);
        ctx.lineTo(toDraw[i].b[0],toDraw[i].b[1]);
        ctx.lineTo(toDraw[i].c[0],toDraw[i].c[1]);
        ctx.closePath();
        
        if (colFil){
            ctx.fillStyle = toDraw[i].color; 

            ctx.fill(); 
        }else{
            ctx.lineWidth = 1;
            ctx.strokeStyle = toDraw[i].color;
            ctx.stroke();
        }
    }    
    toDraw = [];
   
    for(var i = 0; i < toSplit.length; i++)
        split(toSplit[i]);
	
    toSplit = [];
    toSplit = toSplitTemp;
    toSplitTemp = [];
	
    if(x === timesToRun)
        clearInterval(interval);
	
    x++;    
}

function split(tri){
    var a = tri.a;
    var b = tri.b;
    var c = tri.c;
    var i = [(tri.a[0]+tri.c[0])/2, (tri.a[1]+tri.c[1])/2];
    var j = [(tri.a[0]+tri.b[0])/2, (tri.a[1]+tri.b[1])/2]; 
    var k = [(tri.c[0]+tri.b[0])/2, (tri.c[1]+tri.b[1])/2];
	
    var top = new triangle();
        top.a = a;
        top.b = j;
        top.c = i;
        top.color = topCol;    
    toDraw.push(top);
    toSplitTemp.push(top);    
	
    var right = new triangle();
        right.a = j;
        right.b = b;
        right.c = k;
        right.color = rightCol;    
    toDraw.push(right);
    toSplitTemp.push(right);
    
    var left = new triangle();
        left.a = i;
        left.b = k;
        left.c = c;
        left.color = leftCol;    
    toDraw.push(left);
    toSplitTemp.push(left);
}

function drawBlock(x,y, width,height, colour){
    ctx.fillStyle = colour;
    ctx.fillRect(x,y, width,height, colour);
}

//dat.gui
var GUIControls = function() {
    this.Iteráció = timesToRun;
    this['Időtartam'] = duration;
    this.Kitöltés = colFil;
    this.Felső = topCol;
    this.Jobb = rightCol;
    this.Bal = leftCol;
    
    this['RAJZOLD!'] = function(){
				clearInterval(interval);
        drawBlock(0,0, canvas.width,canvas.height, '#f4f4f4'); 
        interval = null;
        timesToRun = this.Iteráció;
        toDraw = [];
        toSplit = [];
        x = 1;
        toSplitTemp = [];
        topCol = this.Felső;
        rightCol = this.Jobb;
        leftCol = this.Bal;
        colFil = this.Kitöltés; 
        duration = this['Időtartam'];
        start();
    };
};

function loadGui(){
    var item = new GUIControls();
    var gui = new dat.GUI();
    gui.add(item, 'Iteráció', 1, 20).step(1);
    gui.add(item, 'Időtartam', 0, 1000).step(.1);
    gui.add(item, 'Kitöltés');
		gui.addColor(item, 'Felső');
    gui.addColor(item, 'Jobb');
    gui.addColor(item, 'Bal');
    gui.add(item, 'RAJZOLD!');
    //gui.close();
};
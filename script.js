const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var shapeColor = ["red","cyan","purple","yellow", "orange", "gold", "blue", "green"];
var randColor = shapeColor[Math.floor(Math.random() * shapeColor.length)];

    //draws circle
    function drawCircle(cx,cy,spikes,Radius){
      var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/spikes;

      ctx.beginPath();
      for(i=0;i<spikes;i++){
        ctx.arc(x, y, Radius, 0, 2 * Math.PI);
      }
     
      ctx.closePath();
      
      //Line Size and Outline Color
      ctx.lineWidth=2;
      ctx.strokeStyle=randColor;
      ctx.stroke();
}

function init(){
    particleArray = [];
    for (let i=0; i<50; i++){
        let moveRadius = Math.random() * canvas.width;
        let step = (Math.random() * 1.010)+1.010;
        let position = Math.random() * (Math.PI * 2);
        let size = Math.random() * 15;

        particleArray.push(new Particle(moveRadius, step, position, size));
    }
}

class Particle {
    constructor(moveRadius, step, position, size){
        this.moveRadius = moveRadius;
        this.step = step;
        this.position = position;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        drawCircle(Math.cos(this.position)*this.moveRadius + canvas.width/2, 
            Math.sin(this.position)*this.moveRadius + canvas.height/2, 3, this.size, this.size);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
    update(){
        this.position += this.step;
        this.draw();
    }
}

function animation(){
    requestAnimationFrame(animation);
    ctx.fillStyle = 'rgba(0,0,0,.01)';
	ctx.fillRect(0,0,innerWidth,innerHeight);
	
	for (let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
	}
}
init();
animation();

window.addEventListener('resize',
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		init();
	}
)
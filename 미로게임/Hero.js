class Hero extends GameObject{
    constructor(container,x,y,width,height,velX,velY,bg,border,borderColor){
        super(container,x,y,width,height,velX,velY,bg,border,borderColor);
        //4개의 센서를 보유하자
        //container,hero,x,y,width,height,bg,border,borderColor
        this.upSensor=new RightSensor(this.div,this,3,0,this.width-6,3,"blue",0,"");
        this.rightSensor=new RightSensor(this.div,this,this.width-3,3,3,this.height-6,"blue",0,"");
        this.downSensor=new RightSensor(this.div,this,3,this.width-3,this.width-6,3,"blue",0,"");
        this.leftSensor=new RightSensor(this.div,this,0,3,3,this.height-6,"blue",0,"");
    }
    //오버라이딩 하자
    tick(){
        this.x+=this.velX;
        this.y+=this.velY;
    }
    render(){
        //현재 화면에 등장한 벽돌과 
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        for(let i=0;i<brickArray.length;i++){
            for(let a=0;a<brickArray[i].length;a++){
                let brick=brickArray[i][a];
                if(brick!=0){
                    if(collisionCheck(hero.div,brick.div)){
                        //주인공 생상을 분홍색으로
                        this.div.style.background="pink";
                    }// }else{
                    //     this.div.style.background="red";
                    // }
                }
            }
        }
    }
    
}   





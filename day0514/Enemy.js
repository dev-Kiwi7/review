class Enemy extends GameObject{
    constructor(container,src,x,y,width,height,velX,velY){
        super(container,src,x,y,width,height,velX,velY);
    }

    //물리량 변화시키기
    tick(){
        this.x+=this.velX;       
    }

    //변화물리량 화면에 뿌리긴
    render(){
        this.img.style.left=this.x+"px";
    } 
}
class Hero extends GameObject{
    //js에서는 생성자를 작성하기만 해도 super()를 명시해야 한다
    constructor(container,src,x,y,width,height,velX,velY){
        super(container,src,x,y,width,height,velX,velY)
    }
    //물리량 변화시키기
    tick(){
        this.x+=this.velX;
        this.y+=this.velY;
        
    }

    //변화물리량 화면에 뿌리긴
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }     
}
class GameObject{
    
    constructor(container,src,x,y,width,height,velX,velY){
        this.container=container;
        this.src=src;
        this.img=document.createElement("img");
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.velX=velX;
        this.velY=velY;
        
        
        
        this.img.src=this.src;
        this.img.style.width=width+"px";
        this.img.style.height=height+"px";
        this.img.style.left=x+"px";
        this.img.style.top=y+"px";
        this.img.style.position="absolute";

        
        this.container.appendChild(this.img);

    }
    //중복되는 메서드를 부모클래스에 정의하는 것은 올바른 개발방식이다
    //하지만 게임에 등장할 모든 객체들의 움직임을 부모가 미래 예측 
    //물리량 변화시키기
    tick(){};//{몸체}가 없는 메서드를 추상메서드

    //변화물리량 화면에 뿌리긴
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }   
}
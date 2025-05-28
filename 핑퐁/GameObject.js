class GameObject{
    constructor(container,x,y,width,height,velX,velY,bg,border){
        this.container=container;
        //게임 완성 후, div를 버리지 말고 그대로 유지하되 이미지를 배경처리 
        //이미지로 못하는 이유=>이미지는 부모 기능이 없음
        this.img=document.createElement("img");
        this.x=x;
        this.y=y;
        this.div=document.createElement("div");
        this.width=width;
        this.height=height;
        this.velX=velX;//속도
        this.velY=velY;
        this.bg=bg;
        this.border=border;

        //style 및 조립
        this.div.style.position="absolute";
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.div.style.backgroundColor=this.bg;
        this.div.style.border = border+'px solid red';

        this.div.style.width=this.width+"px";
        this.div.style.height=this.height+"px";

        this.container.appendChild(this.div);
    }

    tick(){};//오브젝트의 변하게 될 물리량 계산 update() tick()
    render(){};//변화된 물리량을 화면에 반영하는 그래픽작업 render(),paint()
}
class Sensor extends GameObject{
    constructor(container,hero,x,y,width,height,bg,border,borderColor){
        super(container,x,y,width,height,0,0,bg,border,borderColor)

        //부모에 코드에 존재하지 않는 것만 자식이 보유
        this.hero=hero;

    }
}
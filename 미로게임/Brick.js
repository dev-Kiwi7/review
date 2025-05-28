class Brick extends GameObject{
    constructor(container,x,y,width,height,velX,velY,bg,border,borderColor){
        super(container,x,y,width,height,velX,velY,bg,border,borderColor) //js는 java처럼 super()자동으로 호출해주는 기능 없고, 개발자가 무조건 나서야 함
    }
}
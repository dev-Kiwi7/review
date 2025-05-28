class Bullet extends GameObject{
    //js에서는 생성자를 작성하기만 해도 super()를 명시해야 한다
    constructor(container,src,x,y,width,height,velX,velY){
        super(container,src,x,y,width,height,velX,velY)
        console.log(this.img.style.top);
    }

    //제거 메서드
    removeObject(array,target){
        //1.화면에서 제거
        //2.총알이 있던 배열에서도 제거

        this.container.removeChild(array[array.indexOf(target)].img); 

        //배열에서도 총알제거
        array.splice(array.indexOf(target),1);
    }
    //메서드 오버라이딩
    //물리량 변화시키기
    tick(){
        this.x+=this.velX;
        // this.y+=this.velY;
    }

    //화면에 뿌리기
    render(){
        for(let i=0;i<enemyArray.length;i++){
            let enemy=enemyArray[i]; //적군 꺼내기 
            if(collisionCheck(this.img,enemy.img)){//충돌
                this.removeObject(enemyArray,enemy);
                this.removeObject(bulletArray,this);
                setScore(10);
            }
        }
        //적군에 충돌하지 않은 총알은 자동제거
        if(this.x>1400){
            //화면에서 제거
            //배열에서 제거
            this.removeObject(bulletArray,this);
        } 
        this.img.style.left=this.x+"px";
    }     
}
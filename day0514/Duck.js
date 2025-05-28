//부모의 생성자 호출을 의무사항 명시 
class Duck extends Bird{
    constructor(color,age){
        super(color,age);
        this.color=color
        this.color=age
    }
    fly(){

        console.log("오리가 날아요");
    }
}
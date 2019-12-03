var vm = new Vue({
  el: "#app",
  data: {
    colorList:[
      {
        name: "yellow",
        color: "#FFEB67"
      },
      {
        name: "blue",
        color: "#A5D8D6"
      },
      {
        name: "red",
        color: "#EF898C"
      },
      {
        name: "green",
        color: "#CBE196"
      },                  
    ],
    postits: [
      {
        text: "都市更新",
        color: "yellow",
        pos: { x:20 , y:0 }
      },
      {
        text: "市容整潔",
        color: "green",
        pos: { x:20 , y:300 }
      },
    ],
    nowId: -1,
    mousePosition: {
      x: 0,
      y: 0
    },
    StartMousePosition: {
      x: 0,
      y: 0
    }
  },
  watch: {
    mousePosition(oldPos,newPos){
      if (this.nowId != -1){
        let nowPosit = this.postits[this.nowId]
        nowPosit.pos.x=newPos.x-this.StartMousePosition.x
        nowPosit.pos.y=newPos.y-this.StartMousePosition.y
        console.log('aaa')
      }
    },
  },
  methods: {
    getColor(name){
      return this.colorList.find(o=>o.name==name)
    },
    postitCss(p){
      return {
        left: p.pos.x+"px",
        top: p.pos.y+"px",
        fontSize: ( (240-10) / p.text.length)-10 +'px',
        backgroundColor: this.colorList.find(o=>o.name==p.color).color
      }
    },
    selectId(evt,id){
      this.StartMousePosition={x: evt.offsetX,y: evt.offsetY}
      if (evt.srcElement.classList.contains('block') || evt.srcElement.classList.contains('fa') ){
        this.nowId=-1
      }else{
        this.nowId=id
      }
    },
    addPostit(){
      this.postits.push({
        text: "Text",
        color: "yellow",
        pos: {x:200+Math.random()*200,y:200+Math.random()*200}
      })
    },
    setText(pid){
      let edidText = prompt("請輸入新的文字",this.postits[pid].text)
      // this.postits[id].text=""
      if (edidText){
        this.postits[pid].text= edidText;
      }
    },
    deletePostit(pid){
      this.postits.splice(pid,1)
    },
  },
})


window.onmousemove=(evt)=>{
    nowMousePos= [evt].map(o=>({x: o.pageX,y: o.pageY}))[0];  
    vm.mousePosition = nowMousePos
}

window.ontouchmove=(evt)=>{
  nowMousePos = [evt].map(o=>({x: o.pageX,y: o.pageY}))[0];
  vm.mousePosition = nowMousePos
}

window.onmouseup=(evt)=>{
  vm.nowId = -1
}

window.ontouchend=(evt)=>{
  vm.nowId = -1;
}


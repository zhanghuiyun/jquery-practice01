function Slide(param){
	this.timeoutId="";
	this.dots=[];
	this.i=0;
    this.preI=0;
	this.init(param);
};
Slide.prototype={
	createDot:function(){   //创建DOM节点
		var _self=this;
		var dotWrapper=$('<div></div>')
		dotWrapper.addClass('dot-wrapper');
	    this.imgArr.forEach(function(item,index,imgArr){
            var dot= $('<span></span>');
	        dot.addClass('dot');
	        dotWrapper.append(dot);
	        //将每个dot存在dots数组中
            _self.dots.push(dot[0]);
            //为创建的每个dot绑定点击事件
            dot.on('click',function(){
            	_self.doGo(index)});
            });
	    //将div创建到页面中
	    $(this.pic.parentNode).append(dotWrapper);
	},
	autoRun: function(time){   //自动播放
		clearTimeout(this.timeoutId);
		var _self=this;
        this.timeoutId=setTimeout(function(){
            _self.getNextIndex(1);
            _self.doGo(_self.i);
            _self.autoRun(time);
        },time);
    },
    doGo:function(index){     //跳转到某一张
		this.i=index;   
        $(this.pic).attr("src",this.imgArr[this.i]);
	    this.dots[this.preI].className="dot";   
	    this.dots[index].className="dot-active";
	    this.preI=this.i;  
	    clearTimeout(this.timeoutId);
	    this.autoRun(this.time);
	},
	getNextIndex:function(direction){   //获取下一张图片的索引i
		//幻灯片的张数，索引
        var len=this.imgArr.length-1;
        //direction为1表示跳到下一张，为-1表示跳转到上一张
        if(direction === 1){
            this.i++;
            this.i>len ? this.i=0:this.i;
	    }
	    if(direction === -1){
	        this.i--;
	        this.i<0 ? this.i=len:this.i;
	    }
	},
	toPre: function(){     //跳到上一张
		this.getNextIndex(-1);  
	    this.doGo(this.i);
	},
	toNext:function(){     //跳到下一张
		this.getNextIndex(1);
	    this.doGo(this.i);
	},
	init: function(param){  //初始化
    	var _self=this;
    	/*this.param = param;*/
   	    this.time = param.time;
   	    this.imgArr = param.imgArr;
   	    this.pic=param.pic;
   	    this.left=param.left;
   	    this.right=param.right;  
    	this.createDot();     
    	this.doGo(0);   //页面一进来显示的图片
    	this.autoRun(param.time || 5000);  //如果有参数，则自动播放时间间隔为参数值，否则为5s
        //为左按钮绑定点击事件
        $(this.left).on('click',function(){
				_self.toPre();
        });
        //为右按钮绑定点击事件
		$(this.right).on('click',function(){
				_self.toNext();
		})
    }
};

var Slide1=new Slide({
	imgArr:["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg","images/pic6.jpg"],
    time:3000,
    left:$("#left-direction"),
    right:$("#right-direction"),
    pic:$("#pic")[0]
});

var Slide2=new Slide({
	imgArr:["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg","images/pic6.jpg"],
    time:3000,
    left:$("#left-direction1"),
    right:$("#right-direction1"),
    pic:$("#pic1")[0]
});
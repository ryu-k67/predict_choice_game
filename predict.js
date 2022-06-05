const N=10

var scoreDisplay=document.getElementById("score");

var predict,input;  //予測値,入力値
var y=0;  //予測値のバイナリー
var data=new Array(2*N+1);  //累計データ
var w=new Array(2*N+1);  //重み
var score=0;  //ゲームのスコア初期状態10

// 初期化
for(let i=0;i<2*N+1;i++){
    data[i]=0;
    w[i]=0;
}
data[0]=-1;

input=0;
// 1回目の分のパーセプトロン予測をおこなっておく
predict=perceptron(input,data,w,y);


//　パーセプトロンによって予測をおこなう
function perceptron(input, data, w, y){
    var x = input; //左選択：-1, 右選択：+1

//前回の予測が間違っていたら重みベクトルを更新する
    console.log(x,y)
    if(x!=y){  //前回、入力値と予測値が異なった場合
        for(let j=0;j<2*N+1;j++){
            w[j] += x*data[j]; // x= -1 or +1  data= -1 or +1  だから x*data= -1 or +1 
                               // w = 今回の入力と同じ過去データの数 - 入力と異なる過去データの数
        }
    }
    console.log(w);

// 前回のプレイヤーの選択を累計データに追加
    for(let j=2*N;j>0;j--){
        data[j]=data[j-1];
    }
    data[0]=x;

// 予測値を計算
    y=0
    for(let j=0;j<2*N+1;j++){
        y += w[j]*data[j];
    }
    console.log(w);
    console.log(data);
    console.log(y);

// 予測した結果が大きい方( -1:左, +1:右 )を返す
    if(y<0){
        console.log('左');
        return -1;
    }
    else{
        console.log('右');
        return +1;
    }
}



function game(){
    //console.log("ボタン押された");
    if(predict==input){
        //console.log("予測通り"); 
        score--;
    }
    else {
        //console.log("予測が外れた");
        score++;
    }
    //console.log(score,data)
    scoreDisplay.innerHTML=score;
    if(score==-15){
        //console.log("ゲーム終了：負け");
        //location.reload();
        scoreDisplay.innerHTML="ゲーム終了：負け";
    }
    else if(score==15){
        //console.log("ゲーム終了：勝ち");
        //location.reload();
        scoreDisplay.innerHTML="ゲーム終了：勝ち";
    }
// 次の分のパーセプトロン予測をおこなっておく
    predict=perceptron(input,data,w,y);

}

//左をクリックされた場合
function clickLeft(){
    input=-1;  // ここで相手プレイヤーの手をインプット
    game();  // ゲーム開始
}
//右をクリックされた場合
function clickRight(){
    input=+1;  // ここで相手プレイヤーの手をインプット
    game();  // ゲーム開始
}


const N=5

var scoreDisplay=document.getElementById("score");

var predict,input;  //予測値,入力値
var y=[0,0];  //予測値のバイナリー
var data=new Array(2*N+1);  //累計データ
var w=new Array(2);  //重み
var score=0;  //ゲームのスコア初期状態10

// 初期化
data[0]=-1;
for(let i=1;i<2*N+1;i++){
    data[i]=0;
}
for(let i=0;i<2;i++){
    w[i]=new Array(2*N+1);
    for(let j=0;j<2*N+1;j++){
        w[i][j]=0;
    }
}
input=0;
// 1回目の分のパーセプトロン予測をおこなっておく
predict=perceptron(input,data,w,y);



//　パーセプトロンによって予測をおこなう
function perceptron(input, data, w, y){
    var x=new Array(2);  //前回の入力値をバイナリー表現するための配列
    
    if(input==0){  //右の扉を選択
        x=[+1,-1];
    }
    else{          //左の扉を選択
        x=[-1,+1];
    }
//前回の予測が間違っていたら重みベクトルを更新する
    for(let i=0;i<2;i++){
        console.log(x[i],y[i])
        if(x[i]!=y[i]){  //前回の入力値と予測値が異なった場合
            for(let j=0;j<2*N+1;j++){
                w[i][j] += x[i]*data[j];
            }
        }
    }      
// 前回のプレイヤーの選択を累計データに追加
    for(let i=0;i<2;i++){
        for(let j=2*N;j>1;j--){
            data[j]=data[j-2];
        }
    }
    data[0]=x[0];
    data[1]=x[1];
// 予測値を計算
    y=[0,0]
    for(let i=0;i<2;i++){
        for(let j=0;j<2*N+1;j++){
            y[i] += w[i][j]*data[j];
        }
    }
// 予測した結果が大きい方( 0:左, 1:右 )を返す
    if(y[0]>y[1]){
        return 0;
    }
    else{
        return 1;
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
    input=0;  // ここで相手プレイヤーの手をインプット
    game();  // ゲーム開始
}
//右をクリックされた場合
function clickRight(){
    input=1;  // ここで相手プレイヤーの手をインプット
    game();  // ゲーム開始
}


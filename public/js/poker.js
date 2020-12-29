var cards = [];    //山札
var my_hand = [];    //自分の手札
var my_rank = 11;    //自分の役
var my_rank_name;    //自分の役名


//開始ボタン
start = () => {
    initCard(); //山札セット
    shuffleCard(); //山札シャッフル
    // console.log(cards);
    // console.log(cards[1]);
    $("#disp").html('');
}

//カードを山札にセット
initCard = () => {
    x = 0;
    for (i = 1; i <= 13; i++) {
        cards[x] = new Card('s', i);
        x++;
        cards[x] = new Card('c', i);
        x++;
        cards[x] = new Card('h', i);
        x++;
        cards[x] = new Card('d', i);
        x++;
    }
}

//カードシャッフル
shuffleCard = () => {
    for (i = 0; i < 52; i++) {
        r = Math.floor(Math.random() * 13 * 4);
        w = cards[i];
        cards[i] = cards[r];
        cards[r] = w;
    }
}

function Card(mark, num) {
    this.mark = mark;
    this.num = num;
}


//カードを表示する関数
dispCard = (card) => {
    let imgurl = "";
    let cNum;
    for (i = 0; i < card.length; i++) {
        if (card[i].num < 10) {
            cNum = `0${card[i].num}`;
        } else {
            cNum = `${card[i].num}`;
        }
        imgurl = `${card[i].mark}${cNum}`;
        // console.log(imgurl);
        $("#disp").append(`<img src=../resouce/img/${imgurl}.png alt=card${i}>`);
        $("#disp").children("img").each(function () {
            $(this).addClass('m-1');
        });
    }
}

//山札から引きつつ山札削除＆表示
draw = () => {
    my_hand = cards.slice(0, 5);
    cards.splice(0, 5);
    dispCard(my_hand);
    my_rank_name = rank(my_hand);
    $("#rank_name").text(my_rank_name);
}


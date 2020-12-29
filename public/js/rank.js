//役判定＆表示
rank = (my_hand, my_rank, my_rank_name) => {
    my_rank = rank_judge(my_hand);
    my_rank_name = disp_rank(my_rank, my_rank_name);
    return my_rank_name;
}

rank_update = (current_rank, rank_num) => {
    if (current_rank > rank_num) {
        return rank_num;
    } else {
        return current_rank;
    }
}

//役判定
rank_judge = (my_hand) => {
    let cnt = 0;
    let current_rank = 11;
    sort(my_hand);
    cnt = sameNum(my_hand);
    current_rank = various_rank(my_hand, cnt, current_rank);

    if (sameMark(my_hand)) {
        current_rank = rank_update(current_rank, 5);
    }

    if (stairs_judge(my_hand)) {
        if (sameMark(my_hand)) {
            current_rank = rsf(my_hand);
        } else {
            current_rank = rank_update(current_rank, 6);
        };
    };

    returnAce(my_hand);
    return current_rank;
}


//最初に並べ替え
sort = (my_hand) => {
    my_hand.sort(function (a, b) {
        if (a.num < b.num) return -1;
        if (a.num > b.num) return 1;
        return 0;
    });
}

//同じ数字の枚数判定
sameNum = (my_hand) => {
    let cnt = 0;
    for (let i = my_hand.length; i >= 2; i--) {
        if (my_hand[i - 1].num == my_hand[i - 2].num) {
            cnt++;
        };
    };
    return cnt;
}


//階段以外の約判定
various_rank = (my_hand, cnt, current_rank) => {
    switch (cnt) {
        case 0:
            current_rank = 10;
            return current_rank;
            break;

        case 1:
            current_rank = 9;
            return current_rank;
            break;

        case 2:
            if ((my_hand[0].num == my_hand[1].num && my_hand[1].num == my_hand[2].num) ||
                (my_hand[1].num == my_hand[2].num && my_hand[2].num == my_hand[3].num) ||
                (my_hand[my_hand.length - 1].num == my_hand[my_hand.length - 2].num && my_hand[my_hand.length - 2].num == my_hand[my_hand.length - 3].num)) {

                current_rank = 7;
                return current_rank;
                break;
            } else {
                current_rank = 8;
                return current_rank;
            };
            break;

        case 3:
            if (my_hand[1].num == my_hand[2].num && my_hand[2].num == my_hand[3].num) {
                current_rank = 3;
                return current_rank;
                break;
            } else {
                current_rank = 4;
                return current_rank;
            };
            break;
    };
}


//マークは全て同じ？
sameMark = (my_hand) => {
    let i = 0;
    while (my_hand[i].mark == my_hand[i + 1].mark) {
        i++;
        if (i == my_hand.length - 1) {
            break;
        };
    };
    if (i == my_hand.length - 1) {
        return true;
    } else {
        return false;
    };
}


//階段判定
stairs_judge = (my_hand) => {
    if (stairs(my_hand)) {
        return true;
    } else {
        changeAce(my_hand);
        if (stairs(my_hand)) {
            return true;
        } else {
            return false;
        };
    };
}

//数字は階段？
stairs = (my_hand) => {
    let i = my_hand.length;
    while (my_hand[i - 1].num - my_hand[i - 2].num == 1) {
        i--;
        if (i == 1) {
            break;
        };
    };
    if (i == 1) {
        return true;
    } else {
        return false;
    };
}

//Aの変換関数
changeAce = (my_hand) => {
    sort(my_hand);
    while (my_hand[0].num == 1) {
        my_hand[0].num += 13;
        sort(my_hand);
    };
}

//Aを戻す関数
returnAce = (my_hand) => {
    sort(my_hand);
    while (my_hand[my_hand.length - 1].num == 14) {
        my_hand[my_hand.length - 1].num -= 13;
        sort(my_hand);
    };
}

//ロイヤルストレートフラッシュ判定
rsf = (my_hand, current_rank) => {
    if (my_hand[0].num == 10 || my_hand[my_hand.length - 1].num == 14) {
        current_rank = 1;
        return current_rank;
    } else {
        current_rank = 2;
        return current_rank;
    };
}


//役名表示
disp_rank = (my_rank, my_rank_name) => {
    switch (my_rank) {
        case 1:
            my_rank_name = "ロイヤルストレートフラッシュ";
            break;

        case 2:
            my_rank_name = "ストレートフラッシュ";
            break;

        case 3:
            my_rank_name = "フォーカード";
            break;

        case 4:
            my_rank_name = "フルハウス";
            break;

        case 5:
            my_rank_name = "フラッシュ";
            break;

        case 6:
            my_rank_name = "ストレート";
            break;

        case 7:
            my_rank_name = "スリーカード";
            break;

        case 8:
            my_rank_name = "ツーペア";
            break;

        case 9:
            my_rank_name = "ワンペア";
            break;

        case 10:
            my_rank_name = "豚さん";
            break;
    };
    $("#rank_name").text(my_rank_name);
    return my_rank_name;
}

let arr = [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
]

function findTarge(tartge) {
    let len = arr[0].length;
    let num = tartge;
    let r = 0;
    for(let i = len-1;i>=0;i--){
        console.log(r ,i);
        if(arr[r][i] == num){
            console.log('true');
            return true;
        }else if(num > arr[r][i]){
            if(r == arr.length-1){
                console.log('false');
                return false;
            }
            r++;
            i = len;
            continue;
        }
    }
}

// 20 || 25 || 27 || 28 || 29 不存在
findTarge(27);
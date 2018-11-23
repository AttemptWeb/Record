function Fibonacci(i){
    let n1 = 1;
    let n2 = 1;
    let nN = 0;
    if(i <= 1){
        return i;
    }
    for(let n = 2;n < i;n++){
        nN = n1 + n2;
        n1 = n2;
        n2 = nN;
    }
    return nN;
}

let num = Number(process.argv[2])
if(typeof num == 'number'){
    console.log(Fibonacci(num))
}else{
    console.log(`请输入参数, 示例:  node ffer_solve.js 5`)
}

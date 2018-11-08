let arr = [2, 3, 1, 0, 2, 5];
let duplication = [];
function duplicate(){
    for( let i=0;i<arr.length;i++){
        while(arr[i] != i){
            if(arr[i] == arr[arr[i]]){
                duplication[0] = arr[i];
                console.log(duplication.join())
                return true;
            }
            swap(arr, i, arr[i])
        }
    }
    return false;
}
function swap(arr, i , j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
duplicate()
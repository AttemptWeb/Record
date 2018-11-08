- [1. 数组中重复的数字](#1数组中重复的数字)

## 1.数组中重复的数字

### 问题描述

在一个长度为 n 的数组里的所有数字都在 0 到 n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字是重复的，也不知道每个数字重复几次。请找出数组中任意一个重复的数字。

```
Input:
{2, 3, 1, 0, 2, 5}

Output:
2
```

### 解法
要求复杂度为 O(N) + O(1)，也就是时间复杂度 O(N)，空间复杂度 O(1)。因此不能使用排序的方法，也不能使用额外的标记数组。牛客网讨论区这一题的首票答案使用 nums[i] + length 来将元素标记，这么做会有加法溢出问题。

这种数组元素在 [0, n-1] 范围内的问题，可以将值为 i 的元素调整到第 i 个位置上。

以 (2, 3, 1, 0, 2, 5) 为例：

```
position-0 : (2,3,1,0,2,5) // 2 <-> 1
             (1,3,2,0,2,5) // 1 <-> 3
             (3,1,2,0,2,5) // 3 <-> 0
             (0,1,2,3,2,5) // already in position
position-1 : (0,1,2,3,2,5) // already in position
position-2 : (0,1,2,3,2,5) // already in position
position-3 : (0,1,2,3,2,5) // already in position
position-4 : (0,1,2,3,2,5) // nums[i] == nums[nums[i]], exit
```

```javascript
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
        console.log(arr[i], i)
    }
    return false;
}

function swap(arr, i , j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

duplicate()
```

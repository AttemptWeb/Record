- [1. 数组中重复的数字](#1数组中重复的数字)
- [2. 二维数组中的查找](#2二维数组中的查找)

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

## 2.二维数组中的查找

### 题目描述
在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```
Consider the following matrix:
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]

Given target = 5, return true.
Given target = 20, return false.
```

### 解法

从右上角开始查找。矩阵中的一个数，它左边的数都比它小，下边的数都比它大。因此，从右上角开始查找，循环判断的次数更少，就可以根据 target 和当前元素的大小关系来缩小查找区间

复杂度：O(M + N) + O(1)

当前元素的查找区间为左下角的所有元素，例如元素 12 的查找区间如下：

<div align="center"><img src=https://raw.githubusercontent.com/CyC2018/CS-Notes/master/pics/f94389e9-55b1-4f49-9d37-00ed05900ae0.png" width="250" style="max-width:100%;" /></div>


```javascript
function findTarge(tartge, arr) {
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
```
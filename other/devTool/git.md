# git

参考：[git中多个ssh管理](https://www.jianshu.com/p/f7f4142a1556)

### **git查看记录 备份暂存**
----------------

```javascript
1.查看一个修改过但是还没 commit 的文件具体改了什么
$ git diff '[filename]'

2.查看历史记录
$ git log

3.备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到Git栈中。
$ git stash

4.从Git栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复。
$ git stash pop

5.查看commit后但是未push的记录
$ git show 

6.查看所有stash
git stash list
```

****

### **git中切换分支**
------------

```
$  git branch   //查询本地分支

$  git branch [分支名] //  创建本地分支

$  git branch --all //查看全部分支

$  git checkout [分支名] //切换分支

$  git branch --set-upstream-to=origin/dev dev //把push和pull的默认分支设置为dev
```

****

### **git中修改head指向**
----------------

```
$   git branch -r // 查看本地head指向

$   git remote set-head origin -d // 删除origin/head

$   git remote set-head origin maser // 设置 head指向
```

****

### **git放弃本地修改 强制更新**
------------------

```javascript
$ git fetch --all

$ git reset --hard origin/master // 远程分支名称

<!--git fetch 只是下载远程的库的内容，不做任何的合并 git reset 把HEAD指向刚刚下载的最新的版本-->
```

****

### **git撤销或者回退**
----------------
```javascript
// 直接回退，不保存撤销的版本
$ git reset HEAD^  //向后撤销一个提交

$ git reset --hard HEAD~2  //向后撤销两个提交

$ git reset --hard [commit版本号] //撤销指定commit版本
```

****

### **git合并**
----------------
```javascript
$ git merge --abort //撤销当前合并，回到合并之前

$ git merge --no-ff // 不使用fast-forward方式合并，保留分支的commit历史

$ git merge --squash // 使用squash方式合并，把多次分支commit历史压缩为一次
```
    --no-ff指的是强行关闭fast-forward方式。
    fast-forward方式就是当条件允许的时候，git直接把HEAD指针指向合并分支的头，完成合并。
    属于“快进方式”，不过这种情况如果删除分支，则会丢失分支信息。因为在这个过程中没有创建commit
    
    git merge --squash 是用来把一些不必要commit进行压缩，比如说，你的feature在开发的时候写的commit很乱，
    那么我们合并的时候不希望把这些历史commit带过来，于是使用--squash进行合并，此时文件已经同合并后一样了，但不移动HEAD，不提交。需要进行一次额外的commit来“总结”一下，然后完成最终的合并。
    
    总结：
    --no-ff：不使用fast-forward方式合并，保留分支的commit历史
    --squash：使用squash方式合并，把多次分支commit历史压缩为一次
![img](https://segmentfault.com/img/bVkJAj)



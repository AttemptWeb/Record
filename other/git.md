# git

参考：[git中多个ssh管理](https://www.jianshu.com/p/f7f4142a1556)

**git查看记录 备份暂存**
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
```

****

**git中切换分支**
------------

```
$   git branch   //查询本地分支

$   git branch [分支名] //  创建本地分支

$   git branch --all //查看全部分支

$   git checkout [分支名] //切换分支

$   git branch --set-upstream-to=origin/dev dev //把push和pull的默认分支设置为dev
```

****

**git中修改head指向**
----------------

```
$   git branch -r // 查看本地head指向

$   git remote set-head origin -d // 删除origin/head

$   git remote set-head origin maser // 设置 head指向
```

****

**git放弃本地修改 强制更新**
------------------

```javascript
$ git fetch --all

$ git reset --hard origin/master // 远程分支名称

<!--git fetch 只是下载远程的库的内容，不做任何的合并 git reset 把HEAD指向刚刚下载的最新的版本-->
```

**git撤销或者回退**
----------------
```javascript
$ git reset --hard [commit版本号] //回退版本

$ git merge --about //撤销当前合并，回到合并之前
```




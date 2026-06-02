# 有用的GIT命令

## git rebase

有时用了某个bug单提交了代码到你自己私仓，准备向公仓合并，发现bug单已经提前关闭了，这个时候回报合并不了
这和公司代码管理规则有关，如果你公司也是这样的规则，那么git rebase可以排上用场

### 合并多个commit

```bash
# startpoint,endpoint代表 commit id,表示一个范围
  git rebase -i  [startpoint]  [endpoint]
#  表示从当前提交往后的N个提交进行修改
  git rebase -i head~N
```

### 将一段commit粘贴到另一个分支上

比如将develop分支中的C~E部分复制到master分支中，这时我们就可以通过rebase命令来实现（如果只是复制某一两个提交到其他分支，建议使用更简单的命令:git cherry-pick）。

```bash
 git rebase   [startpoint]   [endpoint]  --onto  [branchName]
 ```

 [startpoint] [endpoint] 是一个前开后闭的区间,要让这个区间包含C提交，我们将区间起始点向后退了一步。
 
 之后 HEAD处于游离状态，虽然此时HEAD所指向的内容正是我们所需要的，但是master分支是没有任何变化的，git只是将C~E部分的提交内容复制一份粘贴到了master所指向的提交后面，我们需要做的就是将master所指向的提交id设置为当前HEAD所指向的提交id就可以了，即:
```bash
git checkout master
git reset --hard  0c72e64  # 假设当前head指向的 commit id
```

## 同步仓库分支

### 同步源仓库分支到fork的私仓

1. 私仓不存在该分支
   ```bash
   # 如果本地没有添加源仓库，添加下
   git remote add source xxx.igt
   # 拉取源仓库代码
   git fetch source
   # 拉取源仓库分支
   git checkout -b branchName source/branchName
   # 上传到自己的私仓
   git push origin branchName
   ```
2. 私仓已经存在，需要同步代码
   ```bash
   # 切换到需要更新的分支
   git checkout -b branchName origin/branchName
   # 拉取源仓库分支代码
   git pull source branchName
   # 上传到自己的私仓
   git push origin branchName
   ```

## 删除远程仓库的文件

```bash
git rm -r -f --cached file_or_dir
```


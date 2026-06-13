# Useful GIT Commands

## git rebase

Sometimes, after committing code for a bug ticket to your private repository and preparing to merge it into the public repository, you find that the bug ticket has already been closed. In this case, the merge will fail.
This is related to the company's code management rules. If your company also follows such rules, then git rebase can come in handy.

### Squash Multiple Commits

```bash
# startpoint, endpoint represent commit IDs, indicating a range
  git rebase -i  [startpoint]  [endpoint]
# Modify N commits starting from the current commit onward
  git rebase -i head~N
```

### Copy a Range of Commits to Another Branch

For example, to copy commits C~E from the develop branch to the master branch, we can use the rebase command (if just copying one or two commits to another branch, it's recommended to use the simpler command: git cherry-pick).

```bash
 git rebase   [startpoint]   [endpoint]  --onto  [branchName]
 ```

 [startpoint] [endpoint] is a range that includes the start but excludes the end. To include commit C in this range, we move the start point back by one step.
 
 Afterwards, HEAD will be in a detached state. Although the content pointed to by HEAD is what we need, the master branch has not changed at all. Git simply copies the commits C~E and pastes them after the commit pointed to by master. What we need to do is set the commit ID pointed to by master to the commit ID currently pointed to by HEAD, i.e.:
```bash
git checkout master
git reset --hard  0c72e64  # Assume the current HEAD pointed to this commit ID
```

## Sync Repository Branches

### Sync Source Repository Branch to Forked Private Repository

1. If the private repo doesn't have this branch
   ```bash
   # If the source repository hasn't been added locally, add it
   git remote add source xxx.igt
   # Fetch the source repository code
   git fetch source
   # Pull the source repository branch
   git checkout -b branchName source/branchName
   # Push to your own private repository
   git push origin branchName
   ```
2. If the private repo already has the branch and needs to sync
   ```bash
   # Switch to the branch that needs updating
   git checkout -b branchName origin/branchName
   # Pull the source repository branch code
   git pull source branchName
   # Push to your own private repository
   git push origin branchName
   ```

## Delete Files from Remote Repository

```bash
git rm -r -f --cached file_or_dir
```

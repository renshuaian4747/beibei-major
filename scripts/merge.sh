git branch feature/upgrade
echo '>>> new branch feature/upgrade'
git remote add bixi ssh://git@git.datagrand.com:58422/frontend_utils/bixi_pro.git
echo '>>> start to pull bixi_pro repo'
git fetch bixi
git checkout -b feature/merge bixi/master
git checkout feature/upgrade
git merge feature/merge --allow-unrelated-histories

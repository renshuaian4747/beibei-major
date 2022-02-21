deploy_branch=$1
stack_name=$2
repo=$3
image_tag=$4
project_name=$5
host_addr=$6

set -o errexit
echo "Start deploy to ${stack_name}."
ssh -f -p 58422 -4 -o "StrictHostKeyChecking no" ci_test@jumper-huabei2-vpc.datagrand.com -L $PORT:$host_addr:22 -N
cd $DEPLOY_ADDR
sed -i "s/\(dockerhub.datagrand.com\/\)\(.*\)\(\/nlp_platform_html_xhcj:\)\(.*\)/dockerhub.datagrand.com\/nlp_platform\/nlp_platform_html_xhcj:${image_tag}/g" docker-compose.yml
cmd="docker service update --image=${repo}:${image_tag} ${stack_name}_${project_name}"
echo $cmd
ssh -o "StrictHostKeyChecking no" $USER@$SERVER -p $PORT $cmd

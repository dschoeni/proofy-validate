# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'validate.viser.ch' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://dschoeni.github.io/proofy-validate
git push -f git@github.com:dschoeni/proofy-validate.git master:gh-pages

cd -
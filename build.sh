#!/usr/bin/env bash

# On admet que l'appli est déjà créée sur heroku

reponame="projet-malfara-elio"
path_backend=./BACKEND
nom_projet_angular="FRONTEND"

do="all"
force=false
if [ $# -gt 0 ]
then
  if [ "$1" == "--force" ]
  then
    force=true
  else
    do="$1"
  fi

  if [ $# -gt 1 ]
  then
    if [ "$2" == "--force" ]
    then
      force=true
    else
      do="$2"
    fi
  fi
fi

echo "$do"

if [ \( $force = true \) ] || [ \( ! -d build \) ]
then
    echo "force!"
    rm -rf build/
    mkdir build
fi

do_back()
{
    cp -r $path_backend/* build/
    cp $path_backend/.htaccess build/
    echo "/vendor" >> build/.gitignore

    cd build/
    git init
    heroku git:remote -a $reponame
    git add .
    git commit -m "init"
    git push heroku master --force
    cd ..
}

do_front()
{
  cd $nom_projet_angular
  ng build
  cp -r dist/$nom_projet_angular/* ../build/
  cd ../build/
  git init
  heroku git:remote -a $reponame
  git add .
  git commit -m "ajout angular"
  git push heroku master --force
}

case "$do" in
  "back")
    do_back
    ;;
  "front")
    do_front
    ;;
  "all")
    do_back
    do_front
    ;;
esac
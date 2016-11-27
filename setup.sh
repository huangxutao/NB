#!/bin/bash

# check update 在开发测试时可以先把 git pull 注释掉，避免不必要的麻烦
git pull origin master

#
# Funtion 设置主题
#
setTheme() {
  local themeName="default"

  echo -n "Use default theme ? (y/n) > "

  read

  if [ "$REPLY" == "n" ]
  then
    echo -n "Enter your theme name: > "
    read themeName
  fi

# 检测主题是否存在
  until [ -d themes/$themeName/ ] && [ "$themeName" != "" ]
  do
    if [ "$themeName" = "" ]; then
      echo -e "You have not enter the theme name. (Press 'Ctrl + C' to quit.)\n\n"
    else
      echo -e "There is no Theme named $themeName !!! (Press 'Ctrl + C' to quit.)\n\n"
    fi
    echo -n "Enter your theme name: > "
    read themeName
  done

# 模板文件
  if [ ! -L platform/views/layout ]
  then
    ln -s themes/$themeName/layout/ platform/views/ -r
  else
    rm platform/views/layout
    ln -s themes/$themeName/layout/ platform/views/ -r
  fi

# 资源文件
  if [ ! -L platform/public/source ]
  then
    ln -s themes/$themeName/source/ platform/public/ -r
  else
    rm platform/public/source
    ln -s themes/$themeName/source/ platform/public/ -r
  fi
}

setTheme


# start the service
cd platform/
npm install
NODE_ENV=production npm start

exit 0

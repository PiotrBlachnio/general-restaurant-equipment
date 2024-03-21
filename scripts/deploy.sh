#!/bin/bash

git stash
git pull origin main
yarn install
pm2 delete general_restaurant_equipment 2> /dev/null
yarn prod

#!/bin/bash

set -e

export NODE_ENV=production

pm2 start yarn --interpreter bash --name general_restaurant_equipment -- start-prod
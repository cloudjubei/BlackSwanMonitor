#!/usr/bin/env zsh

# sync out/ folder with s3 bucket
aws s3 sync out s3://blackswan.net --profile monitor
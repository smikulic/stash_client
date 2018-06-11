# README

[![Code Climate](https://codeclimate.com/github/smikulic/stash_client/badges/gpa.svg)](https://codeclimate.com/github/smikulic/stash_client)
[![Test Coverage](https://codeclimate.com/github/smikulic/stash_client/badges/coverage.svg)](https://codeclimate.com/github/smikulic/stash_client/coverage)
[![Issue Count](https://codeclimate.com/github/smikulic/stash_client/badges/issue_count.svg)](https://codeclimate.com/github/smikulic/stash_client)
[![CircleCI](https://circleci.com/gh/smikulic/stash_client.svg?style=svg)](https://circleci.com/gh/smikulic/stash_client)

# ScroogeVault client

Stack:

Webpack, ES6, React, Mobx


# Deployment - Production
1. 'yarn build:production'
2. sftp to server var/www
3. put files from dist into dist (put 'filename')
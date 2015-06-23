#!/usr/bin/env bash

uglifyjs jquery.ga.plugin.js -c --comments -o jquery.ga.plugin.min.js

DATE=`date +%d/%m/%Y`

(echo "/*!
 * jquery.ga.plugin.js - simple jquery plugin wrapper around the google analytics window.ga function
 * @version v1.0.0
 * @link https://github.com/WARPAINTMedia/jquery.ga.plugin.js
 * @license MIT
 * @copyright (c) $DATE
 */"; cat jquery.ga.plugin.min.js) >tmpfile
mv tmpfile jquery.ga.plugin.min.js
SHELL = /usr/bin/env bash -xeuo pipefail

download: download-aws-07312022

rehash: rehash-aws-07312022
	node scripts/rehash.js

clean: clean-aws-07312022

build: clean download
	npm run build

download-aws-07312022:
	mkdir -p .tmp
	mkdir -p public/icons/
	curl https://d1.awsstatic.com/webteam/architecture-icons/q3-2022/Asset-Package_07312022.e9f969935ef6aa73b775f3a4cd8c67af2a4cf51e.zip -o .tmp/aws-icons-07312022.zip
	unzip -q .tmp/aws-icons-07312022.zip -d public/icons/aws-07312022/
	rm -rf public/icons/aws-07312022/__MACOSX
	find public/icons/aws-07312022 -type f -name .DS_Store | xargs rm

clean-aws-07312022:
	rm -rf .tmp
	rm -rf public/icons/aws-07312022

rehash-aws-07312022:
	mkdir -p .tmp/icons
	cd public/icons/; \
	find aws-07312022 -type f | sort | sed "s/aws-07312022\///g" | jo -a > ../../.tmp/icons/aws-07312022.json

tmp:
	cd public/icons
	pwd

.PHONY: \
	download-aws-07312022 \
	clean-aws-07312022 \
	rehash-aws-07312022 \
	clean \
	rehash \
	download

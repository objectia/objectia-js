.PHONY: test deploy

test:
	yarn test

deploy:
	yarn publish --access public

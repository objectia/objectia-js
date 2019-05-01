.PHONY: test deploy

test:
	npm test

deploy:
	npm publish --access public

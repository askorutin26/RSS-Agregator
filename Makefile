install:
	npm ci

lint:
	npx eslint .
	
lint-fix:
	npx eslint . --fix

webpack:
	./node_modules/.bin/webpack

build:
	npm run build
.SILENT:
.DEFAULT_GOAL=help

COLOR_RESET = \033[0m
COLOR_GREEN = \033[32m
COLOR_YELLOW = \033[33m

PROJECT_NAME = `basename $(PWD)`

## prints this help;
help:
	printf "${COLOR_YELLOW}\n${PROJECT_NAME}\n\n${COLOR_RESET}"
	awk '/^[a-zA-Z\-\_0-9\.%]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "${COLOR_GREEN}$$ make %s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
	printf "\n"

## install dependences
install:
	@echo "### install dependences ##"
	npm install
	@echo ""

## run application for http://localhost:4200
run:
	@echo "### run application for http://localhost:4200 ###"
	ng serve
	@echo ""

## create a ready-to-publish version on any server in the "dist" folder
run-prod:
	@echo "### create a ready-to-publish version on any server in the "dist" folder  ###"
	ng build --prod
	@echo ""

## create a specific branch for github pages
publish:
	@echo "### create a specific branch for github pages  ###"
	git subtree push --prefix dist origin gh-pages
	@echo ""

## initializes the procedures for complete application execution
all: install run

//MakeFile Client
build:
	docker build -t 7020079170/demand-app .
run:
	docker run -d -p 3000:3000 7020079170/demand-app



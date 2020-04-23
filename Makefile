# vim: set noet:
CC = emcc
CXX = em++

FILES =  tinyexpr/tinyexpr.c
EXPORTED_FUNCTIONS="['_interp', '_compile', '_eval', '_evalArray']"
CFLAGS = -O3 -Wall -fPIC --memory-init-file 0
EMCFLAGS = -s ALLOW_MEMORY_GROWTH=1 -s EXPORTED_FUNCTIONS=$(EXPORTED_FUNCTIONS) -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s MODULARIZE=1

build:
	${CC} ${CFLAGS} ${EMCFLAGS} ${FILES} src/api.c -o wasm/native.js -s BINARYEN_ASYNC_COMPILATION=0;


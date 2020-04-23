#ifndef API_H_
#define API_H_

#include "../tinyexpr/tinyexpr.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct pair {
  te_expr* addr;
  double** pointers;
} pair;

double interp (char* str);
pair* compile (char* expr, char* vars, int nvars);
double eval (pair* ce, double* vars, int nvars);
double* evalArray (struct pair* te, double* vars, int nvars, int size);

#ifdef __cplusplus
}
#endif

#endif

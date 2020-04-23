#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "api.h"
#include "../tinyexpr/tinyexpr.h"

double interp (char* expr) {
  double res = te_interp(expr, 0);
  return res;
}

struct pair* compile (char* expr, char* strvars, int nvars) {
  te_variable vars[nvars];

  // Store addreses te uses for evaluation here:
  double** pointers;
  pointers = malloc(sizeof(double*) * nvars);

  // Get comma-separated vars, pass pointers to te_variables
  char *token;
  int i = 0;
  while ((token = strsep(&strvars, ",")) != NULL) {
    // double* v = malloc(sizeof(double));
    // pointers[i] = v;
    te_variable tev = { token, pointers[i] };
    vars[i] = tev;
    i++;
  }

  te_expr* addr = te_compile(expr, vars, nvars, 0);

  struct pair* te;
  te = malloc(sizeof(pair));
  te -> addr = addr;
  te -> pointers = pointers;

  return te;
}

double eval (struct pair* te, double* vars, int nvars) {
  for (int i = 0; i < nvars; i++) {
    double* varAddr = te -> pointers[i];
    *varAddr = vars[i];
  }

  double res = te_eval(te -> addr);
  return res;
}

double* evalArray (struct pair* te, double* vars, int nvars, int size) {
  double* res = malloc(sizeof(double) * size);

  for (int j = 0; j < size; j++) {
    for (int i = 0; i < nvars; i++) {
      double* varAddr = te -> pointers[i];
      *varAddr = vars[i * size + j];
    }
    res[j] = te_eval(te -> addr);
  }

  return res;
}

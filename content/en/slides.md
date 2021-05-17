---
title: slide links
description: 'セミナー等で利用したスライドなどのリンク先置き場'
position: 2
category: 'about'
---

## コロキウム

## How to use Git and GitHub

### random.c

```c
#include <stdio.h>
#include <limits.h>
#include <stdlib.h>
double random(int *IX);

void main() {
  printf("start main function");
  FILE *outputfile;
  int IX = 60001;
  int REPETITION = 10000;
  double r,r1,r2;

  outputfile = fopen("output.txt", "w");
  if (outputfile == NULL) {
      printf("cannot open\n");
      exit(1);
  }
  unsigned int count;
  double sum, sum_r_2, ave, var;
  
  for (count = 0; count < REPETITION; count = count + 1) {
    r = random(&IX);
    fprintf(outputfile, "%lf\n", r);
  }
  fclose(outputfile);
  printf("end main function");
}

double random(int *IX) {
  int M = INT_MAX;
  int K = 9765625; // 5^10
  double rand; // random number
  *IX = ((*IX)*K)&M;
  rand = (double)*IX/M;
  return rand;
}
```

### feature/input_repetition

```c
#include <stdio.h>
#include <limits.h>
#include <stdlib.h>
double random(int *IX);

void main() {
  printf("start main function");
  FILE *outputfile;
  int IX = 60001;
  int REPETITION; // Delete initialize at feature/random_func branch
  double r,r1,r2;

  // changes at feature/random_func start here. 
  printf("Input number of repetition\n");
  scanf("%d", &REPETITION);
  printf("Input number = %d", REPETITION);
  // changes at feature/random_func end here.

  outputfile = fopen("output.txt", "w");
  if (outputfile == NULL) {
      printf("cannot open\n");
      exit(1);
  }
  unsigned int count;
  double sum, sum_r_2, ave, var;
  
  for (count = 0; count < REPETITION; count = count + 1) {
    r = random(&IX);
    fprintf(outputfile, "%lf\n", r);
  }
  fclose(outputfile);
  printf("end main function");
}

double random(int *IX) {
  int M = INT_MAX;
  int K = 9765625; // 5^10
  double rand; // random number
  *IX = ((*IX)*K)&M;
  rand = (double)*IX/M;
  return rand;
}
```

```c
#include <stdio.h>
#include <limits.h>
#include <stdlib.h>
double random(int *IX);

void main() {
  printf("start main function\n"); // Add newline character at feature/formatting branch.
  FILE *outputfile;
  int IX = 60001;
  int REPETITION = 10000;
  double r,r1,r2;

  outputfile = fopen("output.txt", "w");
  if (outputfile == NULL) {
      printf("cannot open\n");
      exit(1);
  }
  unsigned int count;
  double sum, sum_r_2, ave, var;
  
  for (count = 0; count < REPETITION; count = count + 1) {
    r = random(&IX);
    fprintf(outputfile, "%lf\n", r);
  }
  fclose(outputfile);
  printf("end main function\n"); // Add newline character at feature/formatting branch.
}

double random(int *IX) {
  int M = INT_MAX;
  int K = 9765625; // 5^10
  double rand; // random number
  *IX = ((*IX)*K)&M;
  rand = (double)*IX/M;
  return rand;
}
```
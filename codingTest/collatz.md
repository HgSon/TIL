# 콜라츠 추측

_2020-10-17 작성_

주어진 수가 1이 될 때까지 다음 작업을 반복하면 모든 수를 1로 만들 수 있다.

1. 입력된 수가 짝수라면 2로 나눈다
2. 입력된 수가 홀수라면 3을 곱하고 1을 더한다
3. 같은 작업을 1이 될 때까지 반복한다.

위 작업을 몇 번 반복해야 1이 나오는지 반환하는 함수 `solution` 만들기.
작업을 500번을 반복해도 1이 되지 않는다면 -1을 반환.

## 풀이

```javascript
function solution(num, n = 0) {
  if (n > 500) return -1;
  if (num === 1) return n;
  else {
    n++;
    num = num % 2 ? num * 3 + 1 : num / 2;
    return solution(num, n);
  }
}
```

## 다른 사람의 풀이

```javascript
const solution = (num) => collatzGuessCount(num, 0);
const collatzGuessCount = (num, acc) =>
  num === 1
    ? acc > 500
      ? -1
      : acc
    : collatzGuessCount(processCollatz(num), acc + 1);

const processCollatz = (num) => (num % 2 === 0 ? num / 2 : num * 3 + 1);
```

```javascript
function collatz(num, count = 0) {
  return num == 1
    ? count >= 500
      ? -1
      : count
    : collatz(num % 2 == 0 ? num / 2 : num * 3 + 1, ++count);
}
```

```javascript
function collatz(num) {
  var answer = 0;
  while (num != 1 && answer != 500) {
    num % 2 == 0 ? (num = num / 2) : (num = num * 3 + 1);
    answer++;
  }
  return num == 1 ? answer : -1;
}
```

- 개인적으로 while문을 잘 사용하지 않는 경향이 있는데, 상황에 따라 while문을 적절히 이용할 수 있도록 해야겠다. 상황에 따라 while문과 for문 중 무엇이 가독성이 높을지도 고민해 봐야겠다.
- 주어진 함수를 여러 개의 함수로 나누어 사용하는 방식이 기억에 남는다. 함수와 삼항연산자를 적절히 이용해 길지 않고 가독성 높은 코드를 만들 수 있어야겠다.
- 반복 횟수가 500이 넘을 때도 주어진 수가 1이 될 때까지 연산을 반복한 후 -1을 리턴하는 경우들이 눈에 띈다. 함수를 단순하게 만들기 위해서이기도 하지만 주어진 수가 1이 될 때까지 연산을 계속해도 연산 횟수가 크게 늘어나지 않아서인 것으로도 보인다. 어떤 경우에 함수를 복잡하게 만들더라도 연산 횟수를 최대한 줄여야 하는지, 함수를 간단하게 만드는 대신 연산 횟수가 늘어난다면 얼마나 늘어나는 것 까지 허용되는지 생각해보고 공부해볼 필요가 있을 것 같다.

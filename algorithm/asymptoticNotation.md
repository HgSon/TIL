# 점근적 표기법

_2020-10-21 작성_

**실행 시간의 성장률(rate of growth)**

- 알고리즘 실행 시간은 입력값의 크기에 대한 함수로 나타낼 수 있다.
- 입력값의 증가에 따라 함수가 얼마나 빨리 커지는지를 `성장률`이라고 한다.
- 중요하지 않은 항목(입력값 증가에 따른 실행 시간 증가에 영향을 적게 미치는 부분)과 상수 계수를 제거한 것을 `점근적 표기법(asymptotic notation)` 이라고 한다.

- big-θ, big-O, big- 표현이 있다.

<br>

## Big-θ (빅 세타) 표기법

실행 시간에 대해 **점근적으로**<sup>[1]</sup> **근접한 한계값**<sup>[2]</sup>이 있다고 표현하는 것.

[1] n이 충분히 클 때 적용된다<br>
[2] 일정 상수값 내에서 실행 시간을 좁힐 수 있다.

<br>

### 예시)

<br>

```javascript
const doLinearSearch = (array, targetValue) => {
  for (var guess = 0; guess < array.length; guess++) {
    if (array[guess] === targetValue) {
      return guess;
    }
  }
  return -1;
};
```

- for문은 최대 `n`(array.length) 만큼 반복된다.
- for문을 수행할 때마다 실행되는 연산은 각각 상수시간이 걸린다. (c<sub>1</sub>)
- for문을 만들고, guess를 초기화하고 -1을 반환하는 데에 드는 추가적인 상수시간이 있다. (c<sub>2</sub>)
- 최악의 경우 총 계산에 걸리는 시간은 c<sub>1</sub> \* n + c<sub>2</sub>
- 상수 인자의 값은 알 수 없지만 실행 성장률과는 연관이 없다. 최악의 경우에 걸리는 시간은 배열 크기인 `n`을 따라 커진다.
- **실행 시간을 θ(n)으로 표기한다.** (n의 빅 세타, n의 세타.)

<br>

### θ(n)

- n이 충분히 크다면 k<sub>1</sub> <= 실행 시간 <= k<sub>2</sub>이다 (k<sub>1</sub>, k<sub>2</sub>는 상수).
- n에만 제한되는 표기법이 아니다.
- 상수 인자, 낮은 차원의 항목은 생략한다.
- 시간 단위를 고려할 필요가 없다는 이점이 있다.

#### 참조

1. Thomas H. Cormen., Devin Balkcom., & Khan Academy Computing Curriculum Team. (2020). Computer science unit: Algorithms. Retrieved from https://www.khanacademy.org/computing/computer-science/algorithms

2. 문병로. (2016). **쉽게 배우는 알고리즘 : 관계 중심의 사고법**(제4판). 서울: 한빛아카데미(주)

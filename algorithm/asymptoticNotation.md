# 점근적 표기법

_2020-10-21 작성_
_2020-10-24 추가작성_

**실행 시간의 성장률(rate of growth)**

- 알고리즘 실행 시간은 입력값의 크기에 대한 함수로 나타낼 수 있다.
- 입력값의 증가에 따라 함수가 얼마나 빨리 커지는지를 `성장률`이라고 한다.
- 중요하지 않은 항목(입력값 증가에 따른 실행 시간 증가에 영향을 적게 미치는 부분)과 상수 계수를 제거한 것을 `점근적 표기법(asymptotic notation)` 이라고 한다.

- big-θ, big-O, big- 표현이 있다.

<br>

## θ- (Big-θ) 표기법

<br>

![입력값 증가에 따른 실행시간 증가: 빅 세타 표기법](../assets/bigTheta.png)<br><br>

- 실행 시간에 대해 **점근적으로**<sup>[1]</sup> **근접한 한계값**<sup>[2]</sup>이 있다고 표현하는 것.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1] n이 충분히 클 때 적용된다<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2] 일정 상수값 내에서 실행 시간을 좁힐 수 있다.

<br>

- θ(_f_(n))은 점근적 증가율이 _f_(n)과 일치하는 모든 함수들의 집합.
  - 집합으로 정의되므로 _f_(n) ∈ θ(_f_(n))와 같으나 집합기호 대신 =를 사용한다.
  - 따라서 θ(_f_(n)) = _f_(n)으로 쓸 수 없다. n<sup>2</sup> ∈ θ(n<sup>2</sup>)

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

### 점근적 표기법 형태의 함수

- 최소 소요 시간은 `θ(1)`

  - ex. 오름차순으로 정렬한 배열에서 최솟값 찾기.
    <br>인덱스 [0]에 있으므로 상수시간 소요.

- θ(log<sub>a</sub>n)시간이 소요되는 경우

  - 밑이 상수라면 어떤 밑값이 사용되는지 문제가 되지 않음<br>
    log<sub>a</sub>n = log<sub>b</sub>n / log<sub>b</sub>a <br>
    log<sub>b</sub>a는 점근적 표기법에서 무시가능한 상수값

  - ex. 이진검색 <br>
    추측 횟수는 최대 log<sub>2</sub>n + 1 번. 추가 상수 시간 소요
    - 따라서 , 이진검색의 점근적 표기는 θ(log<sub>2</sub>n) <br>
      _모든 양수 a에 대하여 θ(log<sub>a</sub>n)이지만 2의 제곱을 많이 사용한다_

- a, b가 상수이고 a < b라면 <br> θ(n<sup>a</sup>)의 성장률 < θ(n<sup>b</sup>)의 성장률
- a가 상수이고 b > 1일 때 <br>모든 다항식 함수 n<sup>a</sup>의 성장률 < 지수 함수 b<sup>n</sup>의 성장률
- 지수함수 a<sup>n</sup>의 성장률 < n!의 성장률

## O- (Big-O) 표기법

<br>

![입력값의 증가에 따른 실행시간 증가: 빅 오 표기법](../assets/bigO.png)
<br><br>

- 점근 시간의 **상한선**을 표기
  - **실행 시간은 최대 O(_f_(n))만큼 커지지만, 더 천천히 커질 수도 있다**
  - **O(_f_(n))은 점근적 증가율이 _f_(n)을 넘지 않는 모든 함수들의 집합이다**
- 실행 시간에 대한 보다 포괄적인 값으로, 실행 시간에 대해 상한값을 둔다<br>
  - _cf._ 빅 세타는 **최악의 경우**에 대한 점근값을 준다.<br>
    따라서 실행시간은 절대 Θ(log<sub>2</sub>n)를 넘지 않지만, Θ(log<sub>2</sub>n)로 이하일 수도 있다(하한선 아래).
  - _ex._ 찾고자 하는 값을 첫 번째 추측에서 찾을 경우, 실행 시간은 Θ(1)
  - 이진 검색은 실행 시간은 Θ(log<sub>2</sub>n)이므로, O(log<sub>2</sub>n)이기도 하다. <br>
    반대로, 이진 검색은 반드시 O(log<sub>2</sub>n)안에 시행되지만, 반드시 Θ(log<sub>2</sub>n)안에 시행되지는 않는다.
- 실행 시간을 모두 포함하는 최소값이 아니다.
  - 이진 검색은 O(log<sub>2</sub>n)이지만, O(n)등으로 표기해도 옳다. (하지만 가장 정확한 표기를 사용하는 것이 좋다)
  - 10달러를 가지고 있을 때, "100달러보다 확실히 적게 가지고 있다"고 해도 참인 것과 같다.
  - _cf._ 빅 세타의 경우 이진검색의 실행 속도를 Θ(n)이라고 표기할 수 없다. (하한선의 존재 때문)
- 함수의 성장률이 어느 한계보다 **작다**고 표기할 경우 `o- (Little-O)` 표기법을 사용한다.
  - n = o(n<sup>2</sup>) 이지만 n = o(n)이 아니다. 후자는 점근적으로 동일하다(더 작지 않다).

<br>

## Ω- (Big-Ω) 표기법

<br>

![입력값 증가에 따른 실행속도 증가의 빅 오메가 표기법](../assets/bigOmega.png)

<br>

- 실행속도에 대한 **점근적 하한선** 을 표기
- 실행시간이 **충분히 큰 입력값에서 최소한 어느 정도 걸린다**
  - _ Θ(\_f_(n))은 점근적 성장률이 적어도 _f_(n)이 되는 모든 함수들의 집합이다.
  - _note:_ Θ(_f_(n))은 상한선과 하한선을 모두 포함. <br>
    O(_f_(n))은 그 중 상한선을 표기하기 때문에 이진검색의 실행 속도를 O(log<sub>2</sub>n)으로 표기할 수 있다 <br>
    마찬가지로, 이진검색에서 **최악의 경우**에 걸리는 실행 속도가 Ω(log<sub>2</sub>n)라고 할 수 있다.
- 하한값이므로, 빅 오 표기법과 마찬가지로 부정확하지만 옳은 표기법이 존재한다.
  - _ex._ 이진 검색에서 **최악의 경우** 소요되는 실행 시간이 Ω(1)이라고도 말할 수 있다. (최악의 경우 걸리는 시간이므로 Ω(1)는 부정확한가..? 최선의 경우까지 포함해서 말하는 경우 Ω(1)이 정확하지만, 이 경우에는 불필요할 것 같다)<br>
    이것은 10달러가 있을 때, "1달러보다 확실히 많이 있다" 고 말해도 옳은 것과 같다.
- 한계보다 **큰** 성장률을 표기할 경우 `ω-` (Little Omega) 표기법을 사용한다.

## 점근적 표기법의 엄밀한 정의

### O-

O(_g_(n)) = {_f_(n) | 모든 n >= n<sub>0</sub>에 대하여 _f_(n) >= c _ *g*(n)인 양의 상수 c와 n<sub>0</sub>이 존재한다} <br>
= O(*g*(n)) = {*f*(n) | 충분히 큰 모든 n에 대하여 *f*(n) >= c _ _g_(n)인 양의 상수 c가 존재한다} <br>

### Ω-

Ω(_g_(n)) = {_f_(n) | 모든 n >= n<sub>0</sub>에 대하여 _f_(n) <= c _ *g*(n)인 양의 상수 c와 n<sub>0</sub>이 존재한다} <br>
= Ω(*g*(n)) = {*f*(n) | 충분히 큰 모든 n에 대하여 *f*(n) <= c _ _g_(n)인 양의 상수 c가 존재한다} <br>

### θ-

θ(_g_(n)) = O(_g_(n)) ∩ Ω(_g_(n)) 이므로,
θ(_g_(n)) = {_f_(n) | 충분히 큰 모든 n에 대하여 c<sub>1</sub> _ *g*(n) <= *f*(n) <= c<sub>2</sub> _ _g_(n)인 양의 상수 c<sub>1</sub>, c<sub>2</sub>가 존재한다} <br>

<br><br>

## 연습문제

입력의 크기가 n일 때 알고리즘의 수행시간이 어떤 함수에 비례하는가

1.

```javascript
const sample = (array) => {
  let sum1 = 0;
  const n = array.length;
  for (let i = 0; i < n; i++) {
    sum1 += array[i];
  }
  let sum2 = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum2 += array[i] * array[j];
    }
  }
  return sum1 + sum2;
};
```

- 총 소요시간은 `for문` + 상수시간
  - 첫번째 for문의 소요시간은 n에 비례함
  - 두번째 for문의 소요시간은 (n + (n-1) + (n-2) + ... + 1) \* n에 비례함. 즉, n<sup>2</sup>에 비례함
- 따라서, 소요시간은 n<sup>2</sup>에 비례함

2.

```javascript

arr1 , arr2, arr3 은 각 원소가 길이 n인 배열인 길이 n인 배열

const matrixMult = (arr1, arr2, arr3) => {
  const n = arr1.length
  for(let i = 0; i<n; i++){
    for(let j = 0; j<n; j++){
      arr3[i][j] = 0
      for(let k = 0; k<n; k++){
        arr3[i][j] = arr3[i][j] + arr1[i][k] + arr2[k][j]
      }
    }
  }
  return arr3
}
```

- 총 소요시간은 for문 + 상수시간
- 소요시간은 n<sup>3</sup>에 비례

## 연습문제 오답풀이

log<sub>2</sub>n<sup>log<sub>2</sub><sup>17</sup></sup> 과 log<sub>2</sub>17<sup>log<sub>2</sub><sup>n</sup></sup> 사이의 관계

[o] log<sub>2</sub>n<sup>log<sub>2</sub><sup>17</sup></sup> 은 O(log<sub>2</sub>17<sup>log<sub>2</sub><sup>n</sup></sup>)이다. <br>
[o] log<sub>2</sub>n<sup>log<sub>2</sub><sup>17</sup></sup> 은 Ω(log<sub>2</sub>17<sup>log<sub>2</sub><sup>n</sup></sup>)이다. <br>
[o] log<sub>2</sub>n<sup>log<sub>2</sub><sup>17</sup></sup> 은 Θ(log<sub>2</sub>17<sup>log<sub>2</sub><sup>n</sup></sup>)이다.

### 풀이

- log<sub>2</sub>a<sup>b</sup> 는 b \* log<sub>2</sub>a와 같다.

  - log<sub>a</sub>x<sup>n</sup> = n \* log<sub>a</sub>x

  1. log<sub>a</sub>x = m 으로 두면 <br>
  2. x = a<sup>m</sup>
  3. x<sup>n</sup> = a<sup>mn</sup>
  4. 양변에 로그를 취하면 log<sub>a</sub>x<sup>n</sup> = log<sub>a</sub>a<sup>mn</sup>
  5. x<sup>n</sup> = y 일 때 log<sub>x</sub>y = n 이므로, <br> log<sub>a</sub>a<sup>mn</sup> = a를 몇 번 제곱하면 a<sup>mn</sup>이 되는가 = mn
  6. `4.` `5.` 에서 log<sub>a</sub>x<sup>n</sup> = mn
  7. `1.` 에서 log<sub>a</sub>x = m이므로
  8. log<sub>a</sub>x<sup>n</sup> = log<sub>a</sub>x \* n

#### 참조

1. Thomas H. Cormen., Devin Balkcom., & Khan Academy Computing Curriculum Team. (2020). Computer science unit: Algorithms. Retrieved from https://www.khanacademy.org/computing/computer-science/algorithms

2. 문병로. (2016). **쉽게 배우는 알고리즘 : 관계 중심의 사고법**(제4판). 서울: 한빛아카데미(주)

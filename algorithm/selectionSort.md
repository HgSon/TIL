# 선택 정렬(selection sort)

_2020-10-30 작성: 칸아카데미_

## 스왑 함수 구현

두 항목의 위치를 바꾸는 swap 함수를 수정하세요.

```javascript
var swap = function (array, firstIndex, secondIndex) {
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = array[firstIndex];
};
```

수정

```javascript
const swap = (array, firstIndex, secondIndex) => {
  const firstToSecond = array[firstIndex];
  const secondToFirst = array[secondIndex];
  array[firstIndex] = secondToFirst;
  array[secondIndex] = firstToSecond;
};

또는;

const swap = (array, firstIndex, secondIndex) => {
  const firstToSecond = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = firstToSecond;
};
```

## 선택 정렬 의사코드

1. 가장 작은 카드를 찾아서 첫 번째 카드와 바꾼다
2. (...) n-1번째로 작은 카드를 찾아서 n-1번째 카드와 바꾼다.

### 구현

1. 가장 작은 카드를 찾는다
   1. array[0]과 array[1]을 비교
      1. array[0] < array[1]이라면 array[0]과 array[2]를 비교
      2. array[1] < array[0]이라면 array[1]과 array[2]를 비교
      3. 1.과 2.를 반복하며, 비교한 수 중 큰 수는 버리고 작은 수를 가지고 다음 수와 비교한다. 이미 버린 수는 가지고 있는 수보다 크기 때문에 고려하지 않아도 된다.
2. 1.을 반복

sort 함수는 이미 구현된 메커니즘에 따라 작동하는 것이므로 쓰지 않기로 한다.

```javascript
const selectionSort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        const num = array[i];
        array[i] = array[j];
        array[j] = num;
      }
    }
  }
  return array;
};
```

### 칸아카데미 응용문제(함수 구현을 위한)

#### 하위 배열에서 최소값 찾기

```javascript
const indexOfMinimum = (array, startIndex) => {
  var minValue = array[startIndex];
  var minIndex = startIndex;
  return minIndex;
};
```

#### 함수활용

swap함수와 indexOfMinimum 함수를 사용해 selectionSort함수를 완성하시오

```javascript
var swap = function (array, firstIndex, secondIndex) {
  var temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};

var indexOfMinimum = function (array, startIndex) {
  var minValue = array[startIndex];
  var minIndex = startIndex;

  for (var i = minIndex + 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minIndex = i;
      minValue = array[i];
    }
  }
  return minIndex;
};

var selectionSort = function (array) {
  for (var i = 0; i < array.length; i++) {
    var minIndex = indexOfMinimum(array, i);
    swap(array, i, minIndex);
  }
};
```

### 선택 정렬 분석하기

- 크기 n인 배열에 대해 swap, indexOfMinimun, selectionSort를 사용할 경우
  - swap는 상수 시간 소요 <br>
    _Θ(n)_
  - indexOfMininum의 for문은 하위배열의 크기만큼 시간 소요
    - n + (n-1) + ... + 1 = (n+1) \* (n/2) <br>
      _Θ(n<sup>2</sup>)_
  - 나머지 부분은 상수 시간 소요 (_Θ(n)_)
- 즉, selectionSort의 소요시간은 _Θ(n<sup>2</sup>)_

#### 참조

1. Thomas H. Cormen., Devin Balkcom., & Khan Academy Computing Curriculum Team. (2020). Computer science unit: Algorithms. Retrieved from https://www.khanacademy.org/computing/computer-science/algorithms

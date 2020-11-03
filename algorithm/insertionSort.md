# 삽입 정렬

_2020-10-31 작성_

새로운 값을 정렬된 배열에 삽입함으로써 정렬한다. <br>

길이가 n인 배열에 대하여

1. 인덱스[1]을 인덱스 [0]과 비교하여 정렬한다.
2. 인덱스[0], 인덱스[1]이 하위배열이 된다.
3. 인덱스[2]를 2.에서 생성한 하위배열의 요소들과 비교하여 하위배열에 삽입한다.
4. 인덱스[n-1]까지, 2. 3.을 반복한다.

## 구현

```javascript
const insertionSort = (array) => {
  let subArray = [];
  array.forEach((targetNum) => {
    const insertIndex = subArray.findIndex(
      (comparedNum) => comparedNum > targetNum
    );
    insertIndex === -1
      ? subArray.push(targetNum)
      : subArray.splice(insertIndex, 0, targetNum);
  });
  return subArray;
};
```

소요시간은

- `array.forEach()`에 소요되는 시간만큼 반복되는 `subArray.findIndex()` 소요시간에 비례한다.
- `subArray.findIndex()`의 소요시간은 _Θ(n)_
- `array.forEach()` 소요시간은 _Θ(n)_
- 따라서 총 소요시간은 _Θ(n<sup>2</sup>)_

### 삽입 구현

삽입을 조건에 따라 먼저 구현하고, 삽입정렬을 구현

```javascript
var insert = function (array, rightIndex, value) {
  var index = 0;
  for (var i = rightIndex; i >= 0; i--) {
    if (array[i] <= value) {
      index = i + 1;
      break;
    }
  }
  var answerArr = array.slice(0, rightIndex);
  index > 0 ? answerArr.splice(index, 0, value) : answerArr.unshift(value);
  return answerArr;
};
```

삽입정렬에서 삽입이 이루어질 때

- array[0] 에서 array[rightIndex] 까지는 오름차순으로 정렬되어 있음
- insert(array, rightIndex, value) (value는 array[rightIndex+1])
- array[0] 에서 array[rightIndex+1]까지가 오름차순으로 정렬됨. 위를 반복

```javascript
var insert = function (array, rightIndex, value) {
  var i;
  for (i = rightIndex; i >= 0 && array[i] > value; i--) {
    array[i + 1] = array[i];
  }
  array[i] = value;
};
```

#### 참조

1. Thomas H. Cormen., Devin Balkcom., & Khan Academy Computing Curriculum Team. (2020). Computer science unit: Algorithms. Retrieved from https://www.khanacademy.org/computing/computer-science/algorithms

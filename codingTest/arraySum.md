# 프로그래머스 두 개 뽑아서 더하기

정수 배열 numbers에서 서로 다른 인덱스에 있는 두 수를 뽑아 더해 만들 수 있는 모든 수를 배열에 담아 오름차순으로 return하시오.

- numbers의 두 수의 합 중 중복되는 수가 있을 경우 1개만 배열에 담는다.

## 최초 풀이

```javascript
function solution(numbers) {
  var sumList = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      sumList.push(numbers[i] + numbers[j]);
    }
  }
  sumList.sort((a, b) => a - b);
  const answer = new Set(sumList);
  return Array.from(answer);
}
```

- index를 이용해 배열을 정리할 계획이어서 sumList에 sort를 사용했지만 Set을 사용한다면 나중에 정렬했어도 됐다.
- `const answer = new Set(sumList); return Array.from(answer)` 대신에 `return [...new Set(sumList)]`를 사용했어도 됐음
- set 대신 배열만으로 풀 경우 :

```javascript
if (answer.indexOf(numbers[i] + numbers[j]) === -1) {
  answer.push(numbers[i] + numbers[j]);
}
```

# 프로게이머스 다트 게임

_2020-10-10 작성_

다트 3번을 던져서 얻는 점수의 합을 구하시오

1. 얻을 수 있는 기본점수는 0~10점
2. 각각 S ,D , T 중 하나의 영역에 속하고, 각각 얻은 기본점수의 1, 2, 3제곱만큼의 점수를 얻은 것으로 계산된다.
3. 옵션으로 * 또는 #에 당첨될 수 있다. (*와 #에 한번에 당첨되기는 불가능하고, 당첨되지 않을 수도 있다.)
4. \*는 해당 점수와 직전 점수를 2배로 만든다.
   - 앞서 얻은 \*와 효과가 중첩될 수 있다.
   - 첫 번째 기회에서 \*에 당첨된다면 해당 점수만 2배가 된다.
5. #은 해당 점수에 -1을 곱한다.
   - #와 \*의 효과가 중첩될 경우, 해당 점수는 -2배가 된다.
6. ex. `1S2D*3T = 1**1 * 2 + 2**2 * 2 + 3**3 = 37`.

## 문제점

- 정규표현식을 이용해 각 시행을 나눈 뒤 계산하려 했으나 정규표현식 사용에 익숙하지 않아 실패했다.
- 정규표현식 및 문자열 사용을 더 공부할 것.
- 다른 방식의 풀이를 시도해볼 것.

## 풀이

```javascript
function solution(dartResult) {
  const splited = dartResult.split(
    /(10\D[#*])|(10\D)|([1-9]\D[#*])|([1-9]\D)|(0\D[#*])|(0\D)/
  );
  const results = [];
  const answer = [];
  splited.map((v) => {
    if (v && v !== "") {
      results.push(v);
    }
  });
  results.map((v, i) => {
    let score = parseInt(v);
    if (v.indexOf("D") > -1) {
      score = score ** 2;
    } else if (v.indexOf("T") > -1) {
      score = score ** 3;
    }
    if (v.indexOf("#") > -1) {
      return answer.push(score * -1);
    } else if (v.indexOf("*") > -1) {
      answer[i - 1] = answer[i - 1] * 2;
      return answer.push(score * 2);
    }
    return answer.push(score);
  });
  return answer.reduce((acc, v) => acc + v);
}
```

### 개선점

- 문장을 split하는 조건이 지저분하다. 복잡한 조건이었다면 같은 방식으로 풀기 어려웠을 것 같다.
- 배열을 반복해서 만들며 결과를 도출해서 코드가 깔끔하지 못한 것 같다. 가독성을 높이는 방법을 고려해야 할 것 같다.

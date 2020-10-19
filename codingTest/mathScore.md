# 모의고사 (수학점수계산)

_2020-10-10 최초풀이_&nbsp;&nbsp;,&nbsp;&nbsp;_2020-10-18 정답풀이_

학생 1, 2, 3이 수학 시험을 모두 찍을 때 가장 정답을 많이 맞춘 한 명을 리턴하시오.
최고득점자가 여러명이라면 오름차순으로 배열.

- 각 학생이 찍는 방식
  - 학생1 : [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...]
  - 학생2 : [2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...]
  - 학생3 : [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]

## 최초 풀이

```javascript
function solution(answers) {
  let highScorers = [];
  let scores = [
    { id: 1, score: 0 },
    { id: 2, score: 0 },
    { id: 3, score: 0 },
  ];
  let ansTwo = [];
  let ansThree = [];
  for (let i = 0; i < answers.length; i += 8) {
    ansTwo.push(answers.slice(i, i + 8));
  }
  for (let i = 0; i < answers.length; i += 10) {
    ansThree.push(answers.slice(i, i + 10));
  }
  answers.forEach((v, i) => {
    if ((i % 5) + 1 === v) scores[0]["score"]++;
  });
  for (let ansList of ansTwo) {
    ansList.map((v, i) => {
      if (!i % 2) return scores[1]["score"]++;
      switch (i) {
        case 5:
          if (v === 4) scores[1]["score"]++;
          break;
        case 7:
          if (v === 5) scores[1]["score"]++;
          break;
        default:
          if (v === i) scores[1]["score"]++;
          break;
      }
    });
  }
  for (let ansList of ansThree) {
    ansList.map((v, i) => {
      switch (i) {
        case 0:
        case 1:
          if (v === 3) {
            scores[2]["score"]++;
          }
          break;
        case 2:
        case 3:
          if (v === 1) {
            scores[2]["score"]++;
          }
          break;
        case 4:
        case 5:
          if (v === 2) {
            scores[2]["score"]++;
          }
          break;
        case 6:
        case 7:
          if (v === 4) {
            scores[2]["score"]++;
          }
          break;
        case 8:
        case 9:
          if (v === 5) {
            scores[2]["score"]++;
          }
          break;
      }
      return;
    });
  }
  scores.sort((a, b) => b["score"] - a["score"]);
  scores.map((v, i, array) => {
    if (i === 0) {
      return highScorers.push(v["id"]);
    } else {
      if (v["score"] === array[0]["score"]) {
        return highScorers.push(v["id"]);
      }
    }
  });
  highScorers.sort();
  return highScorers;
}
solution(answers);
```

오류

1.  ~~` if (!i % 2) return scores[1]["score"]++;`~~

    `if(!(i%2)&&v===2)return scores[1]["score"]++`

    - !i%2는 앞부터 연산된다

2.  **오류 완전히 파악되지 않아서 다른 방식의 풀이를 먼저 시도**

개선

1. 정렬 후 순차적으로 값을 비교하고 id를 새 배열에 담아 다시 정렬하는 방식이 번거롭다
   - `Math.max()`를 사용해서 최대값을 구한 후 값을 최대값과 직접 비교한다.
     - 정렬을 위해 id를 따로 저장했는데, 정렬이 필요 없어지므로 id를 따로 저장할 필요가 없어진다.

변경 전

```javascript
let scores = [
    { id: 1, score: 0 },
    { id: 2, score: 0 },
    { id: 3, score: 0 },
  ];
let highScorers = []

점수가 오를 때마다 scores[index]["score"]++

scores.sort((a, b) => b["score"] - a["score"]);
  scores.map((v, i, array) => {
    if (i === 0) {
      return highScorers.push(v["id"]);
    } else {
      if (v["score"] === array[0]["score"]) {
        return highScorers.push(v["id"]);
      }
    }
  });
  highScorers.sort();
  return highScorers;
```

변경 후

```javascript
let scores = [0,0,0]
let highScorers = []

점수가 오를 때마다 scores[index]++

const maxScore = Math.max(scores[0], scores[1], scores[2])
scores.map((score,student)=>{
  if(score===maxScore) highScores.push(i+1)
})
return highScorers
```

## 2020-10-18 풀이

```javascript
function solution(answers) {
  const student1 = [1, 2, 3, 4, 5];
  const student2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const student3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let scores = [0, 0, 0];
  let highScorers = [];
  for (let i = 0; i < answers.length; i++) {
    if (student1[i % student1.length] === answers[i]) {
      scores[0]++;
    }
    if (student2[i % student2.length] === answers[i]) {
      scores[1]++;
    }
    if (student3[i % student3.length] === answers[i]) {
      scores[2]++;
    }
  }
  const maxNum = Math.max(scores[0], scores[1], scores[2]);
  scores.map((score, i) => {
    if (score === maxNum) highScorers.push(i + 1);
  });
  return highScorers;
}
```

### 느낀점 및 개선점

- 풀이가 막힌다면 다른 각도에서 생각해보아야 한다.
  - 최초 문제 풀이 시 학생들이 답을 찍는 패턴에서 규칙을 찾아야 한다고 생각했다.
  - 포기하고 하드코딩으로 문제를 풀어보려고 했으나 시간이 많이 지체되었다.
  - 패턴을 찾아야 한다는 생각 때문에, 패턴을 찾지 못했으니 정답을 맞추는 경우를 하드코딩해야한다고 자연스럽게 생각하게 되었다.
  - 그러나, 답안의 반복구간의 길이를 이용하면 보다 간단한 풀이가 가능했다. 답안의 반복구간이 짧아 반복구간을 한번만 하드코딩 하는 것이 효율적이었다.

<br><br>

### 다른 사람의 풀이

<br>

```javascript
function solution(answers) {
  var answer = [];
  var a1 = [1, 2, 3, 4, 5];
  var a2 = [2, 1, 2, 3, 2, 4, 2, 5];
  var a3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  var a1c = answers.filter((a, i) => a === a1[i % a1.length]).length;
  var a2c = answers.filter((a, i) => a === a2[i % a2.length]).length;
  var a3c = answers.filter((a, i) => a === a3[i % a3.length]).length;
  var max = Math.max(a1c, a2c, a3c);

  if (a1c === max) {
    answer.push(1);
  }
  if (a2c === max) {
    answer.push(2);
  }
  if (a3c === max) {
    answer.push(3);
  }

  return answer;
}
```

1. `Array.filter()` 메소드를 이용해 정답 배열을 만든다. 정답 배열의 길이가 점수가 된다.
2. 점수 중 최대값을 구한다.
3. 점수와 최대값이 같을 경우 반환할 배열에 학생 id(숫자) 를 `push`한다.

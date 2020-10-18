//_2020-10-10 작성_

function solution(answer) {
  let scores = [
    { id: 1, score: 0 },
    { id: 2, score: 0 },
    { id: 3, score: 0 },
  ];
  let ansTwo = [];
  let ansThree = [];
  for (let i = 0; i < answer.length; i += 8) {
    ansTwo.push(answer.slice(i, i + 8));
  }
  for (let i = 0; i < answer.length; i += 10) {
    ansThree.push(answer.slice(i, i + 10));
  }
  answer.forEach((v, i) => {
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
        case (0, 1):
          if (v === 3) scores[2]["score"]++;
          break;
        case (2, 3):
          if (v === 1) scores[2]["score"]++;
          break;
        case (4, 5):
          if (v === 2) scores[2]["score"]++;
          break;
        case (6, 7):
          if (v === 4) scores[2]["score"]++;
          break;
        case (8, 9):
          if (v === 5) scores[2]["score"]++;
          break;
      }
    });
  }
  scores.sort((a, b) => a["score"] - b["score"]);
  if (scores[0]["score"] === scores[2]["score"]) {
    return [1, 2, 3];
  } else {
    scores[1]["score"] < scores[2]["score"]
      ? (scores = scores.pop())
      : scores.pop();
    return scores.map((v) => v["id"].sort());
  }
}
console.log(solution(answer));

///2010-10-17 풀이
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
//틀림
//틀린이유??
// 1. ansTwo에서 !(i%2)&& v ===2로 해야 했다.
// 다음 디버깅 필요

//2020-10-18 풀이
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
  scores.map((v, i) => {
    if (v === maxNum) highScorers.push(i + 1);
  });
  return highScorers;
}

//다른 사람의 풀이

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

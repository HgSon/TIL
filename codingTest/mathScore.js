//_2020-10-10 작성_

// 수포자들이 수학시험을 찍을 때 누가 가장 정답을 많이 맞혔는지
// 1번: [1,2,3,4,5,1,2,3,4,5...]
// 2번: [2,1,2,3,2,4,2,5,..]
1357;
// 3번: [3,3,1,1,2,2,4,4,5,5,...]

//
//
const answer = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

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

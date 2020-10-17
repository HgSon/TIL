# 시저 암호

_2020-10-17 작성_

문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성하시오.

- 공백은 아무리 밀어도 공백
- s는 알파벳 소문자, 대문자, 공백으로 이루어짐
- s의 길이는 8000이하
- n은 1 이상, 25 이하인 자연수

## 풀이

```javascript
function solution(s, n) {
  let answer = "";
  for (let i = 0; i < s.length; i++) {
    let char = "";
    const uniCode = s.charCodeAt(i);
    if (uniCode >= 65 && uniCode <= 90) {
      let code = uniCode + n;
      if (code > 90) {
        code = code - 26;
      }
      char = String.fromCharCode(code);
    } else if (uniCode >= 97 && uniCode <= 122) {
      let code = uniCode + n;
      if (code > 122) {
        code = code - 26;
      }
      char = String.fromCharCode(code);
    } else {
      char = s.charAt(i);
    }
    answer += char;
  }
  return answer;
}
```

- 코드에 반복되는 부분이 많아 줄일 수 있을 것으로 보인다.
- s에 포함될 수 있는 문자는 알파벳 대소문자 및 공백 뿐이라는 조건을 이용할 수 있을 것 같다.
  - 해당되는 아스키코드는 32 또는 65~90, 97~122이다.

# 테스트 작성

_2020-11-22_

- 기타 참고

```javascript
//validator.js
(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.validator = factory();
  }
})(this, function () {
  const validator = {
    isNumber(a) {
      return typeof a === "number";
    },
  }; //object
  return validator;
});

// jest.config.js

module.exports = {
  // (..)
  collectCoverageFrom: [
    "**/utils*.js", //util 안의 모든 js 파일에 대해 검사
  ], //"**/*.js" 모든 js에 대해
};
```

- test 코드 작성

```javascript
//uniqueArray.test.js
import uniqueArray from "./utils/uniqueArray.js";
import { TestScheduler } from "jest";

describe("uniqueArray.js", () => {
  test("중복 제거 확인", () => {
    expect(uniqueArray([0, 1, 1])).toStrictEqual([0, 1]);
  });
  test("중복 제거 확인 string", () => {
    expect(uniqueArray(["가", "나", "나", "다"])).toStrictEqual([
      "가",
      "나",
      "다",
    ]);
  });
});
///중첩 describe 가능
```

### 배운점

- 함수가 확장되거나 여러 모듈에서 사용될 때 사용할 수 있는 테스트 코드 작성 방식을 알 수 있었다. 테스트는 한번도 해본 적이 없었는데 세션을 진행하며 테스트 코드를 접하고 작동하는 방식을 알 수 있었다.
- 여러 작은 함수로 코드를 나누어 작성하며 개발하는 방식에 대해 생각해보게 되었다.

### 해볼 일

- 테스트 코드 작성해보기
- TDD 공부하기

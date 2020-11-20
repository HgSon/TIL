# 자바스크립트 테스트

_2020-11-20_

### 목적

전체 작업 속도를 올린다. <br>
코드 변경 시 기존 코드를 무너뜨리지 않는다는 확신을 가질 수 있다 <br>

<br>

## js 테스팅의 기초

<br>

### 1. 기본적인 테스트 작성

<br>

예시 코드

```javascript
file: math.js;

const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { sum, subtract };
```

기본적인 테스트 형식

```javascript
file: basic-test.js

const actual = true
const expected = false
if(actual !== expected){ // 이 부분을 단언 (assertion)이라고 한다
    throw new Error(`${actual}is not ${expected}`)
}

node basic-test.js를 실행한다.
```

`math.js`의 테스팅

```javascript
file: 1.js

const {sum, subtract} = require('./math')
let result, expected
result = sum(3,7)
expected = 10
if(result !== expected){
    throw new Error(`${result} is not equal to ${expected}`)
}
result = subtract(7,3)
expected = 4
if(result !== expected){
    throw new Error(`${result} is not equl to ${expected}`)
}

node 1.js 실행
```

에러메시지를 최대한 도움이 되도록 표현한다.

<br>

### 2. 테스팅 프레임워크를 사용한 테스트코드 작성

1.을 리팩토링

```javascript
const assert = require("assert");
const { sum, subtract } = require("./math");

let result, expected;

result = sum(3, 7);
expected = 10;

assert.stricEqual(result, expected);

result = subtract(7, 3);
expected = 4;

assert.strictEqual(result, expected);
```

<br><br>

### 3. 테스팅 프레임워크, 단언 라이브러리 작성

<br>

단언 라이브러리 `expect`

```javascript
const { sum, subtract } = require("./math");
let result, expected;

const expect = (actual) => {
  return {
    //object를 리턴하는것
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
};

result = sum(1, 7);
expected = 10;
expect(result).toBe(expected);

result = subtract(7, 3);
expected = 4;
expect(result).toBe(expected);
```

### 4. 헬퍼 함수를 통한 문제점 해결 (테스트 분리)

```javascript
const { sum, subtract } = require("./math");
let result, expected;
const expect = (actual) => {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
};
const test = (title, cb) => {
  try {
    cb();
    console.log(`-[x] ${title}`);
  } catch (error) {
    console.error(`X ${title}`);
    console.error(error);
  }
};

let result, expected;

test("sum", () => {
  const result = sum(3, 2);
  const expected = 10;
  expect(result).toBe(expected);
});

test("subtract", () => {
  const result = subtract(3, 2);
  const expected = 1;
  expect(result).toBe(expected);
});
```

## 참조

1.  rinae's devlog (2018). [번역] 그래서, 자바스크립트 테스트가 뭔가요? from http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/

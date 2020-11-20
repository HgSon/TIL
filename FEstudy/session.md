# FE study live session 팁

- `Toggle button` : class명을 _Toggle**Btn**_ 으로 한정지을 필요는 없다. <br>
  의미를 한정지으면 재사용하거나 버튼을 사용하지 않게 된 후에는 혼란스러울 수 있다. <br>
  역할에 맞춘 네이밍을 하는 것이 좋다. <br>
  `Button.js`와 `DarkModeToggleBtn.js`는 컨벤션이 통일되지 않은 느낌을 준다.

- 토글 체크박스: `.addEventListener("click")` 대신 **`"onchange"`** <br>
  클릭이 인식되지 않는 상황(css 스타일링이후에 클릭이 안 먹히는 상황, 키보드 조작으로 인식되지 않는 상황)에 취약할 수 있다.

- `function({data}){}`와 `function(file){}` <br>
  _(`{data: {...}, data2: {...}}`에서 data를 사용할 때)_<br>
  : 확장성을 위해 객체 형태로 인자를 받는다. <br>
  ex. spread형식을 사용하거나 다른 인자를 받기 위해 수정해야하는 경우 등 <br>

- 커스텀 어트리뷰트 : 커스텀 어트리뷰트를 부여해 이벤트 제어에 이용한다 <br>
  `class`는 css와 연관되므로. <br>
  ex.
  ```javascript
  //클래스 사용
  e => e.target.className === 'test' ? console.log("target") : console.log("x")

      //커스텀
       target.setAttribute('data-action', 'action')
          e => e.target.dataset.action === 'action' ? console.log('target') : console.log('x')
      ```

- 함수명은 작성하지 않은 사람이 봐도 뜻을 유추하기 쉽게 <br>
  ex. `this.loading.show()` , `this.loading.setState(show=false)`

- `setAttribute('style': 'display: none;')` : 스타일이 전부 업데이트된다. <br>
  다른 스타일에 접근해야 할 경우를 위해 `.style.display`로 직접 접근한다.<br>

- 스타일을 객체형식으로 저장해서 적용하는 예시 <br>

```javascript
// style.js
const cssObject = {
  display: "block",
  color: "red",
};
export default function stringCss(object) {
  let result = "";
  Object.keys(object).map((item) => {
    result += `${key}:`;
    result += `${object[key]}`;
    return result;
  });
}
DOM.style = stringCss(cssObject);

//style.test.js mocha framework
import style from "../utils/style.js";
describe("style.js", () => {
  test("동작 확인 1", () => {
    const input = {
      display: "block",
      color: "red",
    };
    const output = 'display: "block"; color: "red"';
    expect(stringCss(input)).toStrictEqual(output);
  });
});
```

- `intersectionObserver` 생성자 콜백함수에서 `forEach((entry, index))`의 index 사용에서 발생했던 오류 : <br>

```javascript
const lazyLoading = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    console.log(entry); //0,1,2,3,... 일반적으로 기대했던 index 나옴
    if (entry.isIntersecting) {
      console.log(entry); // 0,1,2, 0,1,2, .. 그때그때 보이는 대상에 대해 새로 매겨진 인덱스 반환
    }
  });
}, options);
```

-즉시실행함수 : <br>

```javascript
(function (arg1, arg2) {
  //codes
})(
  param1,
  param2
)(
  // FE study util/validator.js 예시
  function (root, arg) {
    //root ...
  }
)(this, fn);
//함수를 this에 바인딩시키려고 한 것
```

- 모듈화가 중요하다(무조건 잘게 x) : alert 작업같은 경우, 처음에는 단순 래핑이지만

```javascript
export default function callAlert(msg) {
  alert(msg);
}
```

작업이 진행되면서 ui를 입히고 복잡한 분기를 다룰 수 있다. (ex. `alertify`)

- 라이브러리 래핑하는 습관 : 유지보수가 편리해진다.

<br>

### 공부할 것

- [ ] Document browser API
  - [ ]
  - [ ]
- [ ] Window 객체
- [ ] document 객체

### 미션

- 50개 사진 전부 보여주는 게 아니고 5개를 처음에 뽑아와서 돌아가며 1개씩 보여주는 것
- 에러에 대한 분기: 에러타입마다 그냥 지나갈지 보여줄지 등

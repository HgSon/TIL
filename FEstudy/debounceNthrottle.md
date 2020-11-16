# Debounce, Throttle

_2020-11-16_

요청이나 처리의 빈도를 제한하거나 지연시켜 이벤트 콜백의 과도한 실행을 막아, 성능 문제의 발생을 막는다. 즉 이벤트를 더 적게 발생시킨다. <br>
이벤트와 함수 실행 사이에 제어 계층을 제공하나 DOM 이벤트가 얼마나 자주 실행될지는 제어하지 않는다.

<br>
사용 예)<br>

- 사용자가 창 크기 조정을 멈출 때까지 기다려서 리사이징 이벤트를 발생
- 키보드 입력을 중지할 때까지 ajax이벤트를 발생시키지 않는다
- 스크롤 위치를 측정하고 최대 50ms마다 응답하도록 한다(위치가 바뀔때마다 이벤트를 발생시키지 않는다)
- 앱에서 요소를 드래그할때 성능을 보강한다
  <br>

## Debounce

<br>

- 이벤트를 그룹화하여 특정 시간이 지난 후 하나의 이벤트만 발생하도록 한다. 즉, 여러번 들어 온 같은 이벤트를 한 그룹으로 묶고 그 중 제일 마지막, 또는 제일 처음 함수만 호출되도록 한다. <br>
- 요청이 들어오고 일정 시간을 기다린 후 요청을 수행한다. 일정 시간 안에 같은 요청이 추가로 들어오면 이전 요청은 취소된다. (즉, 이벤트 요청은 들어온다.)
- 기능은 지연되지만 자원이 최적화된다.
- 이벤트가 큰 간격으로 발생되면 디바운싱이 발생하지 않는다.
  <br>

## throttle

<br>

- 이벤트를 일정한 주기동안 한 번만 발생하도록 한다. (ex. 설정시간이 100ms라면 마지막 함수가 호출된 후 100ms가 지나기 전에 다시 호출되지 않는다.)
- 성능 문제 해결을 위해 많이 사용된다. (scroll 이벤트 핸들러 등)
- 무한 스크롤링 페이지는 스로틀이 적합하다. 디바운싱은 사용자가 스크롤을 멈출 때만 이벤트를 발생시키기 때문.
  <br>

## 차이점

- 디바운스는 아무리 많은 이벤트가 발생해도 모두 무시하고 특정 시간사이에 어떤 이벤트도 발생하지 않았을 때 딱 한번만 마지막 이벤트를 발생시킨다.
- 스로틀은 적어도 nms마다 정기적으로 기능 실행을 보장한다.

## 구현

<br>

## 1. throttling 스크롤 & debouncing 인풋

### **html & css**

```html
<style>
  html,
  body {
    height: 5000px;
    margin: 0;
  }
  h2 {
    position: fixed;
  }
  h2.throttle-scroll {
    top: 100px;
  }
</style>
(...)
<body>
  <h2 class="normal-scroll"></h2>
  <h2 class="throttle-scroll"></h2>
  <input type="text" class="input-text" value="" />
  <script src="./test.js"></script>
  <script></script>
</body>
```

<br>

### **throttle, debounce 함수 구현**

<br>

```javascript
const throttleAndDebounce = () => {
    let throttleCheck, debounceCheck;
    return {
        throttle(cb, ms){
            return function(){
                if(!throttleCheck){
                    therottleCheck = setTimeout(()=>{
                        cb(...arguments)
                        //arguments라고 작성해야.
                        throttleCheck = false;
                        //setTimeout으로 실행될때마다 throttleCheck = false를 해주지 않으면 실행될때마다 콜백 여러번 실행됨
                    },ms)
                }
            }
        }
        debounce(cb, ms){
            return function(){
                clearTimeout(debounceCheck);
                debounceCheck = setTimeout(()=>{
                    cb(...arguments)
                }, ms)
                //ms마다 콜백이 반복되어야 하는데 이벤트가 일어날때마다 clearTimeout됨.
                //clear -> setTimeout선언 -> 다시 이벤트가 일어나면 clear / 이벤트가 일어나지 않은 채 ms가 지나면 setTimeout실행
            }
        }
    }
}
```

### **Throttle**

```javascript
(function () {
  const _ = throttleAndDebounce(),
    normalScroll = document.querySelector(".normal-scroll"),
    throttleScroll = document.querySelector(".throttle-scrool");
  let normalCount = 0,
    throttleCount = 0;
  const normalFunc = () => {
    normalCount++;
    normalCount.innerHTML = `일반 스크롤링: ${normalCount}`;
  };
  const throttleFunc = _.throttle(() => {
    throttleCount++;
    throttleScroll.innerHTML = `스로틀링 후: ${throttleCount}`;
  }, 300);
  window.addEventListener(
    "scroll",
    () => {
      normalFunc();
      throttleFunc();
    },
    false
  );
})();
```

### **Debounce**

```javascript
(function () {
  const inputVal = document.querySelector(".input-text");
  inputVal.onKeyup = _.debounce(
    ({ target }) => getDataFromURL(target.value),
    500
  );
  //onKeyup이므로 event받음

  function getDataFromURL(input) {
    const contactURL = `http://sample.bmaster.kro.kr/contacts_long/search/${input}`;
    fetch(contactURL)
      .then((res) => {
        const { data } = res;
        console.log(data);
      })
      .catch((err) => console.log(err));
    //axios.get(contactURL)
  }
})();
```

## 2. input value 처리 방식 차이

```javascript
let debounce = null;
let throttle = null;

function keyUpfn({ target: { value } }) {
  //normal
  console.log("normal", value, new Date().getTime());

  //debounce
  clearTimeout(debounce);
  debounce = setTimeout(
    () => console.log("debounce", value, new Date().getTime()),
    500
  );

  //throttle
  if (!throttle) {
    setTimeout(() => {
      console.log("throttle", throttle, new Date().getTime());
      throttle = null;
    }, 500);
  }
  throttle = value;
}

document.getElementById("search").addEventListener("keyup", keyUpfn);
```

- input에 eventListener를 등록한다.
- keyup이벤트가 일어날때마다 keyUpfn 함수가 실행된다.
  - normal: keyup시마다 value가 즉시 출력된다.
  - throttle: keyup이 발생하면 500ms후에 해당 시점까지 발생한 keyup이벤트 중 가장 최신 이벤트의 value를 출력하고, 초기화한다. 이를 키보드 입력이 끝날 때까지 반복한다.
    - 초기화 되어야만 다시 출력되고 초기화 되기 전까지는 `throttle = value`로 throttle 값을 변화시킴으로써 초기화 전 최신 value를 출력하게 된다.
    - 1. keyup이벤트 <br> 2. => `throttle === null`이므로 `if`문 실행. `setTimeout` 예약. <br> 3. 500ms간 `throttle = value` 로 throttle값 갱신 <br> 4. 500ms 이후 `setTimeout`이 실행됨. `console.log(throttle)`, `throttle = null`. <br> 5. `if`문 밖으로 빠져나오며 다시 `throttle = value` <br> 6. keyup이벤트 다시 일어나면 다시 1.부터 반복
    - 500ms동안은 이벤트가 실현되지 않고 500ms가 되는 때 한번 실행하게 된다.
  - debounce: 입력이 발생하면 500ms동안 기다리고 값을 출력. 그 사이 키보드 입력이 발생하면 시간을 초기화하고 다시 기다린다.

## 참조

1. Kwoncheol Shin (2019). Debounce와 Throttle의 차이 from https://medium.com/@kwoncharles/debounce%EC%99%80-throttle%EC%9D%98-%EC%B0%A8%EC%9D%B4-34845fbfa1ff

2. 재희 (2018). 디바운스(Debounce)와 스로틀(throttle) 그리고 차이점 from https://webclub.tistory.com/607

3. 박성룡 (2020). Throttle와 Debounce 개념 정리하기 from https://medium.com/@pks2974/throttle-%EC%99%80-debounce-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-2335a9c426ff

4. Pewww (2018). Throttle과 Debounce의 구현 및 예제 from https://pewww.tistory.com/9

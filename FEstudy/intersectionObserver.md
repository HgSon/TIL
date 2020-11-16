# Intersection Observer API

_2020-11-16_

## 필요한 곳

- 페이지 스크롤 시 이미지를 lazy loading할때
- Infinite scrolling을 통해 스크롤할 때 새로운 콘텐츠를 불러올 때
- 광고의 수익을 계산하기 위해 광고의 가시성을 참고할 때
- 사용자가 결과를 볼 것인지에 따라 애니메이션 동작 여부를 결정할 때

## 기존 방식을 사용했을 때의 문제점

- `document.addEventListener("scroll", cb)` : 단기간에 많은 호출이 가능하고 동기적으로 실행되므로 메인 스레드<sup>[1]</sup>에 영향을 준다.
- 한 페이지에 여러 스크롤 이벤트가 등록되어 있을 경우 스크롤할 때마다 이벤트가 끊임없이 호출된다.
- `Debouncing`과 `Throttling`을 통해 문제를 개선했다.
- 특정 지점을 관찰하기 위해 `getBoundingClientRect()`함수를 사용해 `Reflow` 현상이 발생한다. <sup>[2]</sup>

### 예시

```javascript
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const addEventToEl = (elList) =>
  document.addEventListener("scroll", () => {
    elList.forEach((el) => {
      if (isElementInViewport(el)) {
        el.classList.add("tada");
      } else {
        el.classList.remove("tada");
      }
    });
  });

const boxElList = document.querySelectorAll(".box");
addEventToEl(boxElList);
```

## Intersection observer API

- 비동기적으로 실행되므로 메인 스레드에 영향을 주지 않으면서 변경 사항을 관찰할 수 있다.
- `IntersectionObserverEntry`를 활용하면 `getBoundingClientRect()`를 호출할 필요가 없어 리플로우 현상을 방지할 수 있다.
- 감시하고자 하는 요소가 다른 요소(viewport)에 들어가거나 나갈 때, 또는 요청한 부분만큼 두 요소의 교차부분이 변경될 때 마다 실행될 콜백 함수를 등록할 수 있다.

### 컨셉과 사용

```javascript
const options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: '0px',
    threshold: 1.0 // 대상 요소가 root에 지정된 요소 내에서 100% 보여질 때 콜벡이 호출된다.
}
const io = new IntersectionObserver(callback[, options])
```

### parameters

**`callback`** <br>

```javascript
const callback = (entries, observer) => {
  entries.forEach((entry) => {});
};
```

- `entries` : IntersectionObserverEntry 객체의 리스트. 배열 형식으로 반환된다.
- `observer` : 콜백함수가 호출되는 IntersectionObserver

**`options`**<br>
observer 콜백이 호출되는 상황을 조작한다.

- `root` : default: 브라우저 viewport. (null 또는 지정되지 않을 때) <br>
  대상 객체의 가시성을 확인할 때 사용된다. <br>
  (콜백이 호출되는 조건 예시: 대상이 root와 n% 겹칠 경우)<br>
  대상의 조상 요소여야 한다.
- `rootMargin` : default: 0 <br>root가 가진 여백. css margin과 동일한 방식으로 조정가능하다. 각 측면의 bounding box를 조정한다. 교차 영역을 확장시키거나 축소시킬 수 있다.
- `threshold` : default : 0 <br>
  콜백을 실현시키는 대상의 가시성 역치. (0~1)<br>
  0 : 요소가 전혀 겹치지 않는 상태. 1픽셀이라도 겹치는 순간부터 콜백이 실행된다. <br>
  1 : 대상 요소가 root에 전부 포함된 상태 <br>
  _ex. [0, 0.5, 1] : 대상이 root와 교차되기 시작한 순간, 50% 교차된 순간, 완전히 교차된 순간 콜백이 호출된다._

### methods

- IntersectionObserver.observe(targetElement) : 타겟 엘리먼트에 대한 intersection observer를 등록할 때 사용한다.
- IntersectionObserver.unobserve(targetElement) : 관찰을 멈출 때 사용한다.
- IntersectionObserver.disconnect() : 다수를 관찰하고 있을 때 관찰을 모두 멈춘다.
- IntersectionObserver.takerecords(): IntersectionobserverEntry 객체의 배열을 리턴한다.

### IntersectionObserverEntry 객체

- 동작을 등록할 때 사용할 수 있다.

_properties_

1. 사각형의 크기를 반환

- IntersectionObserverEntry.boundingClientRect : 타겟 엘리먼트의 정보를 반환한다.
- IntersectionObserverEntry.rootBounds : root 엘리먼트의 정보를 반환한다. root를 선언하지 않았을 경우 null을 반환한다.
- IntersectionObserverEntry.intersectionRect: 교차된 영역의 정보를 반환한다.

2. 유용한 정보를 반환

- IntersectionObserverEntry.intersectionRatio: 교차 영역에 타겟 엘리먼트가 얼마나 교차되어 있는지에 대한 정보를 반환한다.
- IntersectionObserverEntry.isIntersecting: 타겟 엘리먼트가 교차 영역에 있는 동안 true를 반환한다.
- IntersectionObserverEntry.target: 타겟을 반환한다.
- IntersectionObserverEntry.time: 교차가 기록된 시간을 파악한다.

### 예시

기존 방식을 수정

```javascript
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    //관찰 대상이 viewport 안에 들어온 경우
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add("tada");
    } else {
      entry.target.classList.remove("tada");
    }
  });

  const boxElList = document.querySelectorAll(".box");
  boxElList.forEach((el) => io.observe(el));
});
```

**Lazy loading**

```html
<div class="example">
  <img
    src="https://picsum.photos/600/400/?random?0"
    alt="random image"
    class="image-default"
  />
  <img
    data-src="https://picsum.photos/600/400/?random?1"
    alt="random image"
    class="image"
  />
  <img
    data-src="https://picsum.photos/600/400/?random?2"
    alt="random image"
    class="image"
  />
  <img
    data-src="https://picsum.photos/600/400/?random?3"
    alt="random image"
    class="image"
  />
  <img
    data-src="https://picsum.photos/600/400/?random?4"
    alt="random image"
    class="image"
  />
  <img
    data-src="https://picsum.photos/600/400/?random?5"
    alt="random image"
    class="image"
  />
  <img
    data-src="https://picsum.photos/600/400/?random?6"
    alt="random image"
    class="image"
  />
  <img
    data-src="https://picsum.photos/600/400/?random?7"
    alt="random image"
    class="image"
  />
</div>
```

```javascript
const options = {
  root: null,
  rootMargin: "0px 0px 30px 0px",
  threshold: 0,
};
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
}, options);
const images = document.querySelectorAll(".image");
images.forEach((el) => io.observe(el));
```

<br><br>

_**[1] Main thread** <br> 운영체제로부터 할당받은 자원을 이용하는 실행의 단위를 스레드라 한다. 반면 자원을 할당받는 작업의 단위는 프로세스라 한다. 프로세스는 실행될 때 운영체제로부터 프로세서, 필요한 주소 공간, 메모리 등의 자원을 할당받는다. 스레드는 한 프로세스 내에서 동작되는 여러 실행의 흐름으로 프로세스 내 자원들을 프로세스 내 스레드끼리 공유한다._ <br>
_**[2] Reflow**<br> 문서 내 요소의 위치와 도형을 다시 계산하기 위한 웹브라우저 프로세스로 고비용을 발생시킨다. 브라우저가 웹 페이지의 일부 또는 전체를 다시 그려야 하는 경우 발생한다. 단일 요소를 리플로우할 경우 상위 요소 및 연관된 모든 요소가 리플로우되기도 한다. 브라우저창의 크기 변경, 계산된 스타일(ex. 2em, auto, 100%)이 수반되는 메소드, DOM에서 요소 추가 또는 삭제, 요소 클래스 변경 등에서 리플로우가 발생된다._<br>

## 참조

1. Yoon's devlog (2019). Intersection Observer API의 사용법과 활용방법 from http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/

////2. 박성룡 (2020). Intersection Observer 간단 정리하기 from https://medium.com/@pks2974/intersection-observer-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-fc24789799a3

3. MDN web docs (2020). Intersection Observer API from https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API

4. 강관우 (2016). 프로세스와 스레드의 차이 from https://brunch.co.kr/@kd4/3

5. Lindsey Simon (2018). 브라우저 리플로우 최소화 from https://developers.google.com/speed/docs/insights/browser-reflow?hl=ko

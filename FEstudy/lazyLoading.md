# Lazy Loading 
_2020-11-15_

페이지에 액세스할 때 모든 콘텐츠를 대량으로 로드하는 대신 필요한 페이지의 일부에 접근할 때 마다 콘텐츠를 로드하는 기법. <br>
페이지가 Placeholder 콘텐츠로 작성되게 된다. 사용자가 필요할 때만 실제 콘텐츠로 대체된다. <br>
사용자가 웹페이지를 검색할 때 실제 리소스는 브라우저에 의해 캐시되고 리소스가 사용자 화면에 표시될 때 placeholder를 대체한다. <br>
이를 통해 낭비되는 자원을 줄인다. <br>
검색 엔진 순위에 영향을 미친다. 검색 엔진이 리소스의 내용을 잘못 해석하거나 무시할 수 있다. 전체 구성 요소를 lazy loading하면 검색 엔진이 해당 구성 요소를 우회할 수 있다. <br>
lazy load하는 콘텐츠에 대한 링크를 제공하면 검색 엔진 크롤러가 액세스 할 수 있는 콘텐츠에서 웹페이지를 만들게 된다. 검색 엔진이 웹사이트를 인덱스하면 링크를 따라가며 검색한 내용을 색인화한다. 이 방법을 통해 사용자가 콘텐츠를 동적으로 로드하게 만드는 동시에 전통적인 웹사이트같은 구성을 할 수 있다.<br>
<br>
### 장점
<br>
콘텐츠 전달 최적화와 사용자 경험 간소화 간의 균형을 맞춘다<br>
사용자에게 콘텐츠를 더 빨리 제공한다<br>
콘텐츠가 지속적으로 사용자에게 공급되므로 웹사이트를 이탈할 확률을 낮출 수 있다<br>
리소스 비용이 낮아진다.

## Placeholder

## Intersection Observer API

필요한 곳
- 페이지 스크롤 시 이미지를 lazy loading할때
- Infinite scrolling을 통해 스크롤할 때 새로운 콘텐츠를 불러올 때
- 광고의 수익을 계산하기 위해 광고의 가시성을 참고할 때
- 사용자가 결과를 볼 것인지에 따라 애니메이션 동작 여부를 결정할 때

기존 방식
- `document.addEventListener("scroll", cb)` : 단기간에 많은 호출이 가능하고 동기적으로 실행되므로 메인 스레드<sup>[1]</sup>에 영향을 준다.
- 한 페이지에 여러 스크롤 이벤트가 등록되어 있을 경우 스크롤할 때마다 이벤트가 끊임없이 호출된다. 
- `Debouncing`과 `Throttling`을 통해 문제를 개선했다. 
- 특정 지점을 관찰하기 위해 `getBoundingClientRect()`함수를 사용해 `Reflow` 현상이 발생한다. <sup>[2]</sup> 

<br><br>
## Debounce 와 Throttling 

요청이나 처리의 빈도를 제한하거나 지연시킬 때 자주 사용된다. 
<br>

### Debounce
<br>
요청이 들어오고 일정 시간을 기다린 후 요청을 수행한다. 일정 시간 안에 같은 요청이 추가로 들어오면 이전 요청은 취소된다. 
<br>

### throttle
<br>
일정 시간 동안 요청이 한 번만 수행되도록 한다.
<br>



_**[1] Main thread** <br> 운영체제로부터 할당받은 자원을 이용하는 실행의 단위를 스레드라 한다. 반면 자원을 할당받는 작업의 단위는 프로세스라 한다. 프로세스는 실행될 때 운영체제로부터 프로세서, 필요한 주소 공간, 메모리 등의 자원을 할당받는다. 스레드는 한 프로세스 내에서 동작되는 여러 실행의 흐름으로 프로세스 내 자원들을 프로세스 내 스레드끼리 공유한다._ <br>
_**[2] Reflow**<br> 문서 내 요소의 위치와 도형을 다시 계산하기 위한 웹브라우저 프로세스로 고비용을 발생시킨다. 브라우저가 웹 페이지의 일부 또는 전체를 다시 그려야 하는 경우 발생한다. 단일 요소를 리플로우할 경우 상위 요소 및 연관된 모든 요소가 리플로우되기도 한다. 브라우저창의 크기 변경, 계산된 스타일(ex. 2em, auto, 100%)이 수반되는 메소드, DOM에서 요소 추가 또는 삭제, 요소 클래스 변경 등에서 리플로우가 발생된다._<br>

#### 참조

1. hello, scarlett! enjoy your life (2018). Lazy loading이란? from https://scarlett-dev.gitbook.io/all/it/lazy-loading#LazyLoading-LazyLoading

2. Yoon's devlog (2019). Intersection Observer API의 사용법과 활용방법 from http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/

3. 박성룡 (2020). Intersection Observer 간단 정리하기 from https://medium.com/@pks2974/intersection-observer-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-fc24789799a3

4. MDN web docs (2020). Intersection Observer API from https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API

5. 강관우 (2016). 프로세스와 스레드의 차이 from https://brunch.co.kr/@kd4/3

6. Lindsey Simon (2018). 브라우저 리플로우 최소화 from https://developers.google.com/speed/docs/insights/browser-reflow?hl=ko
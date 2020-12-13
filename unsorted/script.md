# Script element

## 언어

<br>
스크립트 언어는 자바스크립트로 간정된다.

<br><br>

## 컨텐츠

<br>
유니코드 문자를 모두 사용할 수 있지만, 주석과 여는 스크립트 태그는 사용할 수 없다.

<br><br>

## src 속성

<br>
스크립트 파일을 외부에서 불러올 때 사용한다. URL을 값으로 입력해야 한다. <br>
src 속성이 설정되어 있을 때 script 엘리먼트 안에 쓰이는 텍스트 컨텐츠는 src가 가리키는 스크립트에 관한 설명만 추가할 수 있다. 입력 가능한 데이터는 공백, 주석 뿐이다. 이외에는 실행되지 않고 무시된다.

```javascript
<script src="example.js">
  /* 새로운 인스턴스 생성; var e = new Effect(); .play를 사용해서 효과를
  시작하고, .stop을 사용해서 중단한다. e.play(); e.stop(); */
</script>
```

<br>

## type 속성

<br>

스크립트의 종류를 설정할 수 있다. 기본값은 `text/javascript`이다. <br>
그 외 `application/javascript`, `application/ecmascript` 등은 브라우저에 따라 지원하지 않는 경우도 있다. <br>
서버에서 자바스크립트 리소스를 전송할 때는 반드시 `text/javascript`를 쓴다.

## nomodule 속성

<br>

`type="module"`을 지원하지 않는 브라우저에서 사용할 스크립트 파일을 설정하는 불리언 속성이다 (`default false`)

<br>

## async / defer 속성

<br>

스크립트를 비동기로 읽어들이고 싶을 때 사용한다. <br>
기본적으로 스크립트가 다운로드되는 동안 파싱이 중단되는 반면, `async`와 `defer` 속성을 사용하면 다운로드는 백그라운드에서 진행되고 스크립트를 실행하는 동안만 파싱이 중단된다. <br>
`defer`는 파싱이 완료된 이후 스크립트를 실행한다. <br>
`async`는 다운로드가 끝나면 바로 스크립트를 실행한다. 실행 순서가 스크립트 엘리먼트의 출현 순서와 다를 수 있다. <br>
`type = "module"`일 경우 `async`만 지원되며, 설정되어 있지 않으면 `defer`와 같은 방식으로 실행된다.

<br>

## crossorigin 속성

<br>

현재 문서와 다른 호스트에서 스크립트를 불러올 때 해당 스크립트를 어떻게 다룰 것인지 설정한다.

## 출처

1. 코드쓰는사람 (2018). [HTML5]꼼꼼히 살펴보는 SCRIPT 엘리먼트 from https://taegon.kim/archives/6804

# Lazy Loading

_2020-11-15_

페이지에 액세스할 때 모든 콘텐츠를 대량으로 로드하는 대신 필요한 페이지의 일부에 접근할 때 마다 콘텐츠를 로드하는 기법. <br>
페이지가 Placeholder 콘텐츠로 작성되게 된다. 사용자가 필요할 때만 실제 콘텐츠로 대체된다. <br>
사용자가 웹페이지를 검색할 때 실제 리소스는 브라우저에 의해 캐시되고 리소스가 사용자 화면에 표시될 때 placeholder를 대체한다. <br>
이를 통해 낭비되는 자원을 줄인다. <br>
검색 엔진 순위에 영향을 미친다. 검색 엔진이 리소스의 내용을 잘못 해석하거나 무시할 수 있다. 전체 구성 요소를 lazy loading하면 검색 엔진이 해당 구성 요소를 우회할 수 있다. <br>
lazy load하는 콘텐츠에 대한 링크를 제공하면 검색 엔진 크롤러가 액세스 할 수 있는 콘텐츠에서 웹페이지를 만들게 된다. 검색 엔진이 웹사이트를 인덱스하면 링크를 따라가며 검색한 내용을 색인화한다. 이 방법을 통해 사용자가 콘텐츠를 동적으로 로드하게 만드는 동시에 전통적인 웹사이트같은 구성을 할 수 있다.<br>
<br>

## 장점

<br>
콘텐츠 전달 최적화와 사용자 경험 간소화 간의 균형을 맞춘다<br>
사용자에게 콘텐츠를 더 빨리 제공한다<br>
콘텐츠가 지속적으로 사용자에게 공급되므로 웹사이트를 이탈할 확률을 낮출 수 있다<br>
리소스 비용이 낮아진다.<br>

<br>

## 적용방법

<br>

### 이미지

하단에 배체된 이미지가 로드되지 않도록. 스크롤을 내리면 placeholder image들이 실제 이미지들을 채워나가게 된다.

1. `<image src>` 대신 `data-src`와 같은 data attribute를 사용하고 해당 attribute에 이미지 주소를 기입한다.
2. 이미지들이 객체에 담긴다.
3. 각 이미지가 로드될 경우 (onload) `data-src`에 있는 주소값이 `src`에 세팅된다. `data-src` attribute는 삭제된다.

### **Simple image lazy load and fade**

- 마크업에서 `src`를 `data-src`로 변경한다.
- 레이지 로딩이 되는 순간 스타일을 주고 싶다면: `img{opacity: 1; transition: opacity 0.3s;} img[data-src]{opacity: 0}`
- js 코드를 작성한다.

```javascript
imgArray.forEach.call(document.querySelectorAll("img[data-src]"), function (
  img
) {
  img.setAttribute("src", img.getAttribute("data-src"));
  img.onload = function () {
    img.removeAttribute("data-src");
  };
});
```

- 스크롤 여부와 관계없이 모든 이미지가 브라우저에 의해 로드된다.
- 이미자가 HTML컨텐츠 이후에 로드되므로 페이지 로드가 빠르다.

### **Progressively Enhanced Lazy Loading**

-

- blazy (http://dinbror.dk/blazy/) (2018)

```javascript
<img
  src="placeholder-image.jpg"
  data-src="image.jpg"
  data-src-small="small-image.jpg"
  alt="Image"
/>;

var bLazy = new Blazy({
  breakpoints: [
    {
      width: 420,
      src: `data-src-small`,
    },
  ],
  success: function (el) {
    setTimeout(() => {
      var parent = el.parentNode;
      parent.className = parent.className.replace(/\bloading\b/, "");
    }, 200);
  },
});
```

- lazyload(https://github.com/verlok/lazyload) (2018)

```javascript
<img alt="img" data-src="../img/image.jpg">

var myLazyLoad = new LazyLoad()
```

### 참조

1. hello, scarlett! enjoy your life (2018). Lazy loading이란?. https://scarlett-dev.gitbook.io/all/it/lazy-loading#LazyLoading-LazyLoading

2. 인호의 IT 잡동사니 (2018). image lazy loading. https://helloino.tistory.com/31

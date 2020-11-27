# 무한 슬라이드 구현

## 구현목적

<br>

- n장의 이미지를 볼 수 있는 이미지 슬라이드 배너를 구현
- 좌우 슬라이드 버튼을 누르면 애니메이션 효과와 함께 다른 이미지가 나타나도록 함
- 마지막/처음 이미지에서 슬라이드 버튼을 누르면 처음/마지막 이미지가 나타나며 다시 이미지 배열이 반복되도록 구현 <br>

<br>

## 발견된 문제

- 첫 이미지 배열을 벗어나는 경우 애니메이션 효과가 적용되지 않음
- DOM의 이미지 배열을 바꾼 후 현재 인덱스에 따라 이미지가 나타나도록 구현했기 때문

<br>

## 구현한 코드

```javascript
    //FEstudy. randomBanner.js

    this.viewPoint = 0;
    $leftSlide.addEventListener("click", this.slide);
    $rightSlide.addEventListener("click", this.slide);

    slide(e) {
    const { value } = e.target.attributes.slideSide;
    const $images = this.$imageWapper;
    if (value === "left") {
      if (this.viewPoint !== 0) {
        this.viewPoint--;
      } else {
        setChildren().slideBackward($images);
      }
    } else {
      if (this.viewPoint !== this.data.length - 1) {
        this.viewPoint++;
      } else {
        setChildren().slideForward($images);
      }
      this.$imageWapper.style.left = `-${this.width * this.viewPoint}px`;
      // viewPoint가 0이거나 length-1일때는 viewPoint가 변하지 않는다.
      // 따라서 $imageWapper의 style.position도 변하지 않는다.
      // 애니메이션은 position이 바뀔 때 transition으로 일어난다.
    }

    this.$imageWapper.innerHTML = this.data
      .map(
        (cat) =>
          `<img width=${this.width} src="http://via.placeholder.com/${this.width}x300" data-src=${cat.url}>`
      )
      .join("");


    // util/setChildren.js

    function setChildren() {
        return {
            slideForward: (target) => {
            const nextData = target.children[0];
            target.removeChild(nextData);
            target.append(nextData);
            return target;
            },
            slideBackward: (target) => {
            const nextData = target.children[target.children.length - 1];
            target.removeChild(nextData);
            target.prepend(nextData);
            return target;
            },
         };
    }
```

## 해결

## 다른 해결 방법

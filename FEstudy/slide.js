const debounce = (callback, time) => {
  let debounceCheck;
  return function () {
    clearTimeout(debounceCheck);
    debounceCheck = setTimeout(() => {
      callback(...arguments);
    }, time);
  };
};

class RandomBanner {
  constructor($target) {
    this.data = [];
    this.viewPoint = 0;
    const $banner = document.createElement("aside");
    const $imageWapper = document.createElement("div");
    const $leftSlide = document.createElement("button");
    const $rightSlide = document.createElement("button");

    $leftSlide.innerHTML = "<";
    $rightSlide.innerHTML = ">";
    $leftSlide.style.left = "10px";
    $rightSlide.style.right = "10px";
    $banner.classList.add("banner");
    $imageWapper.classList.add("imageWapper");
    $banner.append($leftSlide, $rightSlide, $imageWapper);

    $target.append($banner);
    this.$banner = $banner;
    this.$imageWapper = $imageWapper;
    this.width = $target.offsetWidth;
    this.slide = this.slide.bind(this);
    this.onResize = this.onResize.bind(this);
    $leftSlide.addEventListener("click", this.slide);
    $rightSlide.addEventListener("click", this.slide);
    $leftSlide.setAttribute("slideSide", "left");
    $rightSlide.setAttribute("slideSide", "right");
    // this.widthObserver.observe($target);

    this.$target = $target;
    window.addEventListener("resize", debounce(this.onResize, 500));
    this.setData();
  }
  onResize(e) {
    this.width = this.$target.offsetWidth;
    this.render();
  }

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
    }
    this.$imageWapper.style.left = `-${this.width * this.viewPoint}px`;
    this.render();
  }

  slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const {
          target,
          target: {
            dataset: { src },
          },
        } = entry;
        if (entry.isIntersecting) {
          target.src = src;
        }
      });
    },
    { root: this.$banner, rootMargin: "0px 10px" }
  );
  async setData() {
    this.data = [1, 2, 3, 4, 5];
    this.render();
  }

  render() {
    this.$imageWapper.innerHTML = this.data
      .map((v) => `<div>${v}</div>`)
      .join("");

    // this.$imageWapper.innerHTML = this.data
    //   .map(
    //     (cat) =>
    //       `<img width=${this.width} src="http://via.placeholder.com/${this.width}x300" data-src=${cat.url}>`
    //   )
    //   .join("");
    // this.$imageWapper.querySelectorAll("img").forEach(($image) => {
    //   this.slideObserver.observe($image);
    // });
  }
}

new RandomBanner(document.querySelector("#app"));

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

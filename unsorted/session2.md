class DarkModeToggle {
    //Btn 으로 한정지을 필요는 없다.
    // 만약에 다른걸로 바꾸거나 하면 헷갈림. 의미가 한정됨.
    //Button.js와 DarkModeToggleBtn은 컨벤션이 다른 느낌
    // 역할에 맞춘 네이밍을 하는게 좋음
    $darkModeToggle = null;
    isDarkMode = 
  
    constructor({ $target, data }) {
    
      const $darkModeToggle = document.createElement("input");
      $darkModeToggle.setAttribute("type", "checkbox");
      $darkModeToggle.addEventListener("change", e => this.setState(e.target.checked) )
      //클릭이 안되는 상황도 있음. css로 스타일링했을때 안먹을 수도 있다. 
      //키보드 조작에서 안먹힐수도?
      this.$darkModeToggle = $darkModeToggle;
      $target.appendChild($darkModeToggle)

      const $darkModeLabel = document.createElement("label")
      $darkModeLabel.innerText = "Dark"
      $darkModeLabel.appendChild($darkModeLabel)
    
      this.$darkModeLabel = $darkModeLabel
      this.data = data;
  
      this.render();
    }
  
    setState(nextMode) {
      this.isDarkMode = nextMode;
      this.$darkModeLabel.innerText = this.isDarkMode?"Dark" :"Light"
    }
  
    render() {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.image;
  
        this.$imageInfo.innerHTML = `
          <article class="content-wrapper">
            <div class="title">
              <h1>${name}</h1>
              <button class="close">x</button>
            </div>
            <img src="${url}" alt="${name}"/>        
            <p class="description">
              <span>성격: ${temperament}</span>
              <span>태생: ${origin}</span>
            </p>
          </article>`;
        this.$imageInfo.style.display = "block";
      } else {
        this.$imageInfo.style.display = "none";
      }
    }
  }
  //spread형식으로 받고 다른 인자 받는 등 확장성을 위해서는 props 객체형태로 받는게 좋음
  
  //로딩컴포넌트 : 로딩중이다 / 아니다.
  // : 범용적으로 쓸 수 있음 . 기본적으로 키워드 검색에. (다른데에도)
  //empty는 search result의 하위
  //랜덤 고양이 버튼 호출
  //모달 제어 이벤트 제어 부분 신경
  //스크롤이 화면의 마지막 부분 가면 다음 페이지
  //무한 스크롤을 구현 하는 방식에 여러가지가 있는 것 같은데 가장 좋은 방식이 무엇인지 궁금하여 질문드립니다.

//1. innerHeight, scrollY, offsetTop 을 이용한 debounce or throttle을 사용한 방식
//2. Intersection observer api 를 이용한 방식

 //그리고 한가지 더 물어볼게 있습니다! 스크롤 & 다음 페이지 로딩을 구현 하는 경우에 페이스북 같은 경우에는 자식으로 계속 태그를 생성해서 붙여 나가는 반면, 인스타나 트위터는 여러개의 태그를 선언해놓은 다음 해당 스크롤에 따라 미리 선언해 놓은 태그의 내용만 바꿔주는 방식을 사용하고 있는걸로 알고 있는데
//1.은 오버플로우 일어나서 디바운스 쓰는것 -> 2. //둘 비교해보기
//lazy 로딩

//document의 browser api 공부하기 window객체, document 객체.

  
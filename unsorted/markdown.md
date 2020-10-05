# Markdown 기초

<br>

_2020-10-06 작성_

<br>

## Markdown이란?

<br>

- 마크다운은 웹상에서 텍스트 양식을 작성하고 편집하는 방법이다.
- README.md 파일, 온라인 문서 작성 등에 대표적으로 사용된다.
- 대부분의 경우 #와 \*과 같은 특수문자들로 텍스트를 감싸 양식을 편집한다.

<br>

### Markdown의 장점

- HTML등 다른 문서형태로 쉽게 변환 가능하다.
- 쉽고 빠르게 문서를 정리할 수 있다.
- 지원 가능한 플랫폼과 프로그램이 다양하다.

<br>

### Markdown의 단점

- 표준 문법이 없다.
- 모든 HTML 마크업을 대신하지 못한다.

  <br><br><br>

## 기본 문법 정리

<br>

### 1. 제목

<br>

- h1에서 h6까지 `#` 개수를 증가시켜 표현한다.

  # <h1> 제목

  ## <h2> 제목

  ### <h3> 제목

  #### <h4> 제목

  ##### <h5> 제목

  ###### <h6> 제목

<br>

# <h1> 제목

## <h2> 제목

### <h3> 제목

#### <h4> 제목

##### <h5> 제목

###### <h6> 제목

<br><br>

- h1, h2는 `=`, `-`를 두 개 이상 사용해 표현가능하다.

```
h1 제목
==
h2 제목
--
```

# h1 제목

## h2 제목

<br><br>

### 2. 인용

- 인용구 앞에 `>` 를 추가한다

```
  > Coffee. The finest organic suspension ever devised... I beat the Borg with it.
  >
  > - Captain Janeway
```

> Coffee. The finest organic suspension ever devised... I beat the Borg with it.
>
> - Captain Janeway

- `>`를 여러 개 사용해 중첩된 인용문을 만든다

```
> github guides
>> Coffee. The finest organic suspension ever devised... I beat the Borg with it.
>>> - Captain Janeway
```

> github guides
>
> > Coffee. The finest organic suspension ever devised... I beat the Borg with it.
> >
> > > - Captain Janeway

### 3. 강조

    _이탤릭체_ 또는 *이탤릭체*
    __볼드체__ 또는 **볼드체**
    ~~취소선~~ 또는 <strike>strike</strike> 또는 <s>s</s> 또는 <del>del</del>
    <u>밑줄</u>

_이탤릭체_ 또는 _이탤릭체_

**볼드체** 또는 **볼드체**

~~취소선~~ 또는 <strike>strike</strike> 또는 <s>s</s> 또는 <del>del</del>

<u>밑줄</u>

<br>

- **_이탤릭체와 볼드체_**,
  _이탤릭체와 ~~취소선~~_,
  **볼드체와 <u>밑줄</u>** 등 함께 사용 가능하다.

<br>

### 4. 리스트

<br>

1. 순서가 필요한 목록 앞에 `숫자.`을 붙인다.
1. `1.`만 반복 사용 가능하다.

- 순서가 필요 없는 목록 앞에 `-`, `*`, `+`중 하나를 붙인다.

```
1. 순서가 필요한 목록 1
2. 순서가 필요한 목록 2
   1. 순서가 필요한 목록 3.1
   1. 순서가 필요한 목록 3.2
      1. 순서가 필요한 목록 3.2.1
3. 순서가 필요한 목록 3
- 순서가 필요 없는 목록
   - 사용 가능한 기호
    - " - "
    - " * "
    - " + "
```

1. 순서가 필요한 목록 1
2. 순서가 필요한 목록 2
   1. 순서가 필요한 목록 3.1
   1. 순서가 필요한 목록 3.2
      1. 순서가 필요한 목록 3.2.1
3. 순서가 필요한 목록 3

- 순서가 필요 없는 목록
  - 사용 가능한 기호
  - " - "
  - " \* "
  - " + "

### 5. 링크

- 문서 내 url 또는 `<>`안 url은 자동으로 `<a>`로 변환된다.

```
 https://github.com
  <https://github.com>
```

https://github.com

<https://github.com>

<br>

- `[]`와 `()`를 사용한다.

```
[GitHub](https://github.com "링크 설명")
```

[GitHub](https://github.com "링크 설명")

<br>

- `[]`로 참조 링크를 사용한다.

```
[GitHub][github link]
문서 안에서 [참조 링크]를 사용할 수 있다.

[github link]: https://github.com
[참조 링크]: https://github.com "git hub"
```

[GitHub][github link]
문서 안에서 [참조 링크]를 사용할 수 있다.

[github link]: https://github.com
[참조 링크]: https://github.com "git hub"

<br><br>

### 6. 이미지

<br>

이미지 코드

```
![대체 텍스트](이미지 url "설명")
```

![img 1](../assets/img1.jpg "예시 이미지")

이미지에 링크할 경우 링크코드`[]`로 이미지 코드를 감싼 후 링크 주소를 덧붙인다.

```
[![대체 텍스트](이미지 url)](링크)
```

[![img 2](../assets/img2.jpg)](https://unsplash.com/@justinlim?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

### 7. 코드

- **`(backtick)** 으로 감싼다.

```
`const code = true`
```

`const code = true`

<br>

- 스페이스 4번 또는 탭 1번으로 들여쓰기한다.

```
일반적인 문장

    if(longCode){
        a code block
    }

다음 문장
**한줄 띄어쓰기로 코드 앞뒤 문단을 구분해야 한다**
```

<br>

일반적인 문장

    if(longCode){
        a code block
    }

다음 문장

**한줄 띄어쓰기로 코드 앞뒤 문단을 구분해야 한다**

<br>

- 코드블럭코드 ` (```) ` 를 이용한다.

````
    ```
    if(longCode){
        a code block
    }
    ```
````

사용예

```
if(long code){
    a code block
}
```

사용언어를 표시할 수 있다

````
    ```javascript
        if(longCode){
            a code block
        }
    ```
````

```javascript
    if(longCode){
        a code block
    }
```

<br>

### 8. 표

<br>

- `|`으로 열을 구분한다.
  - 가장 좌측과 가장 우측 `|` 기호는 생략 가능하다.
- 3개 이상의 `-`로 헤더 셀을 구분한다.
- 헤더 셀을 구분할 때 `:`으로 셀 안 내용을 정렬한다.(좌, 우, 가운데)

```
값 | 의미 | 기본값
---|---|---
`static`| 유형(기준) 없음 / 배치 불가능 | `static`

값 | 의미 | 기본값
---|:---:|---:
`static`| 유형(기준) 없음 / 배치 불가능 | `static`
```

| 값       | 의미                          | 기본값   |
| -------- | ----------------------------- | -------- |
| `static` | 유형(기준) 없음 / 배치 불가능 | `static` |

| 값       |             의미              |   기본값 |
| -------- | :---------------------------: | -------: |
| `static` | 유형(기준) 없음 / 배치 불가능 | `static` |

<br><br>

### 9. 수평선

<br>

`-`, `*`, `_` 중 하나를 3개 이상 입력한다.

```
---
***
___
```

---

---

---

<br><br>

### 10. 줄바꿈

<br>

줄바꿈이 동작하지 않는 경우 띄어쓰기 2번 또는 `<br>`을 사용한다.

<br><br>

### 11. 체크박스

<br>

`-`, `*`, `+`와 `[]`를 사용한다.
`[]`안에 공백은 빈 체크박스, `x`는 체크된 체크박스를 만든다

```
- [x] 마크다운 공부하기
* [x] 미리보기
+ [ ] 수정
```

- [x] 마크다운 공부하기

* [x] 미리보기

- [ ] 수정

<br><br>

### 12. Raw HTML

<br>

HTML 문법을 사용할 수 있다.

<br><br><br>

#### 참조

1. GitHub Guides.(2014). Mastering Markdown. Retrieved from https://guides.github.com/features/mastering-markdown/
2. HEROPY. (2017). MarkDown 사용법 총정리. Retrieved from https://heropy.blog/2017/09/30/markdown/
3. yuuuye. (2019). velog 마크다운(markdown) 작성법. Retrieved from https://velog.io/@yuuuye/velog-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4MarkDown-%EC%9E%91%EC%84%B1%EB%B2%95

#### 이미지 출처

img1 <span>Photo by <a href="https://unsplash.com/@dougmaloney?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Doug Maloney</a> on <a href="https://unsplash.com/s/photos/cartoons?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

img2 <span>Photo by <a href="https://unsplash.com/@justinlim?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Justin Lim</a> on <a href="https://unsplash.com/s/photos/cartoons?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

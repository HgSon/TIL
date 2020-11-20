# Call()

- binding 개념을 이해한다.
- call, apply, bind의 차이를 안다.

## call()

`func.call(thisArg[, arg1[, arg2, [, ...]]])`

<br>

thisArg: 호출에 제공되는 this의 값.
<br>
arg1, ar2: 객체를 위한 인수
<br>
이미 할당되어 있는 다른 객체의 함수/메소드를 호출하는 해당 객체에 재할당할 때 사용한다. `this`는 현재 객체를 참조한다. `call()`을 이용해 다른 객체에 상속할 수 있다.

### 사용

1. 객체의 생성자 binding에 사용

```javascript
function Product(name, price){
    this.name = name;
    this.price = price;
}

function Food(name, price){
    Product.call(this,name,price);
    this.category = "food";
}

Product는 name, price를 초기화하고 Food는 category를 정의한다.
```

2. 익명 함수 호출에 사용

```javascript
var animals = [
  { species: "lion", name: "king" },
  { species: "whale", name: "fail" },
];

for (var i = 0; i < animals.length; i++) {
  (function (i) {
    this.print = () => console.log(`${i} ${this.species}: ${this.name}`);
    this.print();
  }).call(animals[i], i);
}

//this = animals[i]. i 값 사용.
배열 내 객체의 정확한 인덱스를 출력할 수 있는 모든 객체에 print함수를 추가한다.
```

3. 함수 호출 및 'this'를 위한 문맥 지정에 사용

```javascript
function greet() {
  var reply = [this.animal, "typically sleep between", this.sleepDuration].join(
    " "
  );
  console.log(reply);
}

var obj = {
  animal: "cats",
  sleepDuration: "12 and 16 hours",
};

greet.call(obj);
```

4. 첫번째 인수 지정 없이 함수 호출에 사용

```javascript
var sData = "Wisen";
function display(){
  console.log(`sData value is %s ${this.sData}`)
}
display.call()

this의 값이 전역 객체에 바인딩되었다.

strict mode에서 this는 undefined값을 가진다.
```

## apply와의 차이

apply는 인수로 단일 배열을 받는다. call은 배열 없이 파라미터를 입력한다.

```javascript
call(obj, 1, 2, 3, 4, 5);

apply(obj, [1, 2, 3, 4, 5]);
```

## bind와의 차이

bind는 함수를 실행하지 않고 bound함수를 리턴한다.

```javascript
const obj = {name: 'Tom'};
const say = function(city){console.log(`Hello, my name is ${this.name}, I live in ${city}`}

// 화살표 함수로 쓰면 안됨

//not bind
say("seoul");

//call
say.call(obj, "seoul");

//apply
say.apply(obj, ["seoul"]);

//bind
const boundSay = say.bind(obj);
boundSay("seoul");

boundSay의 this는 obj가 된다.
```

## 참조

1. 쾌락코딩 (2018). binding의 개념과 call, apply, bind의 차이점. https://wooooooak.github.io/javascript/2018/12/08/call,apply,bind/

2. MDN web docs (2020). Function.prototype.call(). https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call

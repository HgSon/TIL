# 이진 검색 (Binary Search)

_2020-10-09 작성_

## 이진 검색이란

- 정렬된 리스트에서 원하는 항목을 찾을 때 효과적인 알고리즘
- 후보 범위가 한 항목으로 좁아질 때까지 리스트를 반으로 나눈다.

## 이진 검색 구현

0. 길이가 `n`인 정렬된 배열 `array`에서 구하고자 하는 값 `target`의 위치를 구하는 경우(단, 배열에 중복된 값은 존재하지 않는다):
   - 이진 탐색은 항목을 반씩 나누면서 진행한다.
     - 인덱스를 사용해 항목을 반씩 나눈다.
     - 찾고자 하는 항목의 인덱스를 구한다.
1. 리스트에 남기는 최소 인덱스를 `min`, 최대 인덱스를 `max`로 둔다.
2. `min = 0, max= n-1` 로 설정한다.
3. `min`과 `max`의 평균을 초과하지 않는 정수 중 최대의 정수를 구해 `guess` 값으로 설정한다.
4. `array[guess]`와 `target`이 일치하면 검색을 종료한다.
5. `array[guess]`가 `target`보다 작다면 `target`은 `guess`보다 뒷쪽에 위치하므로 `min = guess+1`로 바꾼다.
6. `array[guess]`가 `target`보다 크다면 `target`은 `guess`보다 앞쪽에 위치하므로 `max = guess-1`로 바꾼다.
7. `3.`으로 되돌아간다.
   - `target`은 `array[min]`보다 작은 수와 `array[max]`보다 큰 값에는 없다(이미 제외되었다). 따라서 `min > max`일 경우 배열에 `target`이 존재하지 않는 것으로 보고 탐색을 종료한다.

### 자바스크립트 코드를 사용한 구현

```javascript
function(array, target){
    let min = 0;
    let max = array.length-1;
    while(min <= max){
        const guess = Math.floor((min+max)/2);
        if(array[guess] === target){
            return guess
        }else if(array[guess] < target){
            min = guess + 1
        }else{
            max = guess - 1
        }
    }
    return -1
}
```

#### 참조

1. Thomas H. Cormen., Devin Balkcom., & Khan Academy Computing Curriculum Team. (2020). Computer science unit: Algorithms. Retrieved from https://www.khanacademy.org/computing/computer-science/algorithms

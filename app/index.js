/* =====================================================
   1. DOM 참조
   ===================================================== */
// 카드들이 생성되어 들어갈 메인 영역
const main = document.querySelector("main");


/* =====================================================
   2. 카드 생성 함수
   ===================================================== */
/*
  - 사용자가 입력한 카드 개수를 기준으로
  - 카드 내용을 만들고
  - 셔플한 뒤
  - 화면에 카드들을 생성한다
*/
function generateCardList() {
    const cardCnt = Number(document.querySelector("#cardCnt").value);

    /* -----------------------------
       입력값 검증
       ----------------------------- */
    if (Number.isNaN(cardCnt) || cardCnt <= 0) {
        alert("[ERROR!] 1 이상의 숫자를 입력해라!!!!!");
        return;
    }

    if (cardCnt > 50) {
        alert("[ERROR!] 100 이상은 아니돼!!!!!");
        return;
    }

    // 기존 카드 초기화
    main.innerHTML = "";

    /* -----------------------------
       카드 내용 배열 생성
       ----------------------------- */
    /*
      예) cardCnt = 3 이라면
      cardContentArr = [1, 2, 3]
    */
    const cardContentArr = [];
    for (let i = 1; i <= cardCnt; i++) {
        cardContentArr.push(i);
    }

    /*
      짝 맞추기용 배열 생성
      예) [1,2,3] → [1,2,3,1,2,3]
    */
    const pairArr = cardContentArr.concat(cardContentArr);

    /* -----------------------------
       카드 섞기 (셔플)
       ----------------------------- */
    const shuffledArr = shuffleArr(pairArr);

    /* -----------------------------
       카드 DOM 생성
       ----------------------------- */
    /*
      셔플된 배열을 기반으로
      카드 하나씩 화면에 추가
    */
    for (const value of shuffledArr) {
        main.innerHTML += `
      <div class="card-area">
        <div class="card">
          <div class="card-back">${value}</div>
          <div class="card-front">★</div>
        </div>
      </div>
    `;
    }
}


/* =====================================================
   3. 카드 클릭 이벤트 연결 함수
   ===================================================== */
/*
  - 생성된 모든 카드(card-area)에
  - 클릭 이벤트를 연결한다
  - 카드 안의 어떤 요소를 눌러도
    card-area 기준으로 flip 클래스를 토글한다
*/
function setListenerToCard() {
    const cardAreaArr = document.querySelectorAll(".card-area");

    for (const cardArea of cardAreaArr) {
        cardArea.addEventListener("click", function (evt) {
            const temp = evt.currentTarget;
            temp.classList.toggle("flip");

            setTimeout(() => {
                temp.classList.toggle("flip");
            }, 3000);
        });
    }
}


/* =====================================================
   4. 배열 셔플 함수 (Fisher-Yates 알고리즘)
   ===================================================== */
/*
  전달받은 배열을 무작위로 섞어서 반환한다.
  카드 위치를 랜덤하게 배치하기 위해 사용한다.
*/
function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


/* =====================================================
   5. 엔트리 함수 (버튼 클릭 시 실행)
   ===================================================== */
/*
  버튼을 클릭했을 때 실행되는 함수.
  1) 카드를 생성하고
  2) 생성된 카드들에 이벤트를 연결한다

  ※ 이 순서가 중요한 이유:
     카드 생성 전에 이벤트를 달면
     새로 생성된 카드에는 이벤트가 적용되지 않기 때문
*/
function handleClick() {
    generateCardList();
    setListenerToCard();
}
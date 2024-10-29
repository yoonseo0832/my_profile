/////////////////////////////////////////////////////////
// //: 일반 주석                                        //
// ///: jQuery로 변경전 코드                            //
// ///-: <script src="js/jquery.animateNumber.min.js"> //
/////////////////////////////////////////////////////////

// 컴퓨터 오브젝트
var computer = {
  score: 0,
  percent2: 0.5,
  percent3: 0.33
};
// 사용자 오브젝트
var user = {
  score: 0,
  percent2: 0.5,
  percent3: 0.33
};
// 게임 오브젝트
var game = {
  isComputerTurn: true,
  // shotsLeft: 15
  shotsLeft: 15
};
// '슛하기' 버튼 클릭 핸들러
function onComputerShoot() {
  // 게임오버 상태라면 리턴
  if (game.shotsLeft === 0)
    return;
  // 컴퓨터 턴이 아니라면 리턴
  if (!game.isComputerTurn)
    return;

  updateAI();

  // 1/2 확률로 2점슛, 3점슛 선택
  var shootType = Math.random() < 0.5 ? 2 : 3;

  if (Math.random() < computer['percent' + shootType]) {
    showText('컴퓨터가 ' + shootType + '점슛을 성공시켰습니다!');
    updateComputerScore(shootType);
  } else {
    showText('컴퓨터가 ' + shootType + '점슛을 실패했습니다.');
  }
  // 컴퓨터 턴 종료
  game.isComputerTurn = false;
  // 컴퓨터 버튼 비활성화 및 유저 버튼 활성화
  disableComputerButtons(true);
  disableUserButtons(false);
}

// '2점슛', '3점슛' 버튼 클릭 핸들러
function onUserShoot(shootType) {
  // 게임오버 상태라면 리턴
  if (game.shotsLeft === 0)
    return;
  // 컴퓨터 턴이라면 리턴
  if (game.isComputerTurn)
    return;

  if (Math.random() < user['percent' + shootType]) {
    showText(shootType + '점슛이 성공했습니다!');
    updateUserScore(shootType);
  } else {
    showText(shootType + '점슛이 실패했습니다.');
  }

  // 유저 턴 종료
  game.isComputerTurn = true;
  disableComputerButtons(false);
  disableUserButtons(true);
  // 남은 슛 횟수 감소
  game.shotsLeft--;
  // 남은 슛 횟수 UI 업데이트 ///////
  var $shotsLeftElem = $('#shots-left'); ///document.getElementById('shots-left')
  $shotsLeftElem.html(game.shotsLeft);   ///shotsLeftElem.innerHTML = shotsLeft;

  // 만약 남은 슛 횟수가 0이라면, 즉 게임 종료라면
  if (game.shotsLeft === 0) {
    // 승리 조건 비교
    if (user.score > computer.score)
      showText('승리했습니다!');
    else if (user.score < computer.score)
      showText('아쉽게도 졌습니다...');
    else
      showText('비겼습니다.');

    // 모든 버튼 비활성화
    disableComputerButtons(true);
    disableUserButtons(true);
  }
}

function showText(s) {        ///- 시작부분 개선,<script src="js/jquery.animateNumber.min.js">
  var $textElem = $('#text'); ///document.getElementById('text')

    $textElem.fadeOut(300, function() {       // 300ms
    $textElem.html(s);     ///textElem.innerHTML = s;
    $textElem.fadeIn(100);
  });
}

/*
///- $(function() {}) 적용전 코드
function showText(s) {
  var $textElem = $('#text'); ///document.getElementById('text')

    $textElem.fadeOut()
    $textElem.html(s);     ///textElem.innerHTML = s;
    $textElem.fadeIn();
}
*/

function updateComputerScore(score) {
  computer.score += score;

  var $comScoreElem = $('#computer-score'); ///document.getElementById('computer-score')
  
  /// comScoreElem.html(computer.score);
  $comScoreElem.animateNumber({        //-<script src="js/jquery.animateNumber.min.js">
    number: computer.score             // computer 점수판 개선
  });
}

function updateUserScore(score) {
  user.score += score;

  var $userScoreElem = $('#user-score'); ///document.getElementById('user-score')
  /// userScoreElem.html(user.score);
  $userScoreElem.animateNumber({    //-<script src="js/jquery.animateNumber.min.js">
    number: user.score              // user 점수판 개선
  });
}

function disableComputerButtons(flag) {
  $('.btn-computer').prop('disabled', flag); ///document.getElementsByClassName('btn-computer')
}                                            ///for(var i = 0; i < computerButtons.length; i++) {
                                             ///   computerButtons[i].disabled = flag; 
                                             ///{  

function disableUserButtons(flag) {
  $('.btn-user').prop('disabled', flag); ///document.getElementsByClassName('btn-user')
}

function updateAI() {
  var diff = user.score - computer.score;

  if (diff > 10) {
    computer.percent2 = 0.7;
    computer.percent3 = 0.43;
  } else if (diff > 6) {
    computer.percent2 = 0.6;
    computer.percent3 = 0.38;
  } else if (diff < -10) {
    computer.percent2 = 0.3;
    computer.percent3 = 0.23;
  } else if (diff < -6) {
    computer.percent2 = 0.4;
    computer.percent3 = 0.28;
  }
}

// setTimeout: 첫 번째 인자-callback function, 두 번째 인자-얼마후 실행할 지를 ms로 나타냄
// 이러한 callback function 사용은 가독성이 나쁘고 유지보수에도 안좋으므로 기피해야함-callback hell이로도 불림
// 해결을 위해 Promise등의 개념 도입 
$(function() {      ///- 시작부분 개선을 위한 함수, <script src="js/jquery.animateNumber.min.js">
  showText(3);

  setTimeout(function() {
    showText(2);

    setTimeout(function() {
      showText(1);

      setTimeout(function() {
        showText('컴퓨터부터 시작합니다!');
        disableComputerButtons(false);
      }, 1000); //1000ms
    }, 1000);
  }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {

  const userId = document.getElementById('user_id');
  const userPw1 = document.getElementById('user_pw');
  const userPw2 = document.getElementById('check_pw')
  const postCode = document.querySelector('.postcode');
  const rowAddr = document.getElementById('row_address');
  const detailAddr = document.querySelector('.detail_address');
  const choose=document.querySelector('.choose input');
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup_text');


  const btnId = document.querySelector('.id_btn');
  const btnPw = document.querySelector('.pw_check_btn');
  const addressBtn = document.querySelector('.address_btn');
  const chooseBtn = document.querySelector('.choose_btn');
  const joinBtn = document.querySelector('.join_btn'); 



  userId.addEventListener('input', () => {
    userId.value = userId.value.toUpperCase();
  }); //아이디 대문자 변경

  btnId.addEventListener('click', () => {
    if (checkId()) {
      compareId();
    }
  });

  function checkId() {
    const value = userId.value.trim();

    if (value.length < 4 || value.length > 16) {
      alert('사용할 수 없는 아이디 입니다.\n(영문 대문자/숫자 4-16자)');
      userId.value = '';
      userId.focus();
      return false;
    } //id길이 확인

  const hasEng = /[A-Z]/.test(value);
  const hasNum = /[0-9]/.test(value);

  if (!(hasEng && hasNum)) {
    alert('아이디는 반드시 영문(대문자)와 숫자를 혼용해야 합니다.');
    userId.value = '';
    userId.focus();
    return false;
  } //아이디 조건 확인
  return true;
}

  function compareId() {
    const inputId = userId.value.trim();
    if (!inputId) {
      alert('아이디를 먼저 입력해주세요.');
      userId.focus();
      return;
    } //공백

    fetch('../data.json')
      .then(res => res.json())
      .then(users => {
        const user = users.find(u => u.id === inputId);
        if (user) {
          alert('이미 존재하는 아이디입니다.');
          userId.value = '';
          userId.focus();
        } else {
          alert('사용 가능한 아이디입니다.');
          userPw1.focus();
        }
      }); //json_data비교
  } // id 중복확인
  
  /*****/
  chooseBtn.addEventListener('click', ()=>{
    const chooseId = choose.value.trim();
    if (!chooseId) {
      alert('아이디를 먼저 입력해주세요.');
      userId.focus();
      return;
    } //공백

    fetch('../data.json')
      .then(res => res.json())
      .then(users => {
        const user = users.find(u => u.id === chooseId);
        if (user) {
          alert ('확인되었습니다.');
        } else {
          alert('존재하지 않는 아이디 입니다.');
          choose.value='';
          chooseId.focus();
        }
      });
  }); //추천인 아이디


  /*****/

  btnPw.addEventListener('click', () => {
    if (checkPw()) {
      comparePw();
    }
  });

  function checkPw() {

    const value = userPw1.value.trim();

    if (value.length < 8 || value.length > 16) {
      alert('비밀번호는 8~16자로 입력해주세요.');
      userPw1.value = '';
      userPw2.value = '';
      userPw1.focus();
      return false;
    } //비밀번호 길이체크

    const hasUp = /[A-Z]/.test(value);
    const hasLow = /[a-z]/.test(value);
    const hasNum = /[0-9]/.test(value);
    const hasSpe = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const count = [hasUp || hasLow, hasNum, hasSpe].filter(Boolean).length;
    if (count < 2) {
        alert('비밀번호는 영문(대소문자), 숫자, 특수문자 중 2가지 이상 조합해야 합니다.');
        userPw1.value = '';
        userPw2.value = '';
        userPw1.focus();
        return false;
      } //비밀번호 조건확인
      userPw2.focus();
      return true;
  } 

    function comparePw() {
    if (userPw1.value.trim() !== userPw2.value.trim()) {
      alert('암호가 일치하지 않습니다.')
      userPw2.value='';
    } else {
      alert('확인되었습니다.');
      postCode.focus();
    }
  } //userPw1 , userPw2 확인


  /*****/

  addressBtn.addEventListener('click', () => {
    new daum.Postcode({
      oncomplete: function(data) {
        postCode.value = data.zonecode; // 우편번호
        rowAddr.value = data.address;   // 기본 주소
        document.querySelector('.detail_address').focus();
      }
    }).open();
  }); //주소등록


  const totalAgree = document.getElementById('total_agree');
  const agrees= document.querySelectorAll('.agree');
  const agree01 = document.getElementById('agree01');
  const agree02 = document.getElementById('agree02');
  const agree03 = document.getElementById('agree03');
  const agree04 = document.getElementById('agree04');
  const agree05 = document.getElementById('agree05');

  totalAgree.addEventListener('click',allCheck);
  agree01.addEventListener('click',agreeCheck);
  agree02.addEventListener('click',agreeCheck);
  agree03.addEventListener('click',agreeCheck);
  agree04.addEventListener('click',agreeCheck);
  agree05.addEventListener('click',agreeCheck);

  function allCheck(){
    if(totalAgree.checked === true) {
      agrees.forEach((agree)=> {
        agree.checked=true;
      });
    } else {
      agrees.forEach((agree)=>{
        agree.checked=false;
      });
    }    
  } //전체동의 

  function agreeCheck() {
    if(agree01.checked && agree02.checked && agree03.checked && agree04.checked && agree05.checked) {
       totalAgree.checked=true;
     } else {
         totalAgree.checked=false;
      } 
    } //개별동의 시 전체체크or해제


  document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const idValue = userId.value.trim();

      popupText.innerHTML = `<strong>${idValue}</strong>님,<br>회원가입이 완료되었습니다!`;
    popup.style.display = 'flex';
  }); //회원가입완료

  

}); //js



$(document).ready(function(){
  let timer;
  let attempt = 0;
  const authCode='123456'

  function startTimer(duration) {
      let timeLeft = duration;

      timer = setInterval(function(){
        let minutes = parseInt(timeLeft / 60, 10);
        let seconds = parseInt(timeLeft % 60, 10);

        minutes=minutes<10 ? '0' + minutes : minutes;
        seconds=seconds<10 ? '0' + seconds : seconds;

        $('.atm_count').text(minutes + ':' + seconds)

        if (--timeLeft < 0) {
          clearInterval(timer);
          $('.atm_count').text('시간초과');
          alert('인증 시간이 만료되었습니다. 다시 시도해주세요.')
        }
      }, 1000);
    
    } //타이머 함수

  $('.email_btn').on('click', function(){
    const emailInput = $('.email_select').val().trim(); // 이메일 input
    if(emailInput === '') {
        alert('도메인을 선택해 주세요.');
        return;
    }

    $('.atm').css('display', 'flex');
    clearInterval(timer);
    startTimer(180);
    alert('인증번호가 발송되었습니다.\n(테스트 중: 123456)')
  }); //인증번호 발송

  $('.e_atm_btn').on('click', function(){
    const inputCode = $('.atm_txt').val().trim();

    if (inputCode === '') {
      alert('인증번호 6자리를 입력해주세요.');
      return;
    } //공백입력시

    attempt++
    
    if(inputCode !== authCode) {
      alert('인증번호가 올바르지 않습니다.');
      return;
    }

    clearInterval(timer);
    $('.atm_count').text(''); //카운트 숨김
    $(this).text('인증완료'); //버튼 글자 변경
    $(this).prop('disabled', true); //버튼 비활성화(false=활성화)
    $('.atm_txt').prop('readonly', true); //입력창 수정 불가

    alert('이메일 인증이 완료되었습니다.')
    
    $('.birth select:nth-child(1)').focus();
  }); 


}); //jQuery



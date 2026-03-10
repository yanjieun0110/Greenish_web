document.addEventListener('DOMContentLoaded', function(){

  const idTab = document.getElementById('find_id');
  const pwTab = document.getElementById('find_pw');
  const idInput = document.querySelector('.find_id input[name="username"]');
  const pwInput = document.querySelector('.find_pw input[name="user_id"]');
  
  idTab.addEventListener('change', function() {
      if (this.checked) {
          idInput.focus();
      }
  }); // id탭 선택 자동포커스

  pwTab.addEventListener('change', function() {
      if (this.checked) {
          pwInput.focus();
      }
  }); // pw탭 선택 자동포커스

  const idBtn=document.querySelector('.id_btn');

  idBtn.addEventListener('click',function(e){
    e.preventDefault();
    if (!$('.t_atm_btn').prop('disabled')) {
      alert('휴대폰 인증을 먼저 완료해주세요.');
      return;
    }

    const inputName = $('input[name="username"]').val().trim();
    const inputPhone = $('input[name="phone"]').val().trim();

    $.getJSON('../data.json', function(data) {
      const foundUser = data.find(user => user.name === inputName && user.phone === inputPhone);

      if (foundUser) {
        $('#popup_text').html(`회원님의 아이디는<br><strong>${foundUser.id}</strong> 입니다.`);
        $('#popup').fadeIn(200).css('display', 'flex');
      } else {
        alert('입력하신 정보와 일치하는 회원이 없습니다.');
      }
    }).fail(function() {
        alert('데이터를 로드하는 중 오류가 발생했습니다.');
    });

  }); //가입된 회원 정보 비교

  $('#to_find_pw').on('click', function(e) {
    e.preventDefault();
    $('#popup').fadeOut(200);
    $('#find_pw').prop('checked', true).trigger('change');
    $('input[name="user_id"]').focus();
}); //비밀번호 찾기 페이지 이동



  






}); //js





$(document).ready(function() {
    let timer;
    const authCode = '123456';

    function startTimer(duration, display) {
        let timeLeft = duration;
        clearInterval(timer); 

        timer = setInterval(function() {
            let minutes = parseInt(timeLeft / 60, 10);
            let seconds = parseInt(timeLeft % 60, 10);

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            display.text(minutes + ':' + seconds);

            if (--timeLeft < 0) {
                clearInterval(timer);
                display.text('시간초과');
                alert('인증 시간이 만료되었습니다. 다시 시도해주세요.');
            }
        }, 1000);
    } // 타이머 함수


    $('.find_id input[name="phone"]').on('input', function() {
        $(this).val($(this).val().replace(/[^0-9]/g, ""));
    }); //숫자 외 문자 제거


    $('.find_id .tel_btn').on('click', function() {
        const phoneVal = $('.find_id input[name="phone"]').val().trim();
        const phoneReg = /^\d{10,11}$/;

        if (!phoneReg.test(phoneVal)) {
            alert("전화번호는 '-' 없이 숫자만 10~11자리로 입력해주세요.");
            $('.find_id input[name="phone"]').focus();
            return; 
        }

        $('.find_id .tell').css('margin-bottom', '0');
        $('.find_id .atm').css('display', 'flex');
        startTimer(180, $('.find_id .atm_count')); 
        alert('인증번호가 발송되었습니다.\n(테스트 중: 123456)');
    });

    $('.find_id .atm_btn').on('click', function() {
        const $parent = $(this).closest('.find_id');
        const inputCode = $parent.find('.atm_txt').val().trim();

        if (inputCode === '') {
            alert('인증번호 6자리를 입력해주세요.');
            return;
        }

        if (inputCode !== authCode) {
            alert('인증번호가 올바르지 않습니다.');
            return;
        }

        clearInterval(timer);
        $parent.find('.atm_count').text(''); 
        $(this).text('인증완료').prop('disabled', true); 
        $parent.find('.atm_txt').prop('readonly', true); 

        alert('전화번호 인증이 완료되었습니다.');
    }); 
}); //jQuery_아이디 찾기(전화번호)




$(document).ready(function() {
    let timer;
    const authCode = '123456';

    function startTimer(duration, display) {
        let timeLeft = duration;
        clearInterval(timer);
        timer = setInterval(function() {
            let min = parseInt(timeLeft / 60, 10);
            let sec = parseInt(timeLeft % 60, 10);
            display.text((min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
            if (--timeLeft < 0) {
                clearInterval(timer);
                display.text("시간초과");
            }
        }, 1000);
    } // 타이머 함수

    $('.find_pw .email_btn').on('click', function() {
        const idVal = $('.find_pw input[name="user_id"]').val().trim();
        const emailVal = $('.find_pw input[name="email"]').val().trim();
        const domainVal = $('.find_pw .email_select').val();

        if (idVal === "" || emailVal === "" || domainVal === "email") {
            alert("아이디와 이메일 정보를 모두 입력해주세요.");
            return;
        }

        $('.find_pw .email').css('margin-bottom', '0');
        $('.find_pw .atm').css('display', 'flex'); 
        startTimer(180, $('.find_pw .atm_count'));
        alert('인증번호가 발송되었습니다. (테스트: 123456)');
    });

    $('.find_pw .atm_btn').on('click', function() {
        const inputCode = $('.find_pw .atm_txt').val().trim();
        
        if (inputCode === authCode) {
            clearInterval(timer);
            $('.find_pw .atm_count').text('');
            $(this).text('인증완료').prop('disabled', true);
            $('.find_pw .atm_txt').prop('readonly', true);
            alert('이메일 인증이 완료되었습니다.');
        } else {
            alert('인증번호가 올바르지 않습니다.');
        }
    });

    $('.pw_btn').on('click', function(e) {
        e.preventDefault();

        if (!$('.find_pw .atm_btn').prop('disabled')) {
            alert('먼저 이메일 인증을 완료해주세요.');
            return;
        } // 인증 완료 여부 체크

        const inputId = $('.find_pw input[name="user_id"]').val().trim();
        const emailUser = $('.find_pw input[name="email"]').val().trim();
        const emailDomain = $('.find_pw .email_select option:selected').text().trim();
        const fullEmail = emailUser + "@" + emailDomain;

        $.getJSON('../data.json', function(data) {
            const user = data.find(u => u.id === inputId && u.email === fullEmail);

            if (user) {
                $('.find_pw #popup_text').html(`${user.name}님의 비밀번호는<br><strong>${user.pw}</strong> 입니다.`);
                $('.find_pw #to_find_pw').hide(); // 
                $('.find_pw #popup').fadeIn(200).css('display', 'flex');
            } else {
                alert('입력하신 정보와 일치하는 회원이 없습니다.');
            }
        }).fail(function() {
            alert('데이터를 불러오는데 실패했습니다. 경로를 확인하세요.');
        });
    }); //아이디 + 이메일 비교
});  //jQuery_비밀번호찾기(이메일)

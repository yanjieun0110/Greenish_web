document.addEventListener('DOMContentLoaded', () => {

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";

    setTimeout(function () {
      toast.className = toast.className.replace("show", "");
    }, 2000);
  }


  document.querySelector("form").addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('username').value.trim();
    const pw = document.getElementById('password').value.trim();

    if (!id || !pw) {
      return;
    }

    fetch('../data.json')
      .then(function (res) { return res.json(); })
      .then(function (users) {
        const user = users.find(function (u) {
          return u.id === id;
        });

        if (!user) {
          showToast('존재하지 않는 아이디입니다.');
          return;
        }

        if (user.pw !== pw) {
          showToast('비밀번호가 틀렸습니다.');
          return;
        }
        showToast('로그인 되었습니다');
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 1000);
      });

  }); //로그인

  const kakaoBtn = document.querySelector('.sns .kakao');
  if (kakaoBtn) {
    kakaoBtn.addEventListener('click', function (e) {
      e.preventDefault();
      Kakao.Auth.login({
        throughTalk: false,
        success: function (authObj) {
          console.log('로그인 성공:', authObj);
          // 로그인 성공 후 사용자 정보(닉네임 등) 가져오기
          Kakao.API.request({
            url: '/v2/user/me',
            success: function (res) {
              console.log('사용자 정보:', res);
              const nickname = res.kakao_account.profile.nickname;
              alert(nickname + '님 환영합니다!');
              location.href = '../index.html'; // 메인으로 이동
            },
            fail: function (error) {
              console.log('정보 요청 실패', error);
            }
          });
        },
        fail: function (err) {
          console.error('로그인 실패', err);
          alert('카카오 로그인에 실패했습니다.');
        }
      });
    });
  } //카카오 간편로그인

  
  const naverLogin = new naver.LoginWithNaverId({
    clientId: "Bcx3Ka7UmB7Lfg6koWhH",
    callbackUrl: "http://127.0.0.1:5500/html/login.html",
    isPopup: true,
    callbackHandle: true
  });
  naverLogin.init();

  const naverBtn = document.querySelector('.sns .naver');
  if (naverBtn) {
    naverBtn.addEventListener('click', e => {
      e.preventDefault();
      naverLogin.authorize();
    });
  }

  window.addEventListener('load', function () {
    naverLogin.getLoginStatus(function (status) {
      if (status) {
        const nickName = naverLogin.user.getNickname(); 
        if(nickName) {
            alert(nickName + '님 환영합니다!');
            location.replace('../index.html');
        }
      } 
    });
  }); //네이버 간편로그인 (팝업은 구현 실패. 페이지이동으로 만듬)




});


## 📌 Project Overview
웹 개발 학습 초기에 제작한 적응형 쇼핑몰 프로젝트로, 브랜드 기획과 콘셉트 설정부터 디자인 및 퍼블리싱까지 전 과정을 단독으로 진행했습니다. JavaScript 없이 CSS만으로 구현한 웹사이트입니다.

## ⏱️ Development Period
코딩기간 : 2025.10.24 ~ 25/11/14(22일)

## 🛠️ Tech Stack
1. HTML3
2. CSS

****************************************************

/* 서브베너 캐러셀 html */
```html
<div class="banner_zone">
    <div class="visual_main">
      <img src="./img/visual_main.png" alt="비주얼메인">
    </div> <!--visual_main-->

    <div class="sub_banner">
      <input type="radio" name="s_banner" id="s_banner01" checked>
      <input type="radio" name="s_banner" id="s_banner02">
      <input type="radio" name="s_banner" id="s_banner03">

      <div class="sheet">
        <div class="bn_sheet01">
          <a href="./detail/detail.html" class="sh01_img">
            <img src="./img/sub_banner01.png" alt="서브1">
          </a>

          <label for="s_banner03" class="sh01_left"></label>
          <label for="s_banner02" class="sh01_right"></label>
        </div> <!--bn_sheet01-->

        <div class="bn_sheet02">

          <a href="./detail/detail.html" class="sh02_img">
            <img src="./img/sub_banner02.png" alt="서브2">
          </a>


          <label for="s_banner01" class="sh02_left"></label>
          <label for="s_banner03" class="sh02_right"></label>
        </div> <!--bn_sheet02-->

        <div class="bn_sheet03">

          <a href="./detail/detail.html" class="sh03_img">
            <img src="./img/sub_banner03.png" alt="서브3">
          </a>


          <label for="s_banner02" class="sh03_left"></label>
          <label for="s_banner01" class="sh03_right"></label>
        </div> <!--bn_sheet03-->

      </div><!--sheet-->


      <div class="indi">
        <label for="s_banner01"></label>
        <label for="s_banner02"></label>
        <label for="s_banner03"></label>
      </div>
    </div> <!--sub_banner-->
  </div> <!--banner_zone-->
```
/* 서브베너 캐러셀 css */
```css
/*****************   banner_zone    *****************/
.banner_zone {
  width: 1077px; height: 477px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
}

.banner_zone .visual_main {
  width: 713px;
}
.banner_zone .visual_main img{
  width: 100%; 
}

.banner_zone .sub_banner {
  width: 349px;
  position: relative;
}
#s_banner01, #s_banner02, #s_banner03 {
  display: none;
}

.sheet>div {display: none;}

#s_banner01:checked ~ .sheet .bn_sheet01 {display: block;}
#s_banner02:checked ~ .sheet .bn_sheet02 {display: block;}
#s_banner03:checked ~ .sheet .bn_sheet03 {display: block;}

#s_banner01:checked ~ .indi label:nth-child(1),
#s_banner02:checked ~ .indi label:nth-child(2),
#s_banner03:checked ~ .indi label:nth-child(3) {
  background-color: #00980A;
}

.banner_zone .sub_banner .indi{
  display: flex;
  position: absolute;
  bottom: 10px;
  left: calc(50% - 30px);
}
.banner_zone .sub_banner .indi label {
    display: inline-block;
    width: 15px; 
    height: 15px;
    border-radius: 50%; 
    background-color: #ccc;
    cursor: pointer;
    margin-right: 5px;
  }


/*************  bn_sheet01  ***********/
.banner_zone .sub_banner .bn_sheet01 {
  position: relative;
}
.sub_banner .bn_sheet01 .sh01_img {
  display: block;
  width: 349px;
  overflow: hidden;
}
.sh01_img img {
  width: 100%;
}

.banner_zone .sub_banner .bn_sheet01 .sh01_left {
  width: 48px; height: 48px;
  position: absolute;
  top: calc(50% - 48px); left: -15px;
  cursor: pointer;
  background-image: url('./img/arrow_left_icon.png');
  background-size: cover;
}
.banner_zone .sub_banner .bn_sheet01 .sh01_left:hover {
  background-image: url('./img/arrow_left_icon_hover.png');
  background-size: cover;
}
.banner_zone .sub_banner .bn_sheet01 .sh01_right {
  width: 48px; height: 48px;
  position: absolute;
  top: calc(50% - 48px); right: -15px;
  cursor: pointer;
  background-image: url('./img/arrow_right_icon.png');
  background-size: cover;
}
.banner_zone .sub_banner .bn_sheet01 .sh01_right:hover {
  background-image: url('./img/arrow_right_icon_hover.png');
  background-size: cover;
}
…
```

/* Tab Menu css */
```css
#tab_btn01:checked~ .sub_tab .label_box label:nth-child(1), 
#tab_btn02:checked~ .sub_tab .label_box label:nth-child(2), 
#tab_btn03:checked~ .sub_tab .label_box label:nth-child(3), 
#tab_btn04:checked~ .sub_tab .label_box label:nth-child(4) {
  border-bottom: 1px solid #00980A;
}
#tab_btn01, #tab_btn02, #tab_btn03, #tab_btn04 {
  display: none;
}

.tab_sh .sh {display: none;}
#tab_btn01:checked ~ .sub_tab .tab_sh .tab_sh01,
#tab_btn02:checked ~ .sub_tab .tab_sh .tab_sh02,
#tab_btn03:checked ~ .sub_tab .tab_sh .tab_sh03,
#tab_btn04:checked ~ .sub_tab .tab_sh .tab_sh04 {display: block;}
```

/* hover 마이크로 애미매이션 css */
```css
.detail_outer .detail .detail_left .pd_small_img li:hover img {
  transform: scale(1.1);
}
```

/* move bar html */
```html
<nav class="move_bar01 move_bar" id="data">
    <ul>
        <li><a href="#data">상품정보</a></li>
        <li><a href="#review">리뷰</a></li>
        <li><a href="#delivery">배송/환불</a></li>
        <li><a href="#recommend">추천</a></li>
   </ul>
</nav>
```

/* move bar css */
```css
.move_bar {
  width: 804px; height: 50px;
  margin: 0 auto;
  background-color: #eee;
  margin-bottom: 5px;
}
.move_bar ul {
  width: 804px;
  display: flex;
  justify-content: space-evenly;
}
.move_bar ul li {
  width: 200px;  
  text-align: center;
  line-height: 48px;
  cursor: pointer;
}
.move_bar01 ul li:nth-child(1) {
  border-bottom: 1px solid #00980A;
}
.move_bar02 ul li:nth-child(2) {
  border-bottom: 1px solid #00980A;
}
.move_bar03 ul li:nth-child(3) {
  border-bottom: 1px solid #00980A;
}
.move_bar04 ul li:nth-child(4) {
  border-bottom: 1px solid #00980A;
}

.move_bar ul li a {
  font-size: 20px;
}
.move_bar ul li:hover a {
  color: #17451F;
}
```

/* 상세페이지 토글 html */
```html
<input type="checkbox" id="data_btn">
<div class="detail_data">
    <img src="./img/detail_page01.png" alt="상품설명01">
    <img src="./img/detail_page02.png" alt="상품설명02">

    <label for="data_btn" class="open">상세정보 펼쳐보기 <i class="fa-solid fa-angle-down"></i></label>
    <label for="data_btn" class="close">상세정보 닫기 <i class="fa-solid fa-chevron-up"></i></label>
</div>
```

/* 상세페이지 토글 css */
```css
#data_btn {display: none;}
#data_btn:checked ~ .detail_data img:nth-child(2) {display: block;}
#data_btn ~ .detail_data img:nth-child(2) {display: none;}

#data_btn ~ .detail_data label,
#data_btn:checked ~ .detail_data label {display: none;}
#data_btn ~ .detail_data .open {display: block;}
#data_btn:checked ~ .detail_data .close {display: block;}

.detail_data label {
  width: 804px; height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  color: #666;
  border: 1px solid #666; box-sizing: border-box;
  cursor: pointer;
}
.detail_data label i {
   font-size: 24px; 
   color: #666;
}

.detail_data .open{position: relative;}
.detail_data .open::before {
  content: '';
  display: block;
  width: 957px; height: 130px;
  background: linear-gradient(transparent,white);
  position: absolute;
  top: -135px;
}
```

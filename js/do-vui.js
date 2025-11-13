

    let score = 0;
    const total = 12;
    const answers = {
    1: "B", 2: "C", 3: "A", 4: "D",
    5: "A", 6: "C", 7: "B", 8: "D",
    9: "A", 10: "C", 11: "B", 12: "D"
    };

    // ÂM THANH 
    const clickSound = document.getElementById("clickSound");

    document.addEventListener("click", (e) => {
    // Kiểm tra phần tử có thuộc tính onclick hoặc sự kiện click được gán động
    const target = e.target;

    // Nếu phần tử có onclick
    if (target.getAttribute("onclick")) {
            if (clickSound) {
                clickSound.pause();
                clickSound.currentTime = 0;
                clickSound.volume = 0.3;      
                clickSound.playbackRate = 1.3;
                clickSound.play();
            }
        }
    });


    // hiển thị câu hỏi
    function showQuestion(num) {
        document.querySelectorAll(".question").forEach(q => q.classList.remove("active"));
        document.getElementById(num).classList.add("active");

        // Xóa trạng thái nav cũ và đánh dấu câu hiện tại
        document.querySelectorAll("nav ul li").forEach(li => li.classList.remove("nav-active"));
        const currentNav = document.querySelector(`nav ul li:nth-child(${num})`);
        if (currentNav) currentNav.classList.add("nav-active");
    }

    // Nút tiếp/ lùi
    function next(current) {
        current < total ? showQuestion(current + 1) : showFinish();
    }

    function prev(current) {
        if (current > 1) showQuestion(current - 1);
    }

    // Chấm điểm + đánh dấu thanh bên
    function checkAnswer(qNum, chosen, el) {
        const correct = answers[qNum];
        const parentUL = el.parentElement;
        if (parentUL.classList.contains("answered")) return; // đã chọn rồi
        parentUL.classList.add("answered");

        const navItem = document.querySelector(`nav ul li:nth-child(${qNum})`);
        const correctSound = document.getElementById("correctSound");
        const wrongSound = document.getElementById("wrongSound");
    if (chosen === correct) {
        el.classList.add("correct");
        score++;
        correctSound.currentTime = 0; // tua về đầu (nếu phát lại liên tục)
        correctSound.play(); 
        if (navItem) {
            navItem.classList.remove("nav-wrong");
            navItem.classList.add("nav-correct");
        }
    } else {
        el.classList.add("wrong");
        wrongSound.currentTime = 0;
        wrongSound.play();
        if (navItem) {
            navItem.classList.remove("nav-correct");
            navItem.classList.add("nav-wrong");
        }
    }

    document.getElementById("score").textContent = `Điểm: ${score}`;
    }

    // ======== MÀN HÌNH KẾT THÚC ========
    function showFinish() {
        document.querySelectorAll(".question").forEach(q => q.classList.remove("active"));
        const finish = document.getElementById("finish");
        finish.classList.add("active");
        document.getElementById("final-score").textContent = `Điểm của bạn: ${score}`;

        const finishSound = document.getElementById("finishSound");
        finishSound.currentTime = 0;
        finishSound.volume = 1;
        finishSound.play();
    }

    // Chơi lại
    function restartGame() {
        // Reset điểm
        score = 0;
        document.getElementById("score").textContent = `Điểm: ${score}`;

        // Xóa tất cả các class .correct, .wrong, .nav-correct, .nav-wrong
        document.querySelectorAll(".correct, .wrong").forEach(el => {
            el.classList.remove("correct", "wrong");
        });

        document.querySelectorAll(".nav-correct, .nav-wrong").forEach(el => {
            el.classList.remove("nav-correct", "nav-wrong");
        });
        // Xóa class 'answered' để cho phép click lại
        document.querySelectorAll(".answers").forEach(ul => ul.classList.remove("answered"));
        showQuestion(1);
    }
    /*
export async function initGame(container) {
  const style = document.createElement('style');
  const res = await fetch("/css/dovui.css");
  const cssText = await res.text();
  style.textContent = cssText;
  document.body.appendChild(style);
    container.innerHTML = `
    <div class="do-vui">
            <nav>
                <h2>Danh sách câu</h2>
                <ul>
                    <li onclick="showQuestion(1)">Câu 1</li>
                    <li onclick="showQuestion(2)">Câu 2</li>
                    <li onclick="showQuestion(3)">Câu 3</li>
                    <li onclick="showQuestion(4)">Câu 4</li>
                    <li onclick="showQuestion(5)">Câu 5</li>
                    <li onclick="showQuestion(6)">Câu 6</li>
                    <li onclick="showQuestion(7)">Câu 7</li>
                    <li onclick="showQuestion(8)">Câu 8</li>
                    <li onclick="showQuestion(9)">Câu 9</li>
                    <li onclick="showQuestion(10)">Câu 10</li>
                    <li onclick="showQuestion(11)">Câu 11</li>
                    <li onclick="showQuestion(12)">Câu 12</li>
                </ul>
            </nav>

            <main>
                <header>
                    <div id="score">Điểm: 0</div>
                    <div class="content">
                        <img src="images/dovui/logo.png" alt="logo game" class="header-image">
                        <h1>Đố Vui Dân Gian</h1>
                        <img src="images/dovui/logo.png" alt="logo game" class="header-image">
                    </div>
                    <div class="endGame" onclick="showFinish()">Kết thúc</div>
                </header>

                <!-- === Các câu hỏi === -->
                <section class="question active" id="1">
                    <h2>Câu 1: Con gì đi đứng khệnh khạng, miệng kêu “cục ta cục tác”?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(1, 'A', this)"><strong>A.</strong> Con ngan</li>
                        <li onclick="checkAnswer(1, 'B', this)"><strong>B.</strong> Con gà</li>
                        <li onclick="checkAnswer(1, 'C', this)"><strong>C.</strong> Con ngan</li>
                        <li onclick="checkAnswer(1, 'D', this)"><strong>D.</strong> Con ngỗng</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(1)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(1)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="2">
                    <h2>Câu 2: Con gì áo giáp bọc thân, bò chậm lề mề, mà vẫn thắng thỏ?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(2, 'A', this)"><strong>A.</strong> Con cua</li>
                        <li onclick="checkAnswer(2, 'B', this)"><strong>B.</strong> Con cá sấu</li>
                        <li onclick="checkAnswer(2, 'C', this)"><strong>C.</strong> Con rùa</li>
                        <li onclick="checkAnswer(2, 'D', this)"><strong>D.</strong> Con ốc sên</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(2)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(2)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="3">
                    <h2>Câu 3: Da cóc mà bọc trứng gà, bổ ra thơm phức cả nhà muốn ăn?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(3, 'A', this)"><strong>A.</strong> Quả mít</li>
                        <li onclick="checkAnswer(3, 'B', this)"><strong>B.</strong> Quả sầu riêng</li>
                        <li onclick="checkAnswer(3, 'C', this)"><strong>C.</strong> quả bưởi</li>
                        <li onclick="checkAnswer(3, 'D', this)"><strong>D.</strong> quả dứa</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(3)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(3)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="4">
                    <h2>Câu 4: Một mẹ mà đẻ trăm con, con nào con nấy, mũi tròn như nhau?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(4, 'A', this)"><strong>A.</strong> Nải chuối</li>
                        <li onclick="checkAnswer(4, 'B', this)"><strong>B.</strong> trùm nho</li>
                        <li onclick="checkAnswer(4, 'C', this)"><strong>C.</strong> Bó đũa</li>
                        <li onclick="checkAnswer(4, 'D', this)"><strong>D.</strong> Hộp diêm</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(4)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(4)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="5">
                    <h2>Câu 5: Sáng thì lấp lánh, tối thì đi ngủ, ở tận trên cao, mà ai cũng thấy?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(5, 'A', this)"><strong>A.</strong> Mặt trời</li>
                        <li onclick="checkAnswer(5, 'B', this)"><strong>B.</strong> Ngôi sao</li>
                        <li onclick="checkAnswer(5, 'C', this)"><strong>C.</strong> Mặt trăng</li>
                        <li onclick="checkAnswer(5, 'D', this)"><strong>D.</strong> Đèn lồng</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(5)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(5)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="6">
                    <h2>Câu 6: Hoa gì tên của một loài chim, nở giữa mùa hè, đỏ rực sân trường?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(6, 'A', this)"><strong>A.</strong> Hoa hồng</li>
                        <li onclick="checkAnswer(6, 'B', this)"><strong>B.</strong> Hoa yến</li>
                        <li onclick="checkAnswer(6, 'C', this)"><strong>C.</strong> Hoa phượng</li>
                        <li onclick="checkAnswer(6, 'D', this)"><strong>D.</strong> Hoa cúc</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(6)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(6)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="7">
                    <h2>Câu 7: Cái gì của bạn, mà người khác dùng nhiều hơn bạn?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(7, 'A', this)"><strong>A.</strong> Cái bóng</li>
                        <li onclick="checkAnswer(7, 'B', this)"><strong>B.</strong> Cái tên</li>
                        <li onclick="checkAnswer(7, 'C', this)"><strong>C.</strong> Hơi thở</li>
                        <li onclick="checkAnswer(7, 'D', this)"><strong>D.</strong> Tiếng nói</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(7)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(7)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="8">
                    <h2>Câu 8: Cái gì khi mua thì đen, khi dùng thì đỏ, khi vứt đi thì xám?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(8, 'A', this)"><strong>A.</strong> Gỗ</li>
                        <li onclick="checkAnswer(8, 'B', this)"><strong>B.</strong> Nến</li>
                        <li onclick="checkAnswer(8, 'C', this)"><strong>C.</strong> Tờ giấy</li>
                        <li onclick="checkAnswer(8, 'D', this)"><strong>D.</strong> Cục than</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(8)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(8)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="9">
                    <h2>Câu 9: Cái gì có cổ mà không có mồm, có thân không ruột, có nắp không nhà?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(9, 'A', this)"><strong>A.</strong> Cái chai</li>
                        <li onclick="checkAnswer(9, 'B', this)"><strong>B.</strong> Cái cốc</li>
                        <li onclick="checkAnswer(9, 'C', this)"><strong>C.</strong> Cái bát</li>
                        <li onclick="checkAnswer(9, 'D', this)"><strong>D.</strong> Cái nồi</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(9)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(9)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="10">
                    <h2>Câu 10: Bay thấp thì mưa, bay cao thì nắng, bay vừa thì râm?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(10, 'A', this)"><strong>A.</strong> Con bướm</li>
                        <li onclick="checkAnswer(10, 'B', this)"><strong>B.</strong> Con chim én</li>
                        <li onclick="checkAnswer(10, 'C', this)"><strong>C.</strong> Con chuồn chuồn</li>
                        <li onclick="checkAnswer(10, 'D', this)"><strong>D.</strong> Con dơi</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(10)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(10)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="11">
                    <h2>Câu 11: Mình vàng, áo cũng vàng, bò vào đống rơm, cả làng đều biết?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(11, 'A', this)"><strong>A.</strong> Con gà</li>
                        <li onclick="checkAnswer(11, 'B', this)"><strong>B.</strong> Ngọn lửa</li>
                        <li onclick="checkAnswer(11, 'C', this)"><strong>C.</strong> Mặt trời</li>
                        <li onclick="checkAnswer(11, 'D', this)"><strong>D.</strong> Hạt thóc</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(11)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(11)">Tiếp &#10145;</button>
                    </div>
                </section>

                <section class="question" id="12">
                    <h2>Câu 12: Cái gì đập thì sống, không đập thì chết?</h2>
                    <ul class="answers">
                        <li onclick="checkAnswer(12, 'A', this)"><strong>A.</strong> Cái trống</li>
                        <li onclick="checkAnswer(12, 'B', this)"><strong>B.</strong> Cái đinh</li>
                        <li onclick="checkAnswer(12, 'C', this)"><strong>C.</strong> Quả bóng</li>
                        <li onclick="checkAnswer(12, 'D', this)"><strong>D.</strong> Trái tim</li>
                    </ul>
                    <div class="nav-buttons">
                        <button class="prev-btn" onclick="prev(12)">&#11013; Quay lại</button>
                        <button class="next-btn" onclick="next(12)">Kết thúc &#10145;</button>
                    </div>
                </section>


                <!-- Màn hình kết thúc -->
                <section class="question" id="finish">
                    <h2>🎉 Chúc mừng bạn đã hoàn thành!</h2>
                    <p id="final-score">Điểm của bạn: </p>
                    <button id="restart" onclick="restartGame()">Chơi lại</button>
                </section>

            </main>
            <audio id="clickSound" src="sound/do-vui/click.mp3" preload="auto"></audio>
            <audio id="correctSound" src="sound/do-vui/correctanswer.mp3" preload="auto"></audio>
            <audio id="wrongSound" src="sound/do-vui/wronganswer.mp3" preload="auto"></audio>
            <audio id="finishSound" src="sound/do-vui/finish.mp3"></audio>
            <script src="js/do-vui.js"></script>
        </div>`;
        loadGame();
}

*/
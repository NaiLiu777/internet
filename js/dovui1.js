// ======== CẤU HÌNH ========
let score = 0;
const total = 12;
const answers = {
  1: "B", 2: "C", 3: "A", 4: "D",
  5: "A", 6: "C", 7: "B", 8: "D",
  9: "A", 10: "C", 11: "B", 12: "D"
};

// ======== ÂM THANH ========
const clickSound = document.getElementById("clickSound");

document.addEventListener("click", (e) => {
  // Kiểm tra phần tử có thuộc tính onclick hoặc sự kiện click được gán động
  const target = e.target;

  // Nếu phần tử có onclick
  if (target.getAttribute("onclick")) {
    if (clickSound) {
      clickSound.pause();
      clickSound.currentTime = 0;
      clickSound.volume = 0.3;      // giảm âm lượng
      clickSound.playbackRate = 1.3; // tăng tốc nhẹ
      clickSound.play();
    }
  }
});




// ======== HIỂN THỊ CÂU HỎI ========
function showQuestion(num) {
  document.querySelectorAll(".question").forEach(q => q.classList.remove("active"));
  document.getElementById(num).classList.add("active");

  // Xóa trạng thái nav cũ và đánh dấu câu hiện tại
  document.querySelectorAll("nav ul li").forEach(li => li.classList.remove("nav-active"));
  const currentNav = document.querySelector(`nav ul li:nth-child(${num})`);
  if (currentNav) currentNav.classList.add("nav-active");
}

// ======== NÚT TIẾP / LÙI ========
function next(current) {
  current < total ? showQuestion(current + 1) : showFinish();
}

function prev(current) {
  if (current > 1) showQuestion(current - 1);
}

// ======== CHẤM ĐIỂM + ĐÁNH DẤU NAV ========
function checkAnswer(qNum, chosen, el) {
  const correct = answers[qNum];
  const all = el.parentElement.querySelectorAll("li");
  all.forEach(li => (li.onclick = null)); // Khóa click lại

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
}

// ======== CHƠI LẠI ========
function restartGame() {
  location.reload();
}

const emailMode = document.getElementById("emailMode");
const phoneMode = document.getElementById("phoneMode");

const emailLogin = document.getElementById("email-login");
const phoneLogin = document.getElementById("phone-login");

const loginBtn = document.getElementById("loginBtn");
const otpBtn = document.getElementById("otpBtn");
const otpStatus = document.getElementById("otpStatus");

let otpTimer;
let countdown = 30;

/* ---------- TOGGLE LOGIN MODE ---------- */

emailMode.addEventListener("click", () => {
  emailMode.classList.add("active");
  phoneMode.classList.remove("active");

  emailLogin.classList.remove("hidden");
  phoneLogin.classList.add("hidden");

  loginBtn.classList.remove("hidden");
  otpBtn.classList.add("hidden");
  otpStatus.style.display = "none";
});

phoneMode.addEventListener("click", () => {
  phoneMode.classList.add("active");
  emailMode.classList.remove("active");

  phoneLogin.classList.remove("hidden");
  emailLogin.classList.add("hidden");

  loginBtn.classList.add("hidden");
  otpBtn.classList.remove("hidden");
});

/* ---------- OTP UX ---------- */

otpBtn.addEventListener("click", () => {
  otpStatus.style.display = "block";
  otpStatus.textContent = "OTP sent successfully";

  otpBtn.disabled = true;
  otpBtn.textContent = `Resend OTP (${countdown}s)`;

  otpTimer = setInterval(() => {
    countdown--;
    otpBtn.textContent = `Resend OTP (${countdown}s)`;

    if (countdown === 0) {
      clearInterval(otpTimer);
      otpBtn.disabled = false;
      otpBtn.textContent = "Resend OTP";
      countdown = 30;
    }
  }, 1000);
});

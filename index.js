document.addEventListener("DOMContentLoaded", async () => {
 const slider = document.getElementById("slider");
 const prevBtn = document.getElementById("prevBtn");
 const nextBtn = document.getElementById("nextBtn");
 const slides = document.getElementById("slides");

 let visibleSlides = parseInt(slides.value);
 let data = [];
 let curIndex = 0;

 //chg listener + render
 slides.addEventListener("change", () => {
  visibleSlides = parseInt(slides.value);
  sliderRender();
 });

 //fetch + render
 const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  data = await response.json();
  sliderRender();
 };

 //fn create sldier card + upd
 const sliderRender = () => {
  slider.innerHTML = "";
  const sliderWidth = slider.offsetWidth;
  const cardWidth = sliderWidth / visibleSlides;

  data.forEach((el, i) => {
   const card = document.createElement("div");
   card.className = "card";
   card.style.minWidth = `${cardWidth}px`;
   card.innerHTML = `
              <h3>${el.name}</h3>
              <p>${el.email}</p>
              <p>${el.phone}</p>
              <button onclick="deleteCard(${i})">X</button>
          `;
   slider.appendChild(card);
  });

  updateSlider();
 };

 //upd
 const updateSlider = () => {
  const cardWidth = slider.offsetWidth / visibleSlides;
  const offset = -(curIndex * cardWidth);
  slider.style.transform = `translateX(${offset}px)`;
 };

 //buttons + upd
 prevBtn.addEventListener("click", () => {
  curIndex = Math.max(curIndex - 1, 0);
  updateSlider();
 });

 nextBtn.addEventListener("click", () => {
  curIndex = Math.min(curIndex + 1, data.length - visibleSlides);
  updateSlider();
 });

 //delte card + render
 window.deleteCard = (index) => {
  data.splice(index, 1);
  curIndex = Math.min(curIndex, data.length - visibleSlides);
  sliderRender();
 };

 //listener render slider
 window.addEventListener("resize", sliderRender);

 await fetchData();
});

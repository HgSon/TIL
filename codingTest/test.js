const options = {
  root: null,
  rootMargin: "0px 0px 30px 0px",
  threshold: 0,
};
const io = new IntersectionObserver((entries, observer) => {
  console.log(entries);
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
}, options);
const images = document.querySelectorAll(".image");
images.forEach((el) => {
  io.observe(el);
});
console.log(images);

function toggleNav(){
  const nav = document.getElementById('navbar');
  const open = nav.classList.toggle('open');
  document.querySelector('.nav-toggle').setAttribute('aria-expanded', String(open));
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const nav = document.getElementById('navbar');
    nav.classList.remove('open');
    document.querySelector('.nav-toggle').setAttribute('aria-expanded','false');
  }
});
document.addEventListener('click', e => {
  const nav = document.getElementById('navbar');
  if (nav.classList.contains('open') && !nav.contains(e.target)) {
    nav.classList.remove('open');
    document.querySelector('.nav-toggle').setAttribute('aria-expanded','false');
  }
});

(function(){
  const mock = document.getElementById('mock-quiz');
  if (!mock) return;
  const opts = mock.querySelectorAll('.mock-opt');
  const fb = mock.querySelector('.mock-fb');
  const fbText = fb.querySelector('.fb-text');
  const bar = mock.querySelector('.mock-bar i');
  const GOOD = 'Correct! +3 marks. Now write the working \u2014 examiners award method marks.';
  const BAD = 'Not this one \u2014 subtract 2x from both sides and try the next mock drill.';
  let userActed = false;
  function answer(el){
    opts.forEach(o => o.classList.remove('pick'));
    const ok = el.dataset.correct === '1';
    el.classList.add(ok ? 'reveal' : 'wrong');
    fb.classList.remove('good','bad');
    fb.classList.add('show', ok ? 'good' : 'bad');
    fbText.textContent = ok ? GOOD : BAD;
    bar.style.width = '72%';
  }
  opts.forEach(o => {
    o.addEventListener('click', () => { userActed = true; answer(o); });
    o.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); userActed = true; answer(o); }
    });
  });
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    setTimeout(() => {
      if (userActed) return;
      const b = Array.from(opts).find(o => o.dataset.correct === '1');
      if (b) { b.classList.add('pick'); setTimeout(() => { if (!userActed) answer(b); }, 900); }
    }, 2800);
  }
})();

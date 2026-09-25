(function cubeBounce(){
  var obj = document.getElementById('subjects-cube-obj');
  if (!obj) return;
  obj.addEventListener('click', function(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    obj.classList.remove('qm-bounce');
    void obj.offsetWidth;
    obj.classList.add('qm-bounce');
    setTimeout(function(){ obj.classList.remove('qm-bounce'); }, 600);
  });
})();

(function cubeDrag(){
  var obj = document.getElementById('subjects-cube-obj');
  if (!obj) return;
  var spin = obj.querySelector('.cube-spin');
  if (!spin) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var dragging = false, lastX = 0, lastY = 0, velX = 0, dragRX = 0, dragRY = 0, raf = null, momentumId = null;

  function applyDrag(){
    spin.style.transform = 'rotateX(' + dragRX + 'deg) rotateY(' + dragRY + 'deg)';
  }
  function momentum(){
    dragRY += velX; dragRX = Math.max(-80, Math.min(80, dragRX + velY));
    velX *= 0.95; velY *= 0.95;
    applyDrag();
    if (Math.abs(velX) > 0.05 || Math.abs(velY) > 0.05) { momentumId = requestAnimationFrame(momentum); }
    else { momentumId = null; spin.style.transform = ''; obj.classList.remove('qm-dragging'); }
  }
  function down(e){
    if (momentumId) { cancelAnimationFrame(momentumId); momentumId = null; }
    dragging = true; obj.classList.add('qm-dragging');
    lastX = (e.touches ? e.touches[0].clientX : e.clientX);
    lastY = (e.touches ? e.touches[0].clientY : e.clientY);
    velX = 0; velY = 0;
  }
  function move(e){
    if (!dragging) return;
    e.preventDefault();
    var x = (e.touches ? e.touches[0].clientX : e.clientX);
    var y = (e.touches ? e.touches[0].clientY : e.clientY);
    var dx = x - lastX, dy = y - lastY;
    lastX = x; lastY = y;
    velX = dx * 0.4; velY = dy * 0.2;
    dragRY += dx * 0.4;
    dragRX = Math.max(-80, Math.min(80, dragRX + dy * 0.2));
    applyDrag();
  }
  function up(){
    if (!dragging) return;
    dragging = false;
    if (Math.abs(velX) > 0.15 || Math.abs(velY) > 0.08) { momentumId = requestAnimationFrame(momentum); }
    else { spin.style.transform = ''; obj.classList.remove('qm-dragging'); }
  }

  obj.addEventListener('mousedown', down);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
  obj.addEventListener('touchstart', down, {passive:true});
  obj.addEventListener('touchmove', move, {passive:false});
  obj.addEventListener('touchend', up);
  obj.addEventListener('touchcancel', up);
})();

(function cubeFaceIntro(){
  var obj = document.getElementById('subjects-cube-obj');
  var spin = obj ? obj.querySelector('.cube-spin') : null;
  var tip = document.getElementById('cube-tip');
  if (!obj || !spin || !tip) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (obj.dataset.faceIntro === 'done') return;
  obj.dataset.faceIntro = 'done';
  var faces = Array.prototype.slice.call(obj.querySelectorAll('.cube-face'));
  var names = {'front':'Maths','back':'English','right':'Your PDFs','left':'Chemistry','top':'Biology','bottom':'Any Exam'};
  var angles = [0, 90, 180, 270];
  var i = 0, timers = [];
  function showFace(){
    if (i >= angles.length || i >= faces.length) { end(); return; }
    var deg = angles[i];
    var face = faces[i];
    spin.style.transition = 'transform .9s cubic-bezier(.34,1.3,.64,1)';
    spin.style.animation = 'none';
    spin.style.transform = 'rotateY(' + deg + 'deg)';
    var label = face.textContent.trim();
    tip.textContent = label + ' \u2014 ' + { 'Maths':'drills that find your gaps', 'English':'comprehension + essays, marked', 'Your PDFs':'drop a paper, get a quiz', 'Chemistry':'equations and definitions', 'Biology':'diagrams, terms, processes', 'Any Exam':'entrance, nursing, pro tests' }[label] || '';
    tip.classList.add('show');
    var t1 = setTimeout(function(){ tip.classList.remove('show'); }, 1800);
    timers.push(t1);
    i++;
    var t2 = setTimeout(showFace, 2100);
    timers.push(t2);
  }
  function end(){
    timers.forEach(clearTimeout); timers = [];
    spin.style.transition = '';
    spin.style.animation = '';
    spin.style.transform = '';
    tip.classList.remove('show');
  }
  function stop(){ if (timers.length) { end(); } }
  obj.addEventListener('mousedown', stop, {once:false});
  obj.addEventListener('touchstart', stop, {once:false});
  obj.addEventListener('mouseenter', stop);
  var startDelay = setTimeout(showFace, 2600);  // after scroll-reveal settles
  timers.push(startDelay);
})();

// Envía los formularios con Web3Forms sin salir de la página
document.querySelectorAll('form[data-w3f]').forEach(form => {
  const status = form.querySelector('.form-status');
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      const data = await res.json();
      if (data.success) {
        form.reset();
        status.textContent = form.dataset.ok || 'Sent. Thank you!';
        status.className = 'form-status ok';
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      status.textContent = 'Your message wasn’t sent. Check your connection and try again.';
      status.className = 'form-status err';
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  });
});

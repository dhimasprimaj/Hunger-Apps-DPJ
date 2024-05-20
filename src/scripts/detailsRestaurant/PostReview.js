function autoReview(name, review) {
  const reviewUser = document.querySelector('.review-user');
  const uiReview = document.createElement('div');
  uiReview.innerHTML = ` <figure class="card-review">
    <blockquote>
      <p>${review.value}</p>
    </blockquote>
    <h3>${name.value}</h3>
    <h4>baru saja</h4>
  </figure>`;
  if (reviewUser.firstChild) {
    reviewUser.insertBefore(uiReview.firstElementChild, reviewUser.firstChild);
  }
}

async function sendReview(id, name, review) {
  try {
    const response = await fetch('https://restaurant-api.dicoding.dev/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        review,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Network error');
    }
    return data;
  } catch (error) {
    return { error: true, message: 'Network error' };
  }
}

// Fungsi utama untuk menangani pengiriman review
function handlePostReview(id, fetchReview = sendReview) {
  const form = document.querySelector('.container-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name');
    const review = document.querySelector('#review');

    if (!name || !review) {
      alert('input masi ada yang kosong');
      return;
    }

    const data = await fetchReview(id, name.value, review.value);
    if (!data.error) {
      autoReview(name, review);
      name.value = '';
      review.value = '';
    }
  });
}

module.exports = { handlePostReview, autoReview, sendReview };

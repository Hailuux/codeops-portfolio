//1
async function getUsdToEtbRate() {
  const res = await fetch(
    "https://api.frankfurter.app/latest?from=USD&to=ETB"
  );

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = await res.json();

  return data.rates.ETB;
}

getUsdToEtbRate()
  .then(rate => {
    console.log(`1 USD = ${rate} ETB`);
  })
  .catch(error => {
    console.error(error.message);
  });


  //2
  async function loadCities() {
  try {
    const res = await fetch("https://api.example.com/cities");

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    render(data);

  } catch (error) {
    console.error(error.message);
  }
}


//3
//wrong url
async function testWrongUrl() {
  try {
    const res = await fetch(
      "https://this-url-does-not-exist.example"
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

  } catch (error) {
    console.log("Catch ran:", error.message);
  }
}

testWrongUrl();

//real url returning 404
async function test404() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/999999"
    );

    console.log("fetch completed");

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    console.log(data);

  } catch (error) {
    console.log("Catch ran:", error.message);
  }
}

test404();


4//
//json place holder
async function loadPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  return res.json();
}

//
async function loadDetails() {
  try {
    const posts = await loadPosts();

    const firstTwo = posts.slice(0, 2);

    const details = await Promise.all(
      firstTwo.map(post =>
        fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`
        ).then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
          }

          return res.json();
        })
      )
    );

    console.log(details);

  } catch (error) {
    console.error(error.message);
  }
}

loadDetails();


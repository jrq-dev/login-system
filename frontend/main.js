const contentMain = document.getElementById("main-content");

const BASE_PATH = (() => {
  const parts = location.pathname.split("/").filter(Boolean); // remove empty parts
  console.log(parts);
  if (parts.length === 0) return "/"; // root
  return "/" + parts[0] + "/"; // get the top-level folder
})();

const getPageFromPath = (pathname) => {
  const relativePath = pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length)
    : pathname;

  const segments = relativePath.replace(/\/+$/, "").split("/");
  return segments.pop() || "login";
};

const loadPage = (path) => {
  const page = getPageFromPath(path);

  fetch(`pages/${page}.html`)
    .then((res) => {
      console.log(res);
      if (!res.ok)
        throw {
          message: "Page not found",
          status: res.status,
          url: res.url,
        };
      return res.text();
    })
    .then((html) => {
      history.pushState(null, null, `/${page}`);
      contentMain.innerHTML = html;
    })
    .catch((err) => {
      // @Todo replace 404 page
      history.pushState(null, null, `/${page}`);
      contentMain.innerHTML = `<h1 class="uppeercase font-bold size-48 items-center flex w-full justify-center h-lvh"> ${err.message} </h1>`;
    });
};

window.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    e.preventDefault();

    loadPage(e.target.href);
  }
});

window.addEventListener("popstate", () => {
  loadPage(location.pathname);
});
console.log(location.pathname);
loadPage(location.pathname);

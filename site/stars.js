(() => {
  const USER = "Batuhan1999";
  const CACHE_KEY = "gh-stars";
  const CACHE_TTL = 60 * 60 * 1000;

  const links = document.querySelectorAll('#projects ~ ul a.name[href^="https://github.com/"]');
  if (!links.length) return;

  const format = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "")}k` : String(n));

  const render = (stars) => {
    for (const link of links) {
      const [owner, repo] = new URL(link.href).pathname.split("/").filter(Boolean);
      if (!owner || owner.toLowerCase() !== USER.toLowerCase()) continue;
      const count = stars[repo.toLowerCase()];
      if (!count) continue;

      const li = link.closest("li");
      let meta = li.querySelector(".meta");
      if (!meta) {
        meta = document.createElement("span");
        meta.className = "meta";
        li.append(meta);
      }
      meta.textContent = `★ ${format(count)}`;
      meta.title = `${count} GitHub star${count === 1 ? "" : "s"}`;
    }
  };

  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.at < CACHE_TTL) {
      render(cached.stars);
      return;
    }
  } catch {}

  fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`, {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((repos) => {
      const stars = {};
      for (const r of repos) stars[r.name.toLowerCase()] = r.stargazers_count;
      render(stars);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), stars }));
      } catch {}
    })
    .catch(() => {});
})();

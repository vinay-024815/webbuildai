# Revert plan — sirf post page chhorna hai, baaki sab wapas

Scope: `src/pages/Post.jsx` + uske new components **rakhne hain**. Jo maine shared/non-blog files
mein edit kiye, unhe wapas karna hai.

---

## 0. Constraint jo revert ko shape deta hai

Meri saari changes commit `3a242fe` ("improved ui") ke andar hain, **aapke apne UI changes ke saath
mix hoke**. Isliye:

- `git revert 3a242fe` **mat chalao** — wo aapka kaam (App.jsx, nav.json, CategoryTile, etc.) bhi
  udayega.
- `git checkout 3a242fe~1 -- <file>` sirf un files ke liye safe hai jinme sirf meri changes hain.
  Har file ke liye pehle `git diff 3a242fe~1 3a242fe -- <file>` dekh lo.

Meri changes teen tier me hain: (A) doosre pages par asar karne wali, (B) purely additive shared
files, (C) post-page-only files jinhe chherna hai.

---

## A. Revert karo (asar padta hai)

### A1. `src/index.css` — sabse bada regression

**Problem (measured, guess nahi):** maine poora file rewrite karke `.prose`, `.callout*`,
`.sidebar-scroll` rules add kiye. `.prose` CSS ke ye rules **sirf Post page ke liye** the, par
`src/pages/LegalPage.jsx:9` bhi `className="prose ..."` use karta hai — `/about`, `/privacy-policy`,
`/terms` etc. ab 68ch / 17px / 1.75 line-height ho gaye. Browser me verify kiya: `/about` par
`.prose` div = `max-width: 623px, font-size: 17px, line-height: 29.75px` (pehle woh `max-w-none
text-[16px] leading-8` the).

**Revert steps (2 options, choose one):**

- **Option 1 — plain revert (simplest):**
  ```
  git show 3a242fe~1:src/index.css > src/index.css
  ```
  LegalPage wapas original. **Side effect:** post page ka body typography (`.prose`) bhi chala jaayega
  — article 16px default text dikhegi.
- **Option 2 — recommended, same visual result for both pages:** file restore karo (upar wala
  command), phir wahi typography rules **post-only naam** se wapas add karo — CSS selectors
  `.prose` ki jagah `.post-body`, aur [Post.jsx](src/pages/Post.jsx) ke prose div ka
  `className="prose"` → `"post-body"`. `.callout*` + `.sidebar-scroll` bhi `.post-body` ke saath
  ya alag post-only class se rakho. LegalPage ka `.prose` untouched → uski original styling.
  Ye ek-file-two-line edit hai, koi shared selector nahi badlega.

Note: original file CRLF thi, meri copy LF hai — restore karne par wapas CRLF aa jaayegi, diff
saaf rahega.

### A2. `src/components/NewsletterCTA.jsx` — Home page ka component

**Problem:** isko maine 3 jagah badla — (1) local `useState` ki jagah `useNewsletter()` hook,
(2) hardcoded `id="newsletter-email"` → `useId()`, (3) section par optional `id` prop. Ye component
`Home.jsx:392` use karta hai, jo meri wajah se nahi toota (prop optional hai) — par ye **aapka
component hai, blog se bahar** hai.

**Revert steps:**
```
git show 3a242fe~1:src/components/NewsletterCTA.jsx > src/components/NewsletterCTA.jsx
```
(Original version mere paas session ke read me hai: local `useState`, hardcoded `id="newsletter-email"`,
koi `id` prop nahi.)

**Do side effects jo wapas aayenge — ye pre-existing bugs hain, meri wajah se nahi bane:**
1. **Home page duplicate `id="newsletter-email"`** — `Home.jsx:346` ka inline form + ye component,
   dono same id dete hain. Label association tootta hai. (Ye bug meri `useId` change se theek hua
   tha; revert karne par wapas.)
2. **Post page ka `#newsletter` anchor** — `Post.jsx` abhi `<NewsletterCTA id="newsletter" />` call
   karta hai; revert ke baad prop ignore ho jaayega, to header ka NEWSLETTER button post page par
   phir se kuch nahi karega. **Bina shared component chhede fix:** Post.jsx ke andar
   `<div id="newsletter"><NewsletterCTA /></div>` rakh do — anchor target mil jaayega, component
   bilkul untouched.

### A3. `.vite-dev.log` — mera dev-server log, git me commit ho gaya

```
git rm --cached .vite-dev.log
echo ".vite-dev.log" >> .gitignore
```
Phir background dev server band karo (PID 19512, port 5180).

---

## B. Additive hai — revert optional (meri recommendation: rehne do)

| File | Meri changes | Doosre pages par asar | Agar revert karo to |
|---|---|---|---|
| `src/blogs.js` | sirf last 14 lines: `timestampOf()` + `getLatest()` | koi nahi — sirf Post.jsx import karta hai | `LatestArticlesList` ko ya to hata do, ya sorting Post.jsx ke andar inline kar do |
| `src/content/site.json` | `author` block (4 lines) | koi nahi — sirf `Post.jsx:124` `site.author` padhta hai | kuch nahi tootta — `PostHeader.jsx` ka `DEFAULT_AUTHOR` fallback chal jaata hai |

**Warning:** `git diff 3a242fe~1 3a242fe -- src/blogs.js` me `loadBlogs` ka `fetch("/blogs.json")`
→ dynamic-import wala bhi badlav hai — **wo mera nahi hai**, wo pehle se aapka tha. Revert me
sirf `getLatest` block hatana, `loadBlogs` mat chhuna.

---

## C. Mat chhodo (post-page-only, yahi kaam hai jo aapne manga tha)

- `src/pages/Post.jsx` — target page.
- `src/components/article/` — `Breadcrumbs`, `PostHeader`, `TableOfContents`, `LatestArticlesList`,
  `SidebarNewsletter`. Inhe sirf Post.jsx import karta hai.
- `src/hooks/useNewsletter.js` — post-page-only consumers. (NewsletterCTA revert karne par isko
  `SidebarNewsletter.jsx` ke andar inline karke file delete kar sakte ho — optional cleanup.)

**Ek cheez jo revert karne layak hai, wo bhi post-page ke andar hi hai:** `TableOfContents.jsx` ka
scroll-spy — maine aapke "sahi to tha" feedback ke baad bhi `IntersectionObserver` wala version
`requestAnimationFrame` wale se replace kar diya tha. Usko IO wale original par wapas laana ho to
bata do (donon post-page ke andar hain, koi shared file nahi).

**Do NOT touch:** `src/components/article/SidebarNewsletter.jsx` ka working-tree diff — usme aapne
khud button black kiya aur privacy line comment ki hai. Koi bhi revert step is file ko overwrite
na kare.

---

## D. Order of operations

1. `npm run build` (baseline green, pata ho ki kya chal raha hai)
2. A3 — log file + gitignore + dev server band
3. A1 — index.css restore (Option 2 choose kiya to: restore → `.post-body` rename → Post.jsx ka
   className update)
4. A2 — NewsletterCTA restore (+ Post.jsx me `<div id="newsletter">` wrapper)
5. B (optional) — `getLatest`/`author` hatao
6. Verify

## E. Verification checklist

1. `npm run build` pass.
2. `/about` par `.prose` div: `max-width: none` wapas, `font-size: 16px`, `line-height: 32px` —
   LegalPage original dikhe.
3. `/blog/<slug>`: header, TOC, latest, sidebar newsletter sab wahi dikhe (A1 Option 2 ke baad).
4. `/` par newsletter form submit → success state.
5. Console me duplicate-id warning nahi; Home par `document.querySelectorAll('#newsletter-email').length`
   check (revert ke baad 2 hoga — pre-existing, documented).
6. `git status` sirf intended files dikhaye; `git diff` me `loadBlogs` na badla ho.

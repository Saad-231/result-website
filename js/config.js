/* =========================================================
   config.js
   ---------------------------------------------------------
   SINGLE SOURCE OF TRUTH for this site.

   To add a new Board: add an entry to BOARDS.
   To update a result date/status/URL: edit RESULT_CONFIG
   or the resultUrl field on the relevant board/class.

   IMPORTANT: resultUrl values point to each Board's official
   website. Verify and refresh these periodically — official
   websites occasionally change their domain or URL structure.
   This site never stores, fetches or displays result data
   itself; it only links students to the correct official page.
   ========================================================= */

const BOARDS = {
  lahore: {
    key: "lahore",
    name: "BISE Lahore",
    fullName: "Board of Intermediate & Secondary Education, Lahore",
    slug: "lahore-board-result",
    resultUrl: "https://www.biselahore.com/",
    website: "https://www.biselahore.com/",
    districts: "Lahore",
  },
  gujranwala: {
    key: "gujranwala",
    name: "BISE Gujranwala",
    fullName: "Board of Intermediate & Secondary Education, Gujranwala",
    slug: "gujranwala-board-result",
    resultUrl: "https://bisegrw.edu.pk/",
    website: "https://bisegrw.edu.pk/",
    districts: "Gujranwala, Gujrat, Hafizabad, Mandi Bahauddin, Narowal, Sialkot",
  },
  faisalabad: {
    key: "faisalabad",
    name: "BISE Faisalabad",
    fullName: "Board of Intermediate & Secondary Education, Faisalabad",
    slug: "faisalabad-board-result",
    resultUrl: "https://www.bisefsd.edu.pk/",
    website: "https://www.bisefsd.edu.pk/",
    districts: "Faisalabad, Chiniot, Jhang, Toba Tek Singh",
  },
  rawalpindi: {
    key: "rawalpindi",
    name: "BISE Rawalpindi",
    fullName: "Board of Intermediate & Secondary Education, Rawalpindi",
    slug: "rawalpindi-board-result",
    resultUrl: "https://results.biserawalpindi.edu.pk/",
    website: "https://www.biserawalpindi.edu.pk/",
    districts: "Rawalpindi, Attock, Chakwal, Jhelum",
  },
  multan: {
    key: "multan",
    name: "BISE Multan",
    fullName: "Board of Intermediate & Secondary Education, Multan",
    slug: "multan-board-result",
    resultUrl: "https://bisemultan.edu.pk/",
    website: "https://bisemultan.edu.pk/",
    districts: "Multan, Khanewal, Lodhran, Vehari",
  },
  sargodha: {
    key: "sargodha",
    name: "BISE Sargodha",
    fullName: "Board of Intermediate & Secondary Education, Sargodha",
    slug: "sargodha-board-result",
    resultUrl: "https://bisesargodha.edu.pk/content/BoardResult.aspx",
    website: "https://bisesargodha.edu.pk/content/index.aspx",
    districts: "Sargodha, Bhakkar, Khushab, Mianwali",
  },
  sahiwal: {
    key: "sahiwal",
    name: "BISE Sahiwal",
    fullName: "Board of Intermediate & Secondary Education, Sahiwal",
    slug: "sahiwal-board-result",
    resultUrl: "https://www.bisesahiwal.edu.pk/allresult/",
    website: "https://www.bisesahiwal.edu.pk/",
    districts: "Sahiwal, Okara, Pakpattan",
  },
  bahawalpur: {
    key: "bahawalpur",
    name: "BISE Bahawalpur",
    fullName: "Board of Intermediate & Secondary Education, Bahawalpur",
    slug: "bahawalpur-board-result",
    resultUrl: "https://www.bisesahiwal.edu.pk/allresult/",
    website: "https://bisebwp.edu.pk/",
    districts: "Bahawalpur, Bahawalnagar, Rahim Yar Khan",
  },
  dgkhan: {
    key: "dgkhan",
    name: "BISE DG Khan",
    fullName: "Board of Intermediate & Secondary Education, Dera Ghazi Khan",
    slug: "dg-khan-board-result",
    resultUrl: "https://bisedgkhan.edu.pk/",
    website: "https://bisedgkhan.edu.pk/",
    districts: "Dera Ghazi Khan, Rajanpur, Layyah, Muzaffargarh",
  },
};

const CLASSES = {
  "9th": {
    key: "9th",
    label: "9th Class",
    shortLabel: "9th",
    slug: "9th-class-result",
    boardTerm: "SSC Part-I",
  },
  "10th": {
    key: "10th",
    label: "10th Class",
    shortLabel: "10th",
    slug: "10th-class-result",
    boardTerm: "SSC Part-II",
  },
  "11th": {
    key: "11th",
    label: "11th Class",
    shortLabel: "11th",
    slug: "11th-class-result",
    boardTerm: "HSSC Part-I",
  },
  "12th": {
    key: "12th",
    label: "12th Class",
    shortLabel: "12th",
    slug: "12th-class-result",
    boardTerm: "HSSC Part-II",
  },
};

/* ---------------------------------------------------------
   The ONLY thing to edit here every result season is "date"
   (and "year"/"time" if they change). Status is calculated
   automatically from today's date — nobody needs to flip
   "upcoming" to "announced" by hand, and once a season is well
   over the site rolls itself forward to next year on its own.
   This mirrors the same rule used at build time in build.py,
   so the page you get on load matches the page that was last
   generated.
   --------------------------------------------------------- */
const RESULT_CONFIG = {
  "9th": { year: 2026, date: "2026-09-02", time: "10:00 AM" },
  "10th": { year: 2026, date: "2026-07-14", time: "10:00 AM" },
  "11th": { year: 2026, date: "2026-09-15", time: "10:00 AM" },
  "12th": { year: 2026, date: "2026-08-20", time: "10:00 AM" },
};

/* How many days after the result date we keep showing
   "announced" before assuming the season is over and rolling
   the display forward to next year. Keep this the same number
   as ANNOUNCED_WINDOW_DAYS in build.py. */
const ANNOUNCED_WINDOW_DAYS = 120;

const STATUS_LABEL = {
  next_cycle: "Date will be announced by the Board",
  upcoming: "Result expected on",
  announced: "Result announced",
};

function formatResultDate(iso) {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  } catch (e) {
    return iso;
  }
}

/* Works out the live cycle for a class the same way build.py
   does at generation time: upcoming -> announced -> next_cycle
   (rolled forward a year, date unknown until the Board sets one). */
function resolveClassCycle(classKey) {
  const info = RESULT_CONFIG[classKey];
  if (!info) return null;

  const resultDate = new Date(info.date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const msPerDay = 24 * 60 * 60 * 1000;
  const deltaDays = Math.round((today - resultDate) / msPerDay);

  if (deltaDays < 0) {
    return { status: "upcoming", year: info.year, dateText: formatResultDate(info.date) };
  }
  if (deltaDays <= ANNOUNCED_WINDOW_DAYS) {
    return { status: "announced", year: info.year, dateText: formatResultDate(info.date) };
  }
  return { status: "next_cycle", year: info.year + 1, dateText: null };
}

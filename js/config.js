/**
 * SITE CONFIGURATION — single source of truth
 *
 * HOW TO REBRAND:
 *   - Change agent name   → update AGENT.name
 *   - Change brokerage    → update BROKERAGE block (name, shortName, badge, address)
 *   - Change contact info → update CONTACT block
 *
 * Elements with id="brokerage-*" are wired below in applyConfig().
 * Everything else (header logo, page titles, meta) was updated directly
 * in each HTML file to match these values.
 */

const SITE_CONFIG = {
  AGENT: {
    name:    "Butch Dyer",
    title:   "REALTOR®",
    license: "NCREC #XXXXXX",
  },

  // ─── SWAPPABLE ─────────────────────────────────────────────────────────────
  // To change brokerages, update only this block.
  // All elements with id="brokerage-*" will update automatically on page load.
  BROKERAGE: {
    name:      "Keller Williams Realty",
    shortName: "KW Raleigh",
    badge:     "KW Keller Williams",
    address:   "4242 Six Forks Rd, Suite 1500, Raleigh, NC 27609",
  },
  // ───────────────────────────────────────────────────────────────────────────

  CONTACT: {
    phone: "919-427-0069",
    // ⚠ PLACEHOLDER — pending ButchDyer.com email activation.
    // Update this value when the new domain email is confirmed live.
    email: "butch@butchdyer.com",
  },

  // Legal DBA — used ONLY in fine-print / compliance text, not as visual brand.
  DBA: "Dyer Realty NC",

  COMPLIANCE: {
    eho:        true,
    ncrec:      "NCREC License #XXXXXX",
    disclosure: "Working with Real Estate Agents Disclosure available upon request.",
  },
};

/**
 * Injects BROKERAGE values into every element whose id starts with "brokerage-".
 * Runs once on DOMContentLoaded. To change brokerages, update SITE_CONFIG.BROKERAGE above.
 */
function applyConfig() {
  const B = SITE_CONFIG.BROKERAGE;

  const targets = {
    "brokerage-badge":          B.badge,      // footer compliance bar
    "brokerage-affiliation":    B.name,        // footer brand subline
    "brokerage-photo-badge":    B.shortName,   // headshot badge (about + homepage)
    "brokerage-credit":         `Currently at ${B.name}, Raleigh, NC`,
    "brokerage-author-credit":  `Currently at ${B.name}, Raleigh, NC.`,
    "brokerage-title-about":    B.shortName,
  };

  for (const [id, text] of Object.entries(targets)) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Office address block (footer on homepage — may contain HTML, so use innerHTML)
  const office = document.getElementById("brokerage-office");
  if (office) {
    office.innerHTML = `<strong>Office</strong>${B.name}<br>${B.address}`;
  }
}

document.addEventListener("DOMContentLoaded", applyConfig);

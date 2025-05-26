import re
from typing import List, Dict
import spacy

# ─────────────────────────────────────────────────────────────
#  Helpers
# ─────────────────────────────────────────────────────────────
nlp = spacy.load("en_core_web_sm")

# ALL high-level sections we might meet
_SECTION_BREAKERS = {
    # core sections
    "profile", "summary", "objective",
    "professional experience", "work experience", "experience", "employment",
    "projects", "technical projects", "side projects",
    "courses", "courses & certifications", "certifications", "training",
    "achievements", "awards", "honors", "accomplishments",
    "skills", "technical skills", "languages", "employment history","other experience",
    "education",
    # extras
    "publications", "volunteering", "volunteer",
    "interests", "hobbies",
    "references", "referees", "contact", "extra-curricular"
}

def _is_section_break(line: str) -> bool:
    """Return True if the line looks like a high-level heading."""
    l = line.strip()
    if len(l) > 70:
        return False
    plain = re.sub(r"[^A-Za-z &]", "", l).lower().strip()
    return plain in _SECTION_BREAKERS or l.isupper()

def _dedupe(items: List[str]) -> List[str]:
    seen, out = set(), []
    for itm in items:
        key = re.sub(r"\s+", " ", itm.strip().lower())
        if key and key not in seen:
            seen.add(key)
            out.append(itm.strip())
    return out

def _capture_by_heading(cv_text: str,
                        heading_keywords: List[str],
                        min_words: int = 4) -> List[str]:
    """
    Grab *every* section whose heading contains any keyword.
    """
    lines = cv_text.splitlines()
    blocks, current, capture = [], [], False

    for raw in lines:
        line = raw.rstrip()
        lower = line.lower().strip()

        # Start a wanted section?
        if any(k in lower for k in heading_keywords):
            if current:
                blocks.append("\n".join(current).strip())
                current = []
            capture = True
            continue

        # End of current section?
        if capture and (_is_section_break(line) or not line.strip()):
            if current:
                blocks.append("\n".join(current).strip())
                current = []
            capture = False
            continue

        if capture:
            current.append(line)

    if current:
        blocks.append("\n".join(current).strip())

    return [b for b in blocks if len(b.split()) >= min_words]

def _find_bullets_matching(cv_text: str,
                           include_kw: List[str],
                           exclude_kw: List[str] = None,
                           min_words: int = 4) -> List[str]:
    """
    Look for single-line bullets with include words and no exclude words.
    """
    if exclude_kw is None:
        exclude_kw = []
    lines, hits, i = cv_text.splitlines(), [], 0

    while i < len(lines):
        line = lines[i].strip()
        lower = line.lower()
        if any(k in lower for k in include_kw) and not any(k in lower for k in exclude_kw):
            block = [line]
            j = i + 1
            while (j < len(lines) and lines[j].strip()
                   and not _is_section_break(lines[j])
                   and not re.match(r"^[\u2022•\-–]", lines[j].lstrip())):
                block.append(lines[j].strip())
                j += 1
            if len(" ".join(block).split()) >= min_words:
                hits.append(" ".join(block))
            i = j
        else:
            i += 1
    return hits

# ─────────────────────────────────────────────────────────────
#  New helper: split a “Professional Experience” block
#  into per-job chunks (role + bullets)
# ─────────────────────────────────────────────────────────────
_JOB_HEADER = re.compile(
    r"^[A-Z][A-Za-z0-9 &\-–—]+ – .+ – .+$"           # “Role – Team – Company”
)

def _split_jobs_in_block(block: str) -> List[str]:
    """
    Inside one long Professional Experience block, slice it into
    separate jobs by detecting lines like
    'Senior Software Engineer – Streaming Observability – Netflix'
    followed by bullet points.
    """
    lines = block.splitlines()
    jobs, current = [], []

    for line in lines:
        if _JOB_HEADER.match(line.strip()):
            if current:
                jobs.append("\n".join(current).strip())
                current = []
        current.append(line)
    if current:
        jobs.append("\n".join(current).strip())

    return jobs

# ─────────────────────────────────────────────────────────────
# 3. Work Experience  (improved)
# ─────────────────────────────────────────────────────────────
def extract_work_experience(cv_text: str) -> List[str]:
    # 3-a Grab every Professional / Work Experience block
    raw_blocks = _capture_by_heading(
        cv_text,
        ["professional experience", "work experience", "experience",
         "employment", "career history"]
    )

    # 3-b Slice each block into individual jobs
    jobs = []
    for blk in raw_blocks:
        jobs.extend(_split_jobs_in_block(blk))

    # 3-c Catch any stray job bullets elsewhere
    date_pattern = r"\b(20\d{2}|19\d{2})"
    extra_bullets = _find_bullets_matching(
        cv_text,
        include_kw=["engineer", "developer", "manager", "architect", "intern"],
        exclude_kw=["project", "course", "certificate", "award"]
    )
    extra_bullets = [b for b in extra_bullets if re.search(date_pattern, b)]

    return _dedupe(jobs + extra_bullets)

# # ─────────────────────────────────────────────────────────────
# # 1. Project Experience  (unchanged)
# # ─────────────────────────────────────────────────────────────
# def extract_project_experiences(cv_text: str) -> List[str]:
#     heading_blocks = _capture_by_heading(
#         cv_text,
#         ["project", "technical project", "side project"]
#     )
#     bullet_blocks = _find_bullets_matching(
#         cv_text,
#         include_kw=["project", "application", "system", "platform", "app", "developed"],
#         exclude_kw=["experience", "award", "course", "certification", "internship"]
#     )
#     return _dedupe(heading_blocks + bullet_blocks)

# ─────────────────────────────────────────────────────────────
# 2. Courses & Certifications  (unchanged)
# ─────────────────────────────────────────────────────────────
def extract_courses_certifications_achievements(cv_text: str) -> List[Dict[str, str]]:
    heading_blocks = _capture_by_heading(
        cv_text,
        ["certification", "course", "training", "workshop", "license"]
    )
    bullet_blocks = _find_bullets_matching(
        cv_text,
        include_kw=["certificate", "courses & certifications", "certification", "certified",
                    "course", "training", "workshop", "bootcamp"],
        exclude_kw=["award", "achievement", "honor", "project", "experience"]
    )
    combined = _dedupe(heading_blocks + bullet_blocks)
    return [{"type": "Courses/Certifications", "content": item} for item in combined]


# ─────────────────────────────────────────────────────────────
# 4. Achievements / Awards  (unchanged)
# ─────────────────────────────────────────────────────────────
# def extract_achievements(cv_text: str) -> List[str]:
#     heading_blocks = _capture_by_heading(
#         cv_text,
#         ["achievement", "awards", "honor", "accomplishment", "distinction"]
#     )
#     achievement_kw = {"achievement", "accomplishment", "award", "recognition", "honor",
#                       "winner", "finalist", "ranked", "scholarship", "grant", "medal",
#                       "best", "top", "prize", "distinction"}
#     sent_hits = [s.text.strip() for s in nlp(cv_text).sents
#                  if len(s.text) >= 15 and any(k in s.text.lower() for k in achievement_kw)]
#     final = [s for s in _dedupe(heading_blocks + sent_hits)
#              if not re.search(r"\b(best practices?|job|project|experience)\b", s, re.I)]
#     return final

# ─────────────────────────────────────────────────────────────
#  PROJECT-specific patterns  (extended)
# ─────────────────────────────────────────────────────────────
# Words that usually appear in project titles or their bullet lines
_PROJECT_KEYWORDS = (
    "project", "projects", "prototype", "system", "application", "app",
    "platform", "framework", "engine", "tool", "solution",
    "service", "microservice", "component", "module",
    "optimizer", "replicator", "detector",
    "boiler-plate", "boilerplate", "poc", "proof-of-concept"
)

# Verbs that show the writer actually *did* something
_ACTION_VERBS = (
    "built", "developed", "created", "implemented", "engineered", "designed",
    "crafted", "modernised", "constructed", "delivered", "refactored",
    "automated", "optimised", "prototyped", "integrated", "migrated"
)

# Anything that should never be part of a genuine project line
_EXCLUDE_RE = re.compile(
    r"(email|phone|address|linkedin|referee?s?|references?|"
    r"\bcourses?\b|\bcertifications?\b|\bawards?\b|\bachievements?\b|"
    r"\bexperience\b|https?://|@\w+)",
    re.I
)

#  Heading variants that users commonly put above their projects
_PROJECT_HEADINGS = [
    "project",               # matches “Projects”, “Project Experience”, …
    "technical project",     # “Technical Projects”
    "academic project",      # “Academic Projects”
    "industry based project",
    "research project",
    "other projects"         # “Other Projects”
]

# Helper: TRUE if any word appears as a whole word
def _word_found(text: str, words) -> bool:
    return any(re.search(rf"\b{re.escape(w)}\b", text, re.I) for w in words)

# ─────────────────────────────────────────────────────────────
#  Bullet finder – looks everywhere for loose project paragraphs
# ─────────────────────────────────────────────────────────────
def _find_project_bullets(cv_text: str,
                          min_words: int = 5) -> List[str]:
    lines = cv_text.splitlines()
    bullets, i = [], 0

    while i < len(lines):
        line = lines[i].strip()

        # must mention a project keyword and *not* match any excluded term
        if (_word_found(line, _PROJECT_KEYWORDS) and
                not _EXCLUDE_RE.search(line)):
            block = [line]
            j = i + 1
            while (j < len(lines) and lines[j].strip()
                   and not _is_section_break(lines[j])
                   and not re.match(r"^[\u2022•\-–]", lines[j].lstrip())):
                block.append(lines[j].strip())
                j += 1
            joined = " ".join(block)
            # keep only if the block is long enough and has an action verb
            if (len(joined.split()) >= min_words and
                    _word_found(joined, _ACTION_VERBS)):
                bullets.append(joined)
            i = j
        else:
            i += 1
    return bullets

# ─────────────────────────────────────────────────────────────
# 1. Project Experience  – final version
# ─────────────────────────────────────────────────────────────
def extract_project_experiences(cv_text: str) -> List[str]:
    """
    Return only project descriptions (academic, industry, hobby).
    Steps:
      1. Capture every block under headings that contain one of
         the words in _PROJECT_HEADINGS.
      2. Find free-floating bullets/paragraphs that smell like projects.
      3. Split heading blocks on blank lines or “Technologies:” so
         each item equals one project.
      4. Deduplicate and return.
    """
    # a. Heading-based capture
    heading_blocks = _capture_by_heading(cv_text, _PROJECT_HEADINGS)

    # b. Bullet capture
    bullet_blocks = _find_project_bullets(cv_text)

    # c. Split big heading blocks into individual project items
    project_items = []
    for blk in heading_blocks:
        for para in re.split(r"(?:\n\s*\n)|(?:\n\s*Technologies?:)", blk):
            t = para.strip()
            if (len(t.split()) >= 5 and
                    _word_found(t, _PROJECT_KEYWORDS) and
                    not _EXCLUDE_RE.search(t)):
                project_items.append(t)

    return _dedupe(project_items + bullet_blocks)

# ─────────────────────────────────────────────────────────────
# 4. Achievements / Awards
# ─────────────────────────────────────────────────────────────
def extract_achievements(cv_text: str) -> List[str]:
    """
    Returns list[str] of notable awards / honors.
    """
    heading_blocks = _capture_by_heading(
        cv_text,
        heading_keywords=["achievement", "awards", "honor", "accomplishment", "distinction"]
    )

    # sentence-level scan using a curated keyword list
    achievement_keywords = {
        "achievement", "accomplishment", "award", "recognition", "honor",
        "winner", "finalist", "ranked", "scholarship", "grant", "medal",
        "best", "top", "prize", "distinction"
    }

    doc = nlp(cv_text)
    sent_hits = []
    for sent in doc.sents:
        s = sent.text.strip()
        if len(s) < 15:
            continue
        lower = s.lower()
        if any(k in lower for k in achievement_keywords):
            sent_hits.append(s)

    combined = _dedupe(heading_blocks + sent_hits)

    # final filter to avoid false positives like “Best practices”
    final = [s for s in combined
             if not re.search(r"\b(best practices?|job|project|experience)\b", s, re.I)]
    return final

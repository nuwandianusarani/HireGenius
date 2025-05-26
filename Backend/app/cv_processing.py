from __future__ import annotations
import PyPDF2
import spacy
import re
from collections import Counter
from transformers import pipeline
import matplotlib.pyplot as plt
import base64
from io import BytesIO
import random
import re, unicodedata, itertools


import matplotlib
matplotlib.use('Agg')  # Use this to prevent Tkinter GUI issues


nlp = spacy.load("en_core_web_sm")


classifier = pipeline("zero-shot-classification", model="local_model", tokenizer="local_model")


def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
    return text


def extract_contact_info(text):
    email = re.findall(r'\S+@\S+', text)
    github = re.findall(r'https?://(?:www\.)?github\.com/[^\s]+', text)
    linkedin = re.findall(r'https?://(?:www\.)?linkedin\.com/[^\s]+', text)
    return {
        'email': email[0] if email else None,
        'github': github[0] if github else None,
        'linkedin': linkedin[0] if linkedin else None
    }


def extract_soft_skills(cv_text):
    soft_skills_list = [
        'communication', 'teamwork', 'leadership', 'problem-solving', 'adaptability',
        'time management', 'critical thinking', 'collaboration', 'creativity',
        'decision-making', 'empathy', 'negotiation', 'conflict resolution',
        'responsibility', 'accountability'
    ]
    soft_skills_found = []
    doc = nlp(cv_text)
    for sent in doc.sents:
        results = classifier(sent.text, candidate_labels=soft_skills_list, multi_label=True)
        for label, score in zip(results['labels'], results['scores']):
            if score >= 0.6 and label not in soft_skills_found:
                soft_skills_found.append(label)
    return Counter(soft_skills_found).most_common()

# Define dictionaries for technical skills
skills_keywords = {
    'Programming Languages': [
        'Python', 'Java', 'C', 'C++', 'C#', 'JavaScript', 'TypeScript', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin', 'Rust'
    ],
    'Frameworks and Libraries': [
        'React', 'Angular', 'Node.js', 'Django', 'Flask', 'Spring', 'Laravel', 'Vue.js', 'Bootstrap', 'TensorFlow',
        'Keras', 'PyTorch', 'jQuery', 'Express', 'Next.js', 'Spring Boot', 'Material UI', 'Hibernate', 'FastAPI'
    ],
    'Databases': [
        'MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'Oracle', 'SQL Server', 'Firebase', 'DynamoDB', 'Redis'
    ],
    'Cloud Platforms': [
        'AWS', 'Azure', 'Google Cloud', 'Firebase', 'Heroku', 'DigitalOcean', 'Cloudflare', 'IBM Cloud'
    ],
    'Tools and Technologies': [
        'Docker', 'Kubernetes', 'Git', 'GitHub', 'GitLab', 'JIRA', 'Bitbucket', 'Jenkins', 'Ansible', 'Terraform',
        'CI/CD', 'Serverless', 'Kibana', 'Elasticsearch', 'Logstash', 'Splunk', 'Figma', 'Postman'
    ],
    'Development Methodologies': [
        'Agile', 'Scrum', 'Kanban', 'DevOps', 'Waterfall', 'Test-Driven Development', 'Behavior-Driven Development'
    ]
}

# Combine all technical skills into a single list for easier matching
all_technical_skills = [skill for category in skills_keywords.values() for skill in category]

    

# Function to extract technical skills from project descriptions
def extract_technical_skills_from_projects(text):

    
    doc = nlp(text.lower())
    extracted_technical_skills = []
    for sentence in doc.sents:
        sentence_text = sentence.text.strip()
        for skill in all_technical_skills:
            if re.search(r'\b' + re.escape(skill.lower()) + r'\b', sentence_text):
                extracted_technical_skills.append(skill)
    return extracted_technical_skills

# Function to generate and return the base64-encoded skills bar chart
def generate_and_store_skills_chart(skill_counts):
    # Extract skill names and their counts
    skills = list(skill_counts.keys())
    counts = list(skill_counts.values())

    # Create a bar chart
    plt.figure(figsize=(10, 6))
    plt.barh(skills, counts, color='skyblue')
    plt.xlabel('Frequency')
    plt.ylabel('Technical Skills')
    plt.title('Technical Skills Extracted from Resume')
    plt.tight_layout()

    # Save the chart to a BytesIO object
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    plt.close()

    # Convert the image to base64
    chart_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    buffer.close()

    return chart_base64

def extract_programming_languages(text):
    programming_languages = [
        'Python', 'Java', 'C', 'C\\+\\+', 'C#', 'JavaScript', 'Ruby', 'Go', 'Swift', 'Kotlin', 'PHP',
        'TypeScript', 'R', 'Perl', 'Objective-C', 'Rust', 'Scala', 'Dart', 'Haskell', 'MATLAB',
        'Shell', 'PowerShell', 'SQL', 'Bash', 'HTML', 'CSS', 'SASS', 'Fortran', 'COBOL'
    ]
    
    found_languages = []

    programming_languages_escaped = [re.escape(lang) for lang in programming_languages]
    pattern = re.compile(r'\b(' + '|'.join(programming_languages_escaped) + r')\b', re.IGNORECASE)
    matches = pattern.findall(text)
    found_languages.extend(set(matches))

    doc = nlp(text)
    for sent in doc.sents:
        sentence_text = sent.text.lower()
        for lang in programming_languages:
            if lang.lower() in sentence_text and lang not in found_languages:
                found_languages.append(lang)

    return len(found_languages)

def extract_website_development_technologies(text):
    web_technologies = [
        'HTML', 'CSS', 'JavaScript', 'TypeScript', 'PHP', 'Ruby', 'Python', 'Java', 'C#', 
        'React', 'Angular', 'Vue.js', 'Svelte', 'Bootstrap', 'Tailwind CSS', 'jQuery', 
        'Node.js', 'Express', 'Next.js', 'Nuxt.js', 'Django', 'Flask', 'Laravel', 'ASP.NET',
        'Ruby on Rails', 'Spring', 'WordPress', 'Magento', 'Shopify', 'Joomla', 'Drupal',
        'Firebase', 'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'GraphQL', 'REST API',
        'WebSockets', 'Webpack', 'Gulp', 'Grunt', 'Parcel', 'Sass', 'LESS', 'JSON', 'AJAX',
        'WebAssembly', 'Three.js', 'Babel', 'Handlebars', 'Pug', 'Materialize', 'Foundation'
    ]
    
    found_web_technologies = []

    pattern = re.compile(r'\b(' + '|'.join(web_technologies) + r')\b', re.IGNORECASE)
    matches = pattern.findall(text)
    found_web_technologies.extend(set(matches))

    doc = nlp(text)
    for sent in doc.sents:
        sentence_text = sent.text.lower()
        if 'web development' in sentence_text or 'website' in sentence_text:
            for tech in web_technologies:
                if tech.lower() in sentence_text and tech not in found_web_technologies:
                    found_web_technologies.append(tech)

    return len(found_web_technologies)

def extract_programming_frameworks(text):
    frameworks = [
        'Django', 'Flask', 'React', 'Angular', 'Vue.js', 'Spring', 'Express', 'Rails', 'Ruby on Rails',
        'Laravel', 'ASP.NET', 'Node.js', 'Next.js', 'Bootstrap', 'Tailwind CSS', 'Foundation',
        'jQuery', 'Svelte', 'Nuxt.js', 'Redux', 'Keras', 'TensorFlow', 'Pandas', 'Hadoop',
        'Spark', 'Vue', 'Symfony', 'Zend', 'CakePHP', 'Meteor', 'FastAPI', 'Quasar', 'Phoenix', 'Ionic',
        'React Native', 'Electron', 'Flutter', 'Backbone.js', 'Alpine.js', 'NestJS', 'Struts', 'Sequelize',
        'CodeIgniter', 'Play Framework', 'Vaadin', 'Gatsby', 'Ember.js', 'MobX', 'CouchDB', 'RxJava'
    ]
    
    found_frameworks = []

    pattern = re.compile(r'\b(' + '|'.join(frameworks) + r')\b', re.IGNORECASE)
    matches = pattern.findall(text)
    found_frameworks.extend(set(matches))

    doc = nlp(text)
    for sent in doc.sents:
        sentence_text = sent.text.lower()
        for framework in frameworks:
            if framework.lower() in sentence_text and framework not in found_frameworks:
                found_frameworks.append(framework)

    return len(found_frameworks)

def extract_cloud_technologies(text):
    cloud_technologies = [
        'AWS', 'Amazon Web Services', 'Azure', 'Google Cloud', 'GCP', 'IBM Cloud', 'Oracle Cloud',
        'DigitalOcean', 'Alibaba Cloud', 'Salesforce', 'SAP Cloud', 'Cloud Foundry', 'Heroku', 
        'Red Hat OpenShift', 'VMware Cloud', 'Rackspace', 'Linode', 'Cloudflare', 'Backblaze',
        'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'CloudFormation', 'Pulumi', 'Spinnaker', 
        'Vault', 'Consul', 'Istio', 'Anthos', 'Cloud Functions', 'Lambda', 'Azure Functions', 
        'Google Cloud Functions', 'Serverless', 'ECS', 'EKS', 'Fargate', 'AKS', 'OpenStack', 'VPC',
        'EC2', 'S3', 'RDS', 'BigQuery', 'Cloud Storage', 'Cloud Run', 'Elastic Beanstalk', 
        'CloudWatch', 'CloudTrail', 'CloudFront', 'IAM', 'Load Balancer', 'Auto Scaling', 'S3 Buckets'
    ]
    
    found_technologies = []

    pattern = re.compile(r'\b(' + '|'.join(cloud_technologies) + r')\b', re.IGNORECASE)
    matches = pattern.findall(text)
    found_technologies.extend(set(matches))

    doc = nlp(text)
    for sent in doc.sents:
        sentence_text = sent.text.lower()
        if 'cloud' in sentence_text or 'deployment' in sentence_text:
            for tech in cloud_technologies:
                if tech.lower() in sentence_text and tech not in found_technologies:
                    found_technologies.append(tech)

    return len(found_technologies)

def extract_devops_technologies(text):
    devops_tools = [
        'Jenkins', 'GitLab CI', 'GitHub Actions', 'Travis CI', 'CircleCI', 'TeamCity', 'Bamboo',
        'ArgoCD', 'Spinnaker', 'Flux', 'Harness', 'Azure DevOps', 'Octopus Deploy', 'CodePipeline',
        'Docker', 'Kubernetes', 'Ansible', 'Terraform', 'Chef', 'Puppet', 'Nagios', 'Prometheus',
        'Grafana', 'Elastic Stack', 'ELK Stack', 'Splunk', 'New Relic', 'AppDynamics', 'Sentry',
        'Consul', 'Vault', 'Istio', 'Linkerd', 'Nginx', 'Apache Kafka', 'AWS CodeDeploy', 'CloudFormation',
        'SaltStack', 'OpenShift', 'Vagrant'
    ]
    
    found_tools = []

    pattern = re.compile(r'\b(' + '|'.join(devops_tools) + r')\b', re.IGNORECASE)
    matches = pattern.findall(text)
    found_tools.extend(set(matches))

    doc = nlp(text)
    for sent in doc.sents:
        sentence_text = sent.text.lower()
        if 'ci/cd' in sentence_text or 'devops' in sentence_text:
            for tool in devops_tools:
                if tool.lower() in sentence_text and tool not in found_tools:
                    found_tools.append(tool)

    return len(found_tools)

def extract_version_control_technologies(cv_text):
    version_control_tools = [
        "Git", "SVN", "Subversion", "Mercurial", "Perforce", "Bazaar", 
        "GitHub", "GitLab", "Bitbucket", "Azure DevOps", "SourceForge",
        "TortoiseSVN", "SmartGit", "GitKraken", "SourceTree"
    ]
    
    vc_pattern = re.compile(r'\b(' + '|'.join(re.escape(tool) for tool in version_control_tools) + r')\b', re.IGNORECASE)
    found_tools = set(vc_pattern.findall(cv_text))

    doc = nlp(cv_text)
    verified_tools = []
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        for tool in found_tools:
            if tool.lower() in sentence_text.lower():
                verified_tools.append(tool)
    
    verified_tools = list(set(verified_tools))
    return len(verified_tools)

def extract_database_technologies(cv_text):
    database_technologies = [
        "MySQL", "PostgreSQL", "SQLite", "Oracle Database", "SQL Server", "MongoDB", "Cassandra",
        "DynamoDB", "CouchDB", "Redis", "Firebase", "Snowflake", "Redshift", "BigQuery",
        "Neo4j", "JanusGraph", "ArangoDB", "Elasticsearch", "MariaDB", "CockroachDB", 
        "HBase", "ClickHouse"
    ]
    
    db_pattern = re.compile(r'\b(' + '|'.join(re.escape(db) for db in database_technologies) + r')\b', re.IGNORECASE)
    found_databases = set(db_pattern.findall(cv_text))
    
    doc = nlp(cv_text)
    verified_databases = []
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        for db in found_databases:
            if db.lower() in sentence_text.lower():
                verified_databases.append(db)
    
    verified_databases = list(set(verified_databases))
    return len(verified_databases)


def extract_software_development_methodologies(cv_text):
    methodologies = [
        'Agile', 'Scrum', 'Kanban', 'Waterfall', 'Lean', 
        'Extreme Programming (XP)', 'DevOps', 'Spiral', 'RAD', 
        'V-Model', 'Incremental Development', 'Iterative Development', 
        'Prototyping'
    ]

    pattern = re.compile(r'\b(?:' + '|'.join(re.escape(method) for method in methodologies) + r')\b', re.IGNORECASE)

    found_methodologies = pattern.findall(cv_text)

    return len(list(dict.fromkeys(found_methodologies)))




technology_categories = {
    'Databases': ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'Oracle', 'SQL Server', 'Firebase', 'DynamoDB', 'Redis'],
    'Programming Languages': ['Python', 'Java', 'C', 'C++', 'C#', 'JavaScript', 'Ruby', 'Go', 'Swift', 'Kotlin', 'PHP'],
    'Frameworks': ['React', 'Angular', 'Django', 'Flask', 'Spring', 'Laravel', 'Vue.js', 'TensorFlow', 'Keras', 'PyTorch'],
    'DevOps Tools': ['Docker', 'Kubernetes', 'Git', 'Jenkins', 'Ansible', 'Terraform', 'CI/CD', 'Grafana', 'Prometheus'],
    'Cloud Platforms': ['AWS', 'Azure', 'Google Cloud', 'Firebase', 'Heroku', 'DigitalOcean', 'Cloudflare'],
    'Version Control': ['Git', 'SVN', 'Bitbucket', 'GitHub', 'GitLab', 'Mercurial'],
    'Software Development Methodologies': ['Agile', 'Scrum', 'Kanban', 'Waterfall', 'DevOps', 'TDD', 'BDD'],
    'Software Architectures': ['Microservices', 'Monolithic', 'Serverless', 'Event-driven', 'Layered', 'MVC'],
}

# Function to extract technologies and their counts
def extract_technologies(text, category):
    extracted = {tech: 0 for tech in technology_categories[category]}  # Ensure all technologies are represented
    pattern = re.compile(r'\b(' + '|'.join(map(re.escape, technology_categories[category])) + r')\b', re.IGNORECASE)
    matches = pattern.findall(text)
    counts = Counter(matches)
    
    for tech in extracted.keys():
        extracted[tech] = counts.get(tech, 0)
    
    return extracted

# Function to generate and return base64-encoded chart
def generate_chart(technologies, title):
    if not technologies:
        return None
    
    labels = list(technologies.keys())
    counts = list(technologies.values())
    
    colors = ["#" + ''.join(random.choices('0123456789ABCDEF', k=6)) for _ in labels]
    
    plt.figure(figsize=(12, 6))
    plt.barh(labels, counts, color=colors)
    plt.xlabel('Frequency')
    plt.ylabel(title)
    plt.title(f'{title} Distribution')
    plt.xticks(range(max(counts) + 1))
    plt.grid(axis='x', linestyle='--', alpha=0.7)
    plt.tight_layout()
    
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    plt.close()
    
    return base64.b64encode(buffer.getvalue()).decode('utf-8')

# Function to generate and store all charts
def generate_all_charts(cv_text):
    charts = {}
    
    for category in technology_categories.keys():
        extracted = extract_technologies(cv_text, category)
        charts[category] = {
            'data': extracted,
            'chart': generate_chart(extracted, category)
        }
    
    return charts




# ── model (load once) ──────────────────────────────────────────────────────────
# _nlp = spacy.load("en_core_web_sm")

# # ── util regexes & helpers ─────────────────────────────────────────────────────
# _ICON_RE   = re.compile(r"[\uE000-\uF8FF\u2600-\u26FF]")   # icons / dingbats
# _EMPTY_RE  = re.compile(r"^\s*$")
# _YEAR_RE   = re.compile(r"\b(19|20)\d{2}\b")

# def _clean(txt: str) -> str:
#     """strip icons & normalise newlines (any run of ≥2 blank lines → one blank)."""
#     txt = _ICON_RE.sub("", unicodedata.normalize("NFKD", txt))
#     txt = re.sub(r"\n[ \t]*\n[ \t]*\n+", "\n\n", txt)
#     return txt.strip()

# def _blockify(txt: str):
#     """
#     Split into logical blocks separated by *at least one completely blank line*.
#     Keeps intra-block newlines.
#     """
#     buff, blocks = [], []
#     for line in txt.splitlines():
#         if _EMPTY_RE.match(line):
#             if buff:
#                 blocks.append("\n".join(buff).strip())
#                 buff = []
#         else:
#             buff.append(line.rstrip())
#     if buff:
#         blocks.append("\n".join(buff).strip())
#     return blocks

# # main keyword pools
# _PROJ_KW = (
#     "project", "application", "system", "platform",
#     "website", "mobile application", "management", "gateway",
#     "designed", "developed", "built", "engineered", "created",
# )
# _WORK_KW = (
#     "intern", "engineer", "developer", "manager", "analyst",
#     "consultant", "lead", "architect", "responsibilities",
# )
# _COURSE_KW = (
#     "course", "certification", "training", "workshop",
#     "nanodegree", "specialization", "diploma",
# )
# _ACH_KW = (
#     "achievement", "award", "recognition", "honor",
#     "winner", "finalist", "scholarship", "grant", "published",
#     "best employee", "top performer",
# )
# _TOOLS_PHRASE = "tools and technologies"

# # small helper: count how many kw appear
# def _score(kws, text):
#     lo = text.lower()
#     return sum(1 for k in kws if k in lo)

# def _classify(block: str) -> str | None:
#     """Return 'project' | 'work' | 'course' | 'achievement' | None."""
#     lo = block.lower()

#     # explicit headers trump everything
#     if lo.startswith(("work experience", "employment history")):
#         return "work"
#     if lo.startswith("technical projects") or lo.startswith("projects"):
#         return "project"

#     p, w, c, a = (_score(_PROJ_KW, lo), _score(_WORK_KW, lo),
#                   _score(_COURSE_KW, lo), _score(_ACH_KW, lo))

#     # distinguishing logic
#     if p >= 2 or _TOOLS_PHRASE in lo:
#         return "project"
#     if w >= 2 and _YEAR_RE.search(block):
#         return "work"
#     if c:
#         return "course"
#     if a:
#         return "achievement"
#     return None

# # ── public extractors (same signatures) ────────────────────────────────────────
# def extract_project_experiences(cv_text):
#     txt = _clean(cv_text)
#     blocks = _blockify(txt)
#     projects, seen = [], set()

#     for b in blocks:
#         if _classify(b) == "project" and len(b.split()) > 5:
#             key = b[:90].lower()
#             if key not in seen:
#                 projects.append(b)
#                 seen.add(key)
#     return projects


# def extract_courses_certifications_achievements(cv_text):
#     txt = _clean(cv_text)
#     blocks = _blockify(txt)
#     out = []

#     for b in blocks:
#         label = _classify(b)
#         if label == "course":
#             out.append({"type": "Courses/Certifications", "content": b})
#         elif label == "achievement":
#             out.append({"type": "Achievements", "content": b})
#     return out


# def extract_work_experience(cv_text):
#     txt = _clean(cv_text)
#     blocks = _blockify(txt)
#     work, seen = [], set()

#     for b in blocks:
#         if _classify(b) == "work":
#             key = b[:90].lower()
#             if key not in seen:
#                 work.append(b)
#                 seen.add(key)
#     return work


# def extract_achievements(cv_text):
#     """
#     Stand-alone achievement sentences *outside* any Achievements block are also caught.
#     """
#     txt = _clean(cv_text)
#     blocks = _blockify(txt)
#     ach = set()

#     # 1) blocks already tagged as achievements
#     for b in blocks:
#         if _classify(b) == "achievement":
#             ach.add(b)

#     # 2) isolated sentences (fallback)
#     doc = _nlp(txt)
#     for sent in doc.sents:
#         s = sent.text.strip()
#         if _score(_ACH_KW, s.lower()) and len(s.split()) > 3:
#             ach.add(s)

#     return list(ach)




# import re, unicodedata
# import spacy

# _nlp = spacy.load("en_core_web_sm")

# # ── helpers ────────────────────────────────────────────────────
# _ICON_RE  = re.compile(r"[\uE000-\uF8FF\u2600-\u26FF]")      # icons
# _MULTI_NL = re.compile(r"\n[ \t]*\n[ \t]*\n+")                # ≥2 blank lines → 1
# _YEAR_RE  = re.compile(r"\b(19|20)\d{2}\b")

# def _clean(txt: str) -> str:
#     txt = _ICON_RE.sub("", unicodedata.normalize("NFKD", txt))
#     return _MULTI_NL.sub("\n\n", txt).strip()

# def _blocks(txt: str):
#     """Split on genuine blank-line boundaries."""
#     tmp, out = [], []
#     for ln in txt.splitlines():
#         if not ln.strip():
#             if tmp:
#                 out.append("\n".join(tmp).strip())
#                 tmp = []
#         else:
#             tmp.append(ln.rstrip())
#     if tmp:
#         out.append("\n".join(tmp).strip())
#     return out

# def _kw_count(kws, text):            # quick keyword score
#     lo = text.lower()
#     return sum(1 for k in kws if k in lo)

# # keyword pools
# _PROJ_KW = ("project", "application", "system", "platform",
#             "website", "gateway", "designed", "developed", "built")
# _WORK_KW = ("intern", "engineer", "developer", "manager", "analyst",
#             "consultant", "lead", "architect")
# _COURSE_KW = ("course", "certification", "training", "workshop",
#               "nanodegree", "specialization", "diploma")
# _ACH_KW = ("achievement", "award", "recognition", "honor",
#            "winner", "finalist", "scholarship", "grant", "published",
#            "best employee", "top performer")

# _TOOLS_PH = "tools and technologies"

# # ── 1 · PROJECTS ───────────────────────────────────────────────
# def extract_project_experiences(cv_text: str):
#     txt = _clean(cv_text)
#     out, seen = [], set()
#     for blk in _blocks(txt):
#         lo = blk.lower()
#         if (_kw_count(_PROJ_KW, lo) >= 2 or _TOOLS_PH in lo) and not _kw_count(_COURSE_KW + _ACH_KW, lo):
#             sig = lo[:90]
#             if sig not in seen and len(blk.split()) > 5:
#                 out.append(blk)
#                 seen.add(sig)
#     return out

# # ── 2 · COURSES / ACHIEVEMENTS ────────────────────────────────
# def extract_courses_certifications_achievements(cv_text: str):
#     txt = _clean(cv_text)
#     buckets = []
#     for blk in _blocks(txt):
#         lo = blk.lower()
#         if _kw_count(_COURSE_KW, lo) and not _kw_count(_PROJ_KW + _WORK_KW, lo):
#             buckets.append({"type": "Courses/Certifications", "content": blk})
#         elif _kw_count(_ACH_KW, lo) and not _TOOLS_PH in lo:
#             buckets.append({"type": "Achievements", "content": blk})
#     return buckets

# # ── 3 · WORK EXPERIENCE ───────────────────────────────────────
# def _pull_work_blocks(txt: str):
#     """
#     Special routine that yanks any chunk that *starts* with
#     'WORK EXPERIENCE' (even if the string is glued to company name).
#     """
#     pattern = re.compile(
#         r"(?i)(work experience|employment history|professional experience).*?"
#         r"(?=\n\s*\n|$)", re.S)
#     return [m.group(0).strip() for m in pattern.finditer(txt)]

# def extract_work_experience(cv_text: str):
#     txt = _clean(cv_text)
#     work = set(_pull_work_blocks(txt))                     # 1. explicit header blocks

#     # 2. standalone job paragraphs (date + job-title words)
#     for blk in _blocks(txt):
#         lo = blk.lower()
#         if _kw_count(_WORK_KW, lo) and _YEAR_RE.search(blk):
#             if not _TOOLS_PH in lo:                        # avoid pure project blurbs
#                 work.add(blk)
#     return list(work)

# # ── 4 · ACHIEVEMENTS  (fine-grained) ──────────────────────────
# def extract_achievements(cv_text: str):
#     txt = _clean(cv_text)
#     ach = set()

#     # (a) any block already tagged as achievements
#     for obj in extract_courses_certifications_achievements(txt):
#         if obj["type"] == "Achievements":
#             ach.add(obj["content"])

#     # (b) individual sentences elsewhere
#     doc = _nlp(txt)
#     for s in (sent.text.strip() for sent in doc.sents):
#         if _kw_count(_ACH_KW, s.lower()) and not _TOOLS_PH in s.lower():
#             ach.add(s)
#     return list(ach)







# import re, unicodedata
# import spacy

# _nlp = spacy.load("en_core_web_sm")

# # ── regex helpers ─────────────────────────────────────────────
# ICON_RE   = re.compile(r"[\u2600-\u26FF\uE000-\uF8FF]")      # dingbats & private-use
# MULTI_NL  = re.compile(r"\n[ \t]*\n[ \t]*\n+")               # ≥2 consecutive blanks
# YEAR_RE   = re.compile(r"\b(19|20)\d{2}\b")

# # generic “company marker” (Ltd, PLC, Bank, Inc, Pvt, etc.)
# COMPANY_RE = re.compile(
#     r"\b(?:ltd|plc|inc|llc|pvt|company|corporation|corp|bank|solutions)\b", re.I
# )

# def _clean(t: str) -> str:
#     t = ICON_RE.sub("", unicodedata.normalize("NFKD", t))
#     return MULTI_NL.sub("\n\n", t).strip()

# def _blocks(t: str):
#     buf, out = [], []
#     for ln in t.splitlines():
#         if not ln.strip():
#             if buf:
#                 out.append("\n".join(buf).strip())
#                 buf = []
#         else:
#             buf.append(ln.rstrip())
#     if buf:
#         out.append("\n".join(buf).strip())
#     return out

# def _kw(kws, txt):                          # keyword score
#     lo = txt.lower()
#     return sum(1 for k in kws if k in lo)

# # keyword pools
# PROJ_KW   = ("project", "application", "system", "platform",
#              "website", "gateway", "designed", "developed", "built")
# WORK_KW   = ("intern", "engineer", "developer", "manager",
#              "analyst", "consultant", "lead", "architect")
# COURSE_KW = ("course", "certification", "training", "workshop",
#              "nanodegree", "specialization", "diploma")
# ACH_KW    = ("achievement", "award", "recognition", "honor",
#              "winner", "finalist", "scholarship", "grant", "published",
#              "best employee", "top performer")

# TOOLS_PH  = "tools and technologies"

# # ── 1 · PROJECTS ────────────────────────────────────────────
# def extract_project_experiences(cv_text: str):
#     txt, seen, out = _clean(cv_text), set(), []
#     for blk in _blocks(txt):
#         lo = blk.lower()
#         if (_kw(PROJ_KW, lo) >= 2 or TOOLS_PH in lo) and not _kw(COURSE_KW + ACH_KW, lo):
#             sig = lo[:100]
#             if sig not in seen and len(blk.split()) > 5:
#                 out.append(blk)
#                 seen.add(sig)
#     return out

# # ── 2 · COURSES / ACHIEVEMENTS ────────────────────────────
# def extract_courses_certifications_achievements(cv_text: str):
#     txt, buckets = _clean(cv_text), []
#     for blk in _blocks(txt):
#         lo = blk.lower()
#         if _kw(COURSE_KW, lo) and not _kw(PROJ_KW + WORK_KW, lo):
#             buckets.append({"type": "Courses/Certifications", "content": blk})
#         elif _kw(ACH_KW, lo) and TOOLS_PH not in lo:
#             buckets.append({"type": "Achievements", "content": blk})
#     return buckets

# # ── 3 · WORK EXPERIENCE ───────────────────────────────────
# def extract_work_experience(cv_text: str):
#     txt = _clean(cv_text)
#     work = set()

#     # 3-A  explicit “WORK EXPERIENCE…” blocks (catch glued heading)
#     for m in re.finditer(r"(?i)work experience.*?(?=\n\s*\n|$)", txt, re.S):
#         work.add(m.group(0).strip())

#     # 3-B  any other block with:
#     #      – a year range/date
#     #      – AND (job-title kw  OR  company marker)
#     for blk in _blocks(txt):
#         lo = blk.lower()
#         if YEAR_RE.search(blk):
#             if _kw(WORK_KW, lo) >= 1 or COMPANY_RE.search(blk):
#                 if TOOLS_PH not in lo and not _kw(COURSE_KW + ACH_KW, lo):
#                     work.add(blk)
#     return list(work)

# # ── 4 · ACHIEVEMENTS (fine) ───────────────────────────────
# def extract_achievements(cv_text: str):
#     txt = _clean(cv_text)
#     ach = set(a["content"] for a in extract_courses_certifications_achievements(txt)
#               if a["type"] == "Achievements")

#     # fallback: sentences anywhere with award words
#     for sent in _nlp(txt).sents:
#         s = sent.text.strip()
#         if _kw(ACH_KW, s.lower()) and TOOLS_PH not in s.lower() and len(s.split()) > 3:
#             ach.add(s)
#     return list(ach)





# import re, unicodedata, itertools
# import spacy

# _nlp = spacy.load("en_core_web_sm")

# # ╭────────────────────────────── helpers ──────────────────────────────╮
# ICON_RE      = re.compile(r"[\u2600-\u26FF\uE000-\uF8FF]")        # dingbats / PUAs
# MULTI_NL_RE  = re.compile(r"\n[ \t]*\n[ \t]*\n+")                 # >2 blank lines
# YEAR_RE      = re.compile(r"\b(19|20)\d{2}\b")
# COMPANY_RE   = re.compile(r"\b(ltd|plc|inc|llc|pvt|bank|corp|consult(|ing)|solutions)\b", re.I)

# # master keyword banks (tune freely)
# PROJ_KW   = ("project", "application", "system", "platform", "website",
#              "gateway", "designed", "developed", "built", "implementation")
# WORK_KW   = ("intern", "engineer", "developer", "manager", "analyst",
#              "consultant", "lead", "architect", "officer")
# COURSE_KW = ("course", "certification", "certified", "training",
#              "workshop", "nanodegree", "specialization", "diploma")
# ACH_KW    = ("achievement", "award", "honor", "winner", "finalist",
#              "scholarship", "grant", "medal", "prize", "ranked")
# TOOLS_PH  = "tools and technologies"

# def _clean(text: str) -> str:
#     text = ICON_RE.sub("", unicodedata.normalize("NFKD", text))
#     return MULTI_NL_RE.sub("\n\n", text).strip()

# def _keyword_score(words: tuple[str, ...], text: str) -> int:
#     lo = text.lower()
#     return sum(w in lo for w in words)

# # ╭──────────────── sectioniser (phase 1) ─────────────────╮
# HEADER_RE = re.compile(r"^[A-Z][A-Z0-9\s/&.\-]{2,}$")     # ALL-CAPS line

# def _sections(text: str) -> list[tuple[str, str]]:
#     """
#     Returns [(header, body)]   — if line is not a header we use ''.
#     """
#     lines = [ln.rstrip() for ln in text.splitlines()]
#     sections: list[tuple[str, list[str]]] = []
#     cur_header, cur_body = "", []

#     for ln in lines + [""]:                               # sentinel
#         if HEADER_RE.match(ln) or ln == "":
#             if cur_body:
#                 sections.append((cur_header, cur_body))
#                 cur_body = []
#             cur_header = ln
#         else:
#             cur_body.append(ln)
#     return [(h, "\n".join(b).strip()) for h, b in sections if b]

# # ╭──────────────── phase 2  –  bucket filters ─────────────────╮
# def extract_project_experiences(cv_text: str) -> list[str]:
#     txt = _clean(cv_text)
#     projects: list[str] = []
#     seen = set()

#     for hdr, body in _sections(txt):
#         block = f"{hdr}\n{body}" if hdr else body
#         lo = block.lower()
#         if (_keyword_score(PROJ_KW, lo) >= 2 or TOOLS_PH in lo) \
#            and not (_keyword_score(COURSE_KW+ACH_KW, lo)):
#             sig = lo[:120]
#             if sig not in seen and len(block.split()) > 5:
#                 projects.append(block)
#                 seen.add(sig)
#     return projects


# def extract_courses_certifications_achievements(cv_text: str) -> list[dict]:
#     txt = _clean(cv_text)
#     results = []

#     for hdr, body in _sections(txt):
#         block = f"{hdr}\n{body}" if hdr else body
#         lo = block.lower()

#         if _keyword_score(COURSE_KW, lo) and not _keyword_score(PROJ_KW+WORK_KW, lo):
#             results.append({"type": "Courses/Certifications", "content": block})
#         elif _keyword_score(ACH_KW, lo) and TOOLS_PH not in lo:
#             results.append({"type": "Achievements", "content": block})
#     return results


# def extract_work_experience(cv_text: str) -> list[str]:
#     txt = _clean(cv_text)
#     work: list[str] = []
#     seen = set()

#     # A) explicit WORK EXPERIENCE headings
#     for hdr, body in _sections(txt):
#         if hdr.lower().startswith(("work experience", "employment history", "professional experience")):
#             block = f"{hdr}\n{body}".strip()
#             sig = block.lower()[:120]
#             if sig not in seen:
#                 work.append(block)
#                 seen.add(sig)

#     # B) generic blocks with date + (job-kw | company marker)
#     for hdr, body in _sections(txt):
#         block = f"{hdr}\n{body}" if hdr else body
#         lo = block.lower()
#         if YEAR_RE.search(block) and not _keyword_score(COURSE_KW+ACH_KW, lo):
#             if _keyword_score(WORK_KW, lo) or COMPANY_RE.search(block):
#                 if TOOLS_PH not in lo:
#                     sig = lo[:120]
#                     if sig not in seen and len(block.split()) > 5:
#                         work.append(block)
#                         seen.add(sig)
#     return work


# def extract_achievements(cv_text: str) -> list[str]:
#     txt = _clean(cv_text)
#     ach: list[str] = []

#     # 1) any block tagged as achievements by previous function
#     ach_blocks = {d["content"] for d in extract_courses_certifications_achievements(txt)
#                   if d["type"] == "Achievements"}
#     ach.extend(ach_blocks)

#     # 2) standalone sentences (fallback)
#     for sent in _nlp(txt).sents:
#         s = sent.text.strip()
#         if _keyword_score(ACH_KW, s.lower()) and TOOLS_PH not in s.lower() \
#            and len(s.split()) > 3:
#             ach.append(s)
#     # de-dup preserving order
#     seen = set(); uniq = []
#     for a in ach:
#         if a not in seen:
#             uniq.append(a)
#             seen.add(a)
#     return uniq


# import re
# from typing import List, Dict
# import spacy

# # ─────────────────────────────────────────────────────────────
# #  Helpers
# # ─────────────────────────────────────────────────────────────
# nlp = spacy.load("en_core_web_sm")

# # headings that start a *new* high-level section in most résumés
# _SECTION_BREAKERS = {
#     "education", "skills", "technical skills", "languages", "interests", "hobbies",
#     "references", "referees", "contact", "profile", "summary", "objective",
#     "publications", "volunteering", "volunteer", "extra-curricular"
# }

# def _is_section_break(line: str) -> bool:
#     """
#     Rough test whether this line looks like a high-level heading
#     (ALL CAPS or Title Case + very short) that should stop the
#     current capture block.
#     """
#     l = line.strip()
#     if len(l) > 60:
#         return False
#     plain = re.sub(r"[^A-Za-z ]", "", l).lower().strip()
#     return plain in _SECTION_BREAKERS or l.isupper()


# def _dedupe(seq: List[str]) -> List[str]:
#     seen, out = set(), []
#     for item in seq:
#         key = item.strip().lower()
#         if key and key not in seen:
#             seen.add(key)
#             out.append(item.strip())
#     return out


# def _capture_by_heading(cv_text: str,
#                         heading_keywords: List[str],
#                         min_words: int = 4) -> List[str]:
#     """
#     Generic routine:  find each heading (e.g. “Projects”) and
#     pull the lines that follow until the next major heading or
#     blank line block.
#     """
#     lines = cv_text.splitlines()
#     blocks, current = [], []
#     capture = False

#     for raw in lines:
#         line = raw.rstrip()

#         # Does this line start a new block we care about?
#         lower = line.lower().strip()
#         if any(k in lower for k in heading_keywords):
#             # Finish a previous capture, if any
#             if current:
#                 blocks.append("\n".join(current).strip())
#                 current = []
#             capture = True
#             continue

#         # Stop capturing if we meet another high-level heading
#         if capture and (_is_section_break(line) or not line.strip()):
#             if current:
#                 blocks.append("\n".join(current).strip())
#                 current = []
#             capture = False
#             continue

#         if capture:
#             current.append(line)

#     # flush last block
#     if current:
#         blocks.append("\n".join(current).strip())

#     # minimal length filter
#     return [b for b in blocks if len(b.split()) >= min_words]


# def _find_bullets_matching(cv_text: str,
#                            include_kw: List[str],
#                            exclude_kw: List[str] = None,
#                            min_words: int = 4) -> List[str]:
#     """
#     Scan every line (and its immediate follower lines) for keyword hits
#     outside a clearly marked section (useful when people scatter info
#     without headings).
#     """
#     if exclude_kw is None:
#         exclude_kw = []
#     lines = cv_text.splitlines()
#     hits = []

#     i = 0
#     while i < len(lines):
#         line = lines[i].strip()
#         lower = line.lower()
#         if any(k in lower for k in include_kw) and not any(k in lower for k in exclude_kw):
#             # capture this line and maybe the next 2–3 if they look like the same bullet
#             block = [line]
#             j = i + 1
#             while j < len(lines) and lines[j].strip() and not _is_section_break(lines[j]):
#                 # stop if the follow-up is *clearly* a new bullet (e.g. begins with “•” etc.)
#                 if re.match(r"^[\u2022•\-–]", lines[j].lstrip()):
#                     break
#                 block.append(lines[j].strip())
#                 j += 1
#             if len(" ".join(block).split()) >= min_words:
#                 hits.append(" ".join(block))
#             i = j
#         else:
#             i += 1
#     return hits


# # ─────────────────────────────────────────────────────────────
# # 1. Project Experience
# # ─────────────────────────────────────────────────────────────
# def extract_project_experiences(cv_text: str) -> List[str]:
#     """
#     Return a list[str].  Each string describes ONE project
#     (≥ 5 words).  Filters out obvious non-project content.
#     """
#     heading_blocks = _capture_by_heading(
#         cv_text,
#         heading_keywords=[
#             "project",          # matches “Projects”, “Technical Projects”, etc.
#             "technical project",
#             "side project"
#         ]
#     )

#     # ad-hoc bullets with “developed … application / system / project …”
#     bullet_blocks = _find_bullets_matching(
#         cv_text,
#         include_kw=["project", "application", "system", "platform", "app", "developed"],
#         exclude_kw=["experience", "award", "course", "certification", "internship"]
#     )

#     raw_projects = heading_blocks + bullet_blocks
#     return _dedupe(raw_projects)


# # ─────────────────────────────────────────────────────────────
# # 2. Courses & Certifications
# # ─────────────────────────────────────────────────────────────
# def extract_courses_certifications_achievements(cv_text: str) -> List[Dict[str, str]]:
#     """
#     **Only** formal courses, trainings, workshops, certifications.
#     Returns  List[{'type': 'Courses/Certifications', 'content': string}]
#     """
#     heading_blocks = _capture_by_heading(
#         cv_text,
#         heading_keywords=["certification", "course", "training", "workshop", "license"]
#     )

#     bullet_blocks = _find_bullets_matching(
#         cv_text,
#         include_kw=[
#             "certificate", "certification", "certified",
#             "course", "training", "workshop", "bootcamp"
#         ],
#         exclude_kw=["award", "achievement", "honor", "project", "experience"]
#     )

#     combined = _dedupe(heading_blocks + bullet_blocks)

#     return [
#         {"type": "Courses/Certifications", "content": item}
#         for item in combined
#     ]


# # ─────────────────────────────────────────────────────────────
# # 3. Work Experience
# # ─────────────────────────────────────────────────────────────
# def extract_work_experience(cv_text: str) -> List[str]:
#     """
#     Returns list[str] – each describing a job / role.
#     Filters out project-only items, courses, etc.
#     """
#     heading_blocks = _capture_by_heading(
#         cv_text,
#         heading_keywords=[
#             "work experience", "experience", "employment", "professional experience",
#             "career history", "internship", "intern", "positions"
#         ]
#     )

#     # standalone bullets that contain a company + date pattern
#     date_pattern = r"\b(20\d{2}|19\d{2})"
#     lines = cv_text.splitlines()
#     bullet_like = []
#     current = []

#     for line in lines:
#         l = line.strip()
#         if re.search(date_pattern, l) and ("intern" in l.lower() or "engineer" in l.lower()
#                                            or "developer" in l.lower() or "manager" in l.lower()):
#             if current:
#                 bullet_like.append(" ".join(current))
#                 current = []
#             current.append(l)
#         elif current and not _is_section_break(l) and l:
#             current.append(l)
#         else:
#             if current:
#                 bullet_like.append(" ".join(current))
#                 current = []

#     if current:
#         bullet_like.append(" ".join(current))

#     combined = _dedupe(heading_blocks + bullet_like)
#     # filter out phrases that obviously belong elsewhere
#     valid = [b for b in combined if not any(k in b.lower()
#                                             for k in ("certificate", "course", "award", "achievement"))]
#     return valid


# # ─────────────────────────────────────────────────────────────
# # 4. Achievements / Awards
# # ─────────────────────────────────────────────────────────────
# def extract_achievements(cv_text: str) -> List[str]:
#     """
#     Returns list[str] of notable awards / honors.
#     """
#     heading_blocks = _capture_by_heading(
#         cv_text,
#         heading_keywords=["achievement", "awards", "honor", "accomplishment", "distinction"]
#     )

#     # sentence-level scan using a curated keyword list
#     achievement_keywords = {
#         "achievement", "accomplishment", "award", "recognition", "honor",
#         "winner", "finalist", "ranked", "scholarship", "grant", "medal",
#         "best", "top", "prize", "distinction"
#     }

#     doc = nlp(cv_text)
#     sent_hits = []
#     for sent in doc.sents:
#         s = sent.text.strip()
#         if len(s) < 15:
#             continue
#         lower = s.lower()
#         if any(k in lower for k in achievement_keywords):
#             sent_hits.append(s)

#     combined = _dedupe(heading_blocks + sent_hits)

#     # final filter to avoid false positives like “Best practices”
#     final = [s for s in combined
#              if not re.search(r"\b(best practices?|job|project|experience)\b", s, re.I)]
#     return final


# from typing import List, Dict
# import spacy

# # ─────────────────────────────────────────────────────────────
# #  Helpers
# # ─────────────────────────────────────────────────────────────
# nlp = spacy.load("en_core_web_sm")

# # Headings we treat as hard section breaks
# _SECTION_BREAKERS = {
#     "professional experience", "work experience", "experience", "employment",
#     "career history", "projects", "selected projects", "project portfolio",
#     "achievements", "achievements & honors", "honors", "awards", "accomplishments",
#     "courses", "courses & certifications", "certifications", "training",
#     "education", "skills", "technical skills", "languages", "interests", "hobbies",
#     "references", "referees", "summary", "objective", "profile", "publications",
#     "volunteering", "volunteer", "extra-curricular"
# }

# # ↑ Hyphen escaped so it is treated as a literal, not set difference
# _HEADING_LINE = re.compile(r"^[A-Z][A-Za-z0-9 &/\-]{0,60}$")   # ALL-CAP or Title-Case line

# def _is_section_heading(line: str) -> bool:
#     """
#     Return True if the line looks like a high-level section heading.
#     """
#     clean = line.strip()
#     if len(clean) > 70:
#         return False
#     plain = re.sub(r"[^A-Za-z &]", "", clean).lower().strip()
#     return plain in _SECTION_BREAKERS or (_HEADING_LINE.match(clean) and not clean.endswith("."))

# def _dedupe(items: List[str]) -> List[str]:
#     seen, out = set(), []
#     for itm in items:
#         key = re.sub(r"\s+", " ", itm.strip().lower())
#         if key and key not in seen:
#             seen.add(key)
#             out.append(itm.strip())
#     return out

# def _capture_block_after_heading(cv_text: str,
#                                  wanted_headings: List[str],
#                                  min_words: int = 5) -> List[str]:
#     """
#     Grab the paragraph lines that belong to the wanted section(s).
#     Stop at the next section heading or a big blank spacer.
#     """
#     wanted = {h.lower() for h in wanted_headings}
#     lines = cv_text.splitlines()
#     blocks, buf, capture = [], [], False

#     for raw in lines:
#         line = raw.rstrip()
#         plain = re.sub(r"[^A-Za-z &]", "", line).lower().strip()

#         # Start capturing?
#         if not capture and plain in wanted:
#             capture = True
#             continue

#         # If capturing, check for termination
#         if capture and (_is_section_heading(line) or not line.strip()):
#             if buf:
#                 para = "\n".join(buf).strip()
#                 if len(para.split()) >= min_words:
#                     blocks.append(para)
#                 buf = []
#             capture = False
#             continue

#         if capture:
#             buf.append(line)

#     if buf:
#         para = "\n".join(buf).strip()
#         if len(para.split()) >= min_words:
#             blocks.append(para)

#     return blocks

# def _scan_sentences(cv_text: str,
#                     include_kw: List[str],
#                     exclude_kw: List[str] = None,
#                     min_words: int = 5) -> List[str]:
#     """
#     Sentence-level scan searching for include keywords and
#     *not* containing any exclude keywords.
#     """
#     if exclude_kw is None:
#         exclude_kw = []
#     inc = tuple(k.lower() for k in include_kw)
#     exc = tuple(k.lower() for k in exclude_kw)
#     hits = []
#     for sent in nlp(cv_text).sents:
#         s = sent.text.strip()
#         lower = s.lower()
#         if any(k in lower for k in inc) and not any(e in lower for e in exc):
#             if len(s.split()) >= min_words:
#                 hits.append(s)
#     return hits

# # ─────────────────────────────────────────────────────────────
# # 1. Project Experience
# # ─────────────────────────────────────────────────────────────
# def extract_project_experiences(cv_text: str) -> List[str]:
#     section_blocks = _capture_block_after_heading(
#         cv_text,
#         ["projects", "selected projects", "project portfolio"]
#     )

#     sentence_hits = _scan_sentences(
#         cv_text,
#         include_kw=["project", "system", "application", "platform", "tool"],
#         exclude_kw=["award", "certificate", "course", "experience"]
#     )

#     return _dedupe(section_blocks + sentence_hits)

# # ─────────────────────────────────────────────────────────────
# # 2. Courses & Certifications   **ONLY courses / certs**
# # ─────────────────────────────────────────────────────────────
# def extract_courses_certifications_achievements(cv_text: str) -> List[Dict[str, str]]:
#     section_blocks = _capture_block_after_heading(
#         cv_text,
#         ["courses & certifications", "certifications", "courses", "training", "licenses"]
#     )

#     sentence_hits = _scan_sentences(
#         cv_text,
#         include_kw=["certificate", "certification", "certified", "course", "workshop", "bootcamp"],
#         exclude_kw=["award", "achievement", "honor"],
#     )

#     combined = _dedupe(section_blocks + sentence_hits)
#     return [{"type": "Courses/Certifications", "content": block} for block in combined]

# # ─────────────────────────────────────────────────────────────
# # 3. Work Experience
# # ─────────────────────────────────────────────────────────────
# def extract_work_experience(cv_text: str) -> List[str]:
#     section_blocks = _capture_block_after_heading(
#         cv_text,
#         ["professional experience", "work experience", "experience", "employment", "career history"]
#     )

#     # Additionally, detect role lines with dates (YYYY or MMM YYYY) that
#     # are not inside the “Projects” or “Achievements” sections.
#     role_pattern = re.compile(r"\b(19|20)\d{2}\b")
#     work_hits = []
#     for block in section_blocks:
#         work_hits.append(block)

#     # Sentence-scan fallback
#     sentences = _scan_sentences(
#         cv_text,
#         include_kw=["engineer", "developer", "manager", "architect", "intern"],
#         exclude_kw=["project", "award", "certificate", "course"]
#     )
#     # Keep only those with a date in them
#     sentences = [s for s in sentences if role_pattern.search(s)]
#     work_hits.extend(sentences)

#     return _dedupe(work_hits)

# # ─────────────────────────────────────────────────────────────
# # 4. Achievements / Awards
# # ─────────────────────────────────────────────────────────────
# def extract_achievements(cv_text: str) -> List[str]:
#     section_blocks = _capture_block_after_heading(
#         cv_text,
#         ["achievements", "achievements & honors", "honors", "awards", "accomplishments"]
#     )

#     achievement_kw = [
#         "award", "winner", "ranked", "recognition", "honor", "prize",
#         "medal", "scholarship", "top", "certificate of merit", "finalist"
#     ]
#     sent_hits = _scan_sentences(
#         cv_text,
#         include_kw=achievement_kw,
#         exclude_kw=["course", "project", "experience", "certificate"]
#     )

#     return _dedupe(section_blocks + sent_hits)

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
    "projects", "technical projects", "side projects", "academic projects", "project experience",
    "research projects", "industry based project",
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

# def _find_bullets_matching(cv_text: str,
#                            include_kw: List[str],
#                            exclude_kw: List[str] = None,
#                            min_words: int = 4) -> List[str]:
#     """
#     Look for single-line bullets with include words and no exclude words.
#     """
#     if exclude_kw is None:
#         exclude_kw = []
#     lines, hits, i = cv_text.splitlines(), [], 0

    

#     while i < len(lines):
#         line = lines[i].strip()
#         lower = line.lower()
#         if any(k in lower for k in include_kw) and not any(k in lower for k in exclude_kw):
#             block = [line]
#             j = i + 1
#             while (j < len(lines) and lines[j].strip()
#                    and not _is_section_break(lines[j])
#                    and not re.match(r"^[\u2022•\-–]", lines[j].lstrip())):
#                 block.append(lines[j].strip())
#                 j += 1
#             if len(" ".join(block).split()) >= min_words:
#                 hits.append(" ".join(block))
#             i = j
#         else:
#             i += 1
#     return hits

def _find_bullets_matching(cv_text: str,
                           include_kw: List[str],
                           exclude_kw: List[str] = None,
                           min_words: int = 4) -> List[str]:
    """
    Look for single-line bullets that contain *any* include_kw and *no* exclude_kw.
    """
    if exclude_kw is None:
        exclude_kw = []
    lines, hits, i = cv_text.splitlines(), [], 0

    # pre-compile for speed
    inc_re = re.compile("|".join([re.escape(k.lower()) for k in include_kw]))
    exc_re = re.compile("|".join([re.escape(k.lower()) for k in exclude_kw])) if exclude_kw else None

    while i < len(lines):
        line_raw = lines[i]
        line = line_raw.lstrip("•–—-•* ").strip()           # drop leading bullet/dash
        lower = line.lower()

        if (inc_re.search(lower) and not (exc_re and exc_re.search(lower))):
            block = [line.strip()]
            j = i + 1
            while (j < len(lines) and lines[j].strip()
                   and not _is_section_break(lines[j])
                   and not re.match(r"^[\u2022•\-–—*]", lines[j].lstrip())):
                block.append(lines[j].strip())
                j += 1
            if len(" ".join(block).split()) >= min_words:
                hits.append(" ".join(block))
            i = j
        else:
            i += 1
    return hits


# # ─────────────────────────────────────────────────────────────
# #  New helper: split a “Professional Experience” block
# #  into per-job chunks (role + bullets)
# # ─────────────────────────────────────────────────────────────
# _JOB_HEADER = re.compile(
#     r"^[A-Z][A-Za-z0-9 &\-–—]+ – .+ – .+$"           # “Role – Team – Company”
# )

# def _split_jobs_in_block(block: str) -> List[str]:
#     """
#     Inside one long Professional Experience block, slice it into
#     separate jobs by detecting lines like
#     'Senior Software Engineer – Streaming Observability – Netflix'
#     followed by bullet points.
#     """
#     lines = block.splitlines()
#     jobs, current = [], []

#     for line in lines:
#         if _JOB_HEADER.match(line.strip()):
#             if current:
#                 jobs.append("\n".join(current).strip())
#                 current = []
#         current.append(line)
#     if current:
#         jobs.append("\n".join(current).strip())

#     return jobs

# # ─────────────────────────────────────────────────────────────
# # 3. Work Experience  (improved)
# # ─────────────────────────────────────────────────────────────
# def extract_work_experience(cv_text: str) -> List[str]:
#     # 3-a Grab every Professional / Work Experience block
#     raw_blocks = _capture_by_heading(
#         cv_text,
#         ["professional experience", "work experience", "experience",
#          "employment", "career history"]
#     )

#     # 3-b Slice each block into individual jobs
#     jobs = []
#     for blk in raw_blocks:
#         jobs.extend(_split_jobs_in_block(blk))

#     # 3-c Catch any stray job bullets elsewhere
#     date_pattern = r"\b(20\d{2}|19\d{2})"
#     extra_bullets = _find_bullets_matching(
#         cv_text,
#         include_kw=["engineer", "developer", "manager", "architect", "intern"],
#         exclude_kw=["project", "course", "certificate", "award"]
#     )
#     extra_bullets = [b for b in extra_bullets if re.search(date_pattern, b)]

#     return _dedupe(jobs + extra_bullets)


# ─────────────────────────────────────────────────────────────
# Split a long Experience block into per-job chunks
# ─────────────────────────────────────────────────────────────

# Accept headings of the form:
# • Senior Software Engineer – Payments – Square
#   Trainee Software Engineer | Fortunaglobal | Aug 2019 – Feb 2020
#   Software Engineering Intern at WSO2
_JOB_HEADER = re.compile(
    r"""^(?:[\u2022•\-–—*]\s*)?                 # optional bullet
        [A-Z][\w &/().+'\-]{2,}                # role (starts with cap)
        (?:\s+(?:–|—|\-|‒|–|—| at | \| ))      # separator
        .+?$                                   # company / team text
    """,
    re.VERBOSE
)

def _split_jobs_in_block(block: str) -> List[str]:
    """
    Inside one long Professional Experience block, slice it
    into separate jobs by detecting header lines.
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
# Public API
# ─────────────────────────────────────────────────────────────

def extract_work_experience(cv_text: str) -> List[str]:
    # 1. Capture every Experience-type section
    raw_blocks = _capture_by_heading(
        cv_text,
        ["professional experience", "work experience", "experience",
         "employment", "employment history", "career history"]
    )

    # 2. Split those blocks into distinct jobs
    jobs = []
    for blk in raw_blocks:
        jobs.extend(_split_jobs_in_block(blk))

    # 3. Find any stray job bullets elsewhere
    date_pattern = r"\b(20\d{2}|19\d{2})"

    extra_bullets = _find_bullets_matching(
        cv_text,
        include_kw=[
            # roles & levels
            "engineer", "developer", "programmer", "architect", "analyst",
            "consultant", "scientist", "technician", "administrator",
            "specialist", "lead", "senior", "principal", "staff",
            "associate", "intern", "trainee", "co-founder", "founder",
            "lecturer", "mentor", "manager", "director",
            "undergraduate trainee", 
            "software engineer intern",
            "software engineering", "software engineer","associate software engineer",

            "principal software engineer","techlead","senior software engineer",
            "software architect","senior software developer","junior software engineer","backend engineer","mobile app developer",
            " lead software engineer","full stack developer",

            # domains
            "full-stack", "backend", "front-end", "devops", "mobile",
            "data", "machine learning", "ai", "blockchain", "cloud"
        ],
        exclude_kw=[
            "course", "courses","project", "projects"," tools and technologies", "tools", "tools used","technologies", "technologies used",
            "certificate", "certification", "training", "workshop","technial projects",
            "award","Certified", "achievement", "honor", "hobbies", "interests",
            "objective", "summary", "profile", "skills", "languages",
            "volunteer", "volunteering", "publication", "publications",
            "reference", "referees", "contact", "competition", "club", "university",
            "school", "college", "degree"
        ]
    )

    # Keep only bullets that reference a calendar year (strong signal of a job)
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
                    "course", "training", "workshop", "bootcamp", "practitioner"],
        exclude_kw=["award", "achievement", "honor", "Excellence", "project", "experience","projects", "tools and technologies", "tools", "work experience","internship", "other experience", "references", "referee", "contact", "about", "Senior Software Engineer", "Software Engineer"]
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
# 


# ─────────────────────────────────────────────────────────────
#  KEYWORD TABLES — ***ONLY PARTS THAT CHANGED*** 
#  (expanded to cover every phrase visible in your screenshots)
# ─────────────────────────────────────────────────────────────

_PROJECT_KEYWORDS = (
    # generic
    "project", "projects", "prototype", "system", "application", "app",
    "platform", "framework", "engine", "tool", "solution", "portal",
    "service", "microservice", "component", "module",
    "optimizer", "replicator", "detector", "assistant",
    # domain-specific additions from samples
    "website", "web site", "web app", "mobile application", "mobile app",
    "e-commerce", "inventory", "management system", "monitoring",
    "booking", "timetable", "gateway", "calculator", "language",
    "compiler", "etl", "iot", "ai", "device", "robot", "sensor",
    "middleware", "chatbot", "data lake", "analytics", "dashboard"
)

_ACTION_VERBS = (
    # core
    "built", "developed", "created", "implemented", "engineered", "designed",
    "crafted", "modernised", "constructed", "delivered", "refactored",
    "automated", "optimised", "prototyped", "integrated", "migrated",
    # extra verbs that appeared in samples
    "architected", "contributed", "launched", "deployed",
    "led", "rolled", "designed", "assembled", "customised"
)

_EXCLUDE_RE = re.compile(
    r"(email|phone|address|linkedin|referee?s?|references?|"
    r"\bcourses?\b|\bcertifications?\b|\bawards?\b|\bachievements?\b|"
    r"\bexperience\b|https?://|@\w+)",
    re.I
)

_PROJECT_HEADINGS = [
    "project", "projects", "project experience",
    "technical project", "technical projects",
    "academic project", "academic projects",
    "industry based project", "industry based projects",
    "research project", "research projects",
    "side project", "side projects", "other projects"
]

def _word_found(text: str, words) -> bool:
    return any(re.search(rf"\b{re.escape(w)}\b", text, re.I) for w in words)

# ─────────────────────────────────────────────────────────────
#  Loose-bullet scanner
# ─────────────────────────────────────────────────────────────
def _find_project_bullets(cv_text: str,
                          min_words: int = 5) -> List[str]:
    lines = cv_text.splitlines()
    bullets, i = [], 0

    while i < len(lines):
        line = lines[i].strip()
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
            if (len(joined.split()) >= min_words and
                    _word_found(joined, _ACTION_VERBS)):
                bullets.append(joined)
            i = j
        else:
            i += 1
    return bullets

# ─────────────────────────────────────────────────────────────
#  PUBLIC API
# ─────────────────────────────────────────────────────────────
# def extract_project_experiences(cv_text: str) -> List[str]:
#     """
#     Return individual project descriptions (academic, industry, hobby).
#     """
#     # 1) heading-driven blocks
#     heading_blocks = _capture_by_heading(cv_text, _PROJECT_HEADINGS)

#     # 2) stray bullets/paragraphs
#     bullet_blocks = _find_project_bullets(cv_text)

#     # 3) split big blocks on blank line or “Technologies:”
#     project_items = []
#     for blk in heading_blocks:
#         for para in re.split(r"(?:\n\s*\n)|(?:\n\s*Technologies?:)", blk):
#             txt = para.strip()
#             if (len(txt.split()) >= 5 and
#                     _word_found(txt, _PROJECT_KEYWORDS) and
#                     not _EXCLUDE_RE.search(txt)):
#                 project_items.append(txt)

#     return _dedupe(project_items + bullet_blocks)

def extract_project_experiences(cv_text: str) -> List[str]:
    """
    Return only project descriptions (academic, industry, hobby).
    Steps:
      1. Capture blocks under headings that match any of _PROJECT_HEADINGS.
      2. Find stray project bullets anywhere in the text.
      3. Split each heading block on:
         • blank lines, or
         • lines beginning with “Technologies:”, “Technologies used:”, or “Tools and Technologies:”
      4. Deduplicate and return.
    """
    # a. Heading-based capture
    heading_blocks = _capture_by_heading(cv_text, _PROJECT_HEADINGS)

    # b. Bullet capture
    bullet_blocks = _find_project_bullets(cv_text)

    # c. Split big heading blocks into individual project items
    project_items = []
    split_pattern = (
        r"(?:\n\s*\n)"                            # blank line
        r"|(?:\n\s*(?:Technologies"
           r"|Technologies used"
           r"|Tools and Technologies):)"          # any of those labels + colon
    )
    for blk in heading_blocks:
        for para in re.split(split_pattern, blk, flags=re.IGNORECASE):
            t = para.strip()
            if (len(t.split()) >= 5
                    and _word_found(t, _PROJECT_KEYWORDS)
                    and not _EXCLUDE_RE.search(t)):
                project_items.append(t)

    # d. Merge and remove duplicates
    return _dedupe(project_items + bullet_blocks)

# ─────────────────────────────────────────────────────────────
#  Achievements extractor (unchanged)
# ─────────────────────────────────────────────────────────────
def extract_achievements(cv_text: str) -> List[str]:
    heading_blocks = _capture_by_heading(
        cv_text,
        heading_keywords=["achievement", "awards", "honor",
                          "accomplishment", "distinction"]
    )

    ach_kw = {
        "achievement", "accomplishment", "award", "recognition", "honor",
        "winner", "finalist", "ranked", "scholarship", "grant", "medal",
        "best", "top", "prize", "distinction"
    }

    doc = nlp(cv_text)
    sent_hits = [s.text.strip() for s in doc.sents
                 if len(s.text.strip()) >= 15 and
                 any(k in s.text.lower() for k in ach_kw)]

    combined = _dedupe(heading_blocks + sent_hits)

    # prune phrases like “Best practices …”
    return [s for s in combined
            if not re.search(r"\b(best practices?|job|project|experience)\b", s, re.I)]





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

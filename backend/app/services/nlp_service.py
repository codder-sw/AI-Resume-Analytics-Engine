import spacy

nlp = spacy.load("en_core_web_sm")

NOISE_WORDS = {"resume", "cv", "page", "email", "phone"}


def extract_entities(text: str) -> dict:
    doc = nlp(text[:100000])

    companies = []
    dates = []

    for ent in doc.ents:
        clean = ent.text.strip()
        if not clean or clean.lower() in NOISE_WORDS:
            continue
        if ent.label_ == "ORG" and clean not in companies:
            companies.append(clean)
        elif ent.label_ == "DATE" and clean not in dates:
            dates.append(clean)

    job_title_keywords = ["engineer", "manager", "developer", "analyst", "designer", "lead", "intern", "consultant", "specialist", "director"]
    job_titles = []
    for chunk in doc.noun_chunks:
        chunk_text = chunk.text.strip()
        if any(kw in chunk_text.lower() for kw in job_title_keywords) and chunk_text not in job_titles:
            job_titles.append(chunk_text)

    return {
        "companies": companies[:10],
        "job_titles": job_titles[:10],
        "dates": dates[:10],
    }
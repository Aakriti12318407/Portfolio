import sys

pdf_path = "AakritiRani CV.pdf"

def extract_pypdf2():
    import PyPDF2
    reader = PyPDF2.PdfReader(pdf_path)
    links = set()
    for page in reader.pages:
        if "/Annots" in page:
            for annot in page["/Annots"]:
                obj = annot.get_object()
                if "/A" in obj and "/URI" in obj["/A"]:
                    links.add(obj["/A"]["/URI"])
    for l in links: print(l)

def extract_fitz():
    import fitz
    doc = fitz.open(pdf_path)
    links = set()
    for page in doc:
        for link in page.get_links():
            if link.get("uri"):
                links.add(link["uri"])
    for l in links: print(l)

def extract_regex():
    import re
    with open(pdf_path, "rb") as f:
        c = f.read()
    links = set()
    for m in re.findall(b'/URI \\((.*?)\\)', c):
        links.add(m.decode('utf-8', errors='ignore'))
    for l in links: print(l)

try:
    extract_fitz()
except ImportError:
    try:
        extract_pypdf2()
    except ImportError:
        extract_regex()

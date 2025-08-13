import requests
from bs4 import BeautifulSoup
import json

BASE_URL = "https://udyamregistration.gov.in/UdyamRegistration.aspx"

def scrape_form():
    response = requests.get(BASE_URL)
    soup = BeautifulSoup(response.text, 'html.parser')

    fields = []
    for inp in soup.find_all(['input', 'select', 'textarea']):
        fields.append({
            "name": inp.get('name', ''),
            "id": inp.get('id', ''),
            "type": inp.get('type', inp.name),
            "placeholder": inp.get('placeholder', ''),
            "maxlength": inp.get('maxlength', ''),
            "required": 'required' in inp.attrs,
        })

    data = {
        "url": BASE_URL,
        "fields": fields
    }

    with open("scraped_data.json", "w") as f:
        json.dump(data, f, indent=2)

    print("Scraped data saved to scraped_data.json")

if __name__ == "__main__":
    scrape_form()

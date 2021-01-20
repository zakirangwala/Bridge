# Import Libraries
import os
import sys
currentdir = os.path.dirname(os.path.realpath(__file__))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
import config
import imdb
import json
import requests
from googlesearch import search
from bs4 import BeautifulSoup
from pygoogletranslation import Translator
import smtplib


# Configure Browser Header and URL
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'}
URL = ''

# Fetch Weather Data


def check_weather(city_name):
    api_key = config.open_weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    full_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(full_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]
        current_temperature = y["temp"]
        z = x["weather"]
        weather_description = z[0]["description"]
        current_temperature -= 273.15
        return str(round(current_temperature)) + ", " + str(weather_description)

    else:
        return "City not found"


# Internet Search
def google_query(query):
    link = []
    for j in search(query, tld="ca", num=10, stop=10, pause=2):
        link.append(j)
    return link

# Check Price of Stock


def return_stock_price(URL):
    try:
        page = requests.get(URL, headers=headers)
        soup = BeautifulSoup(page.content, 'html.parser')
        price = soup.find(
            class_='Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)').get_text()
        title = soup.find(class_='D(ib) Fz(18px)').get_text()
        currency = soup.find(class_='C($tertiaryColor) Fz(12px)').get_text()
        currency = currency[-3:]
    except AttributeError as e:
        return "Error"
    return currency, title, price


def check_price(query):
    query += query + " Yahoo Finance"
    URL = google_query(query)[0]
    if return_stock_price(URL) == "Error":
        return "Error"
    else:
        currency, title, price = return_stock_price(URL)
        return title, price, currency

# Send email


def send_mail(subject, body, reciever):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(config.email, config.password)
    msg = f"Subject: {subject}\n\n{body}"
    server.sendmail(config.email, reciever, msg)
    server.quit()

# Translate


def translate(word, language):
    translator = Translator()
    languages = translator.glanguage()
    keys = list(languages['sl'].keys())
    values = list(languages['sl'].values())
    location = -1
    for i in range(len(keys)):
        if language.lower() == keys[i].lower() or language.lower() == values[i].lower():
            location = i
    if location == -1:
        return('Language entered is not supported')
    else:
        translation = str(translator.translate(word, dest=keys[location]))
        translation = translation[translation.find(
            "text") + 5:translation.find(', p')]
        return(f'{word} in {values[location]} => {translation}')

# Scrape IMDB


def find_imdb(query):
    try:
        query += ' IMDB'
        URL = google_query(query)[0]
        page = requests.get(URL, headers=headers)
        html_content = page.text
        soup = BeautifulSoup(html_content, 'lxml')
        title = soup.title.string
        title = title[0:-7]
        return title
    except Exception as e:
        return 'Movie could not be found'

# Scrape Rotten Tomatoes


def rotten_tomatoes_score(query):
    try:
        query += query + " Rotten Tomatoes"
        URL = google_query(query)[0]
        page = requests.get(URL, headers=headers)
        soup = BeautifulSoup(page.content, 'html.parser')
        res = soup.find(class_='mop-ratings-wrap__percentage').get_text()
        check = res.split(' ')
        for i in check:
            if len(i) > 1:
                return i
    except Exception as e:
        return '-1  '

# def find_movie(movie):
#     x = requests.get(f'https://assistant-beta-app.herokuapp.com/movie/{movie}')
#     result = x.json()
#     return result

# Find Movie
def find_movie(word):
    moviesDB = imdb.IMDb()
    movies = moviesDB.search_movie(find_imdb(word))
    id = movies[0].getID()
    movie = moviesDB.get_movie(id)
    score = str(rotten_tomatoes_score(find_imdb(word)))
    score = float(score[:-2])
    rating = float(movie['rating'])
    title = str(movie['title'])
    year = movie['year']
    directors = movie['directors']
    casting = []
    if len(movie['cast']) != 1:
        for i in range(8):
            casting.append(str(movie['cast'][i]))
    else:
        casting = str(movie['cast'][0])
    if len(directors) != 1:
        d = []
        d.append((f'{str(directors[0])}'))
        del directors[0]
        for i in range(len(directors)):
            if i != len(directors) - 1:
                d.append((f'{str(directors[i])}'))
            else:
                d.append((str(directors[i])))
    else:
        d = (f'{str(directors[0])}')
    keys = list(movie.keys())
    if 'plot outline' not in keys:
        synopsis = str(movie['plot'][0])
    else:
        synopsis = str(movie['plot outline'])
    x = {
        "Title": title,
        "Year": year,
        "IMDB": rating,
        "Tomatometer": score,
        "Cast": casting,
        "Directors": d,
        "Plot": synopsis
    }
    return x
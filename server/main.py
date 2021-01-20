# Import Libraries
from flask import Flask, request
from flask_cors import CORS, cross_origin
from twilio.rest import Client
import base_command
import helps
import stock
import mail
import weather
import translate
import movies
import config

# Flask app configuration
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Initialize Twilio client configuration
account_sid = config.account_sid
auth_token = config.auth_token
client = Client(account_sid, auth_token)

# Send Message
def send_message(reply, number):
    message = client.messages.create(
        from_=config.Twilio_number,
        body=reply,
        to=number
    )

# Reply to SMS
@app.route("/reply", methods=['GET', 'POST'])
@cross_origin()
def reply():
    body = request.values.get('Body', None)
    number = request.values.get('From', None)
    print("Sender Number: " + number)
    command = base_command.Command(body).command
    return_text = ''
    print("Command: " + command)
    if command == "help":
        response = helps.Help(body)
        return_text = response.exec()
    elif command == "stock":
        response = stock.Stock(body)
        return_text = response.exec()
    elif command == "mail":
        response = mail.Mail(body)
        return_text = response.exec()
    elif command == "weather":
        response = weather.Weather(body)
        return_text = response.exec()
    elif command == "translate":
        response = translate.Translate(body)
        return_text = response.exec()
    elif command == "movie":
        response = movies.Movie(body)
        return_text = response.exec()

    if return_text == '':
        send_message("please type !help for response", number)
    else:
        print("RETURN MESSAGE:", return_text)
        send_message(return_text, number)
    return str(return_text)

from twilio.rest import Client
import os

TWILIO_ACCESS_KEY_ID = os.getenv('TWILIO_ACCESS_KEY_ID')
TWILIO_SECRET_ACCESS_KEY = os.getenv('TWILIO_SECRET_ACCESS_KEY')

class Twilio:
    def __init__(self):
        self.account_sid = TWILIO_ACCESS_KEY_ID
        self.auth_token = TWILIO_SECRET_ACCESS_KEY
        self.client = Client(self.account_sid, self.auth_token)
    
    def send_message(self, auth_code):
        message = self.client.messages.create(
          from_='+15708575298',
          body=f'InT 인증코드 : {auth_code}',
          to='+821053860853'
        )
    
        print(message.sid)
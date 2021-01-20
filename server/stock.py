from utils import check_price
from base_command import Command

class Stock(Command):
    def exec(self):
        print("Request:", self.args)
        return_text = ""
        for stock in self.args[0].split(','):
            title, price, currency = check_price(stock.strip())
            return_text += title + ", " + price + ", " + currency + '\n'
        return return_text

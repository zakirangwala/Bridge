from base_command import Command
from utils import check_weather


class Weather(Command):
    def exec(self):
        print("Request:", self.args)
        """
        !weather;City
        """
        return check_weather(self.args[0])

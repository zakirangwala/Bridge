from base_command import Command
from utils import translate


class Translate(Command):
    def exec(self):
        print("Request:", self.args)
        return translate(self.args[0], self.args[1])

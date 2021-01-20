from commands.base_command import Command
from commands.utils import translate


class Translate(Command):
    def exec(self):
        print("Request:", self.args)
        return translate(self.args[0], self.args[1])

class StudentDto:
    def __init__(self, id, name, enrolled):
        self.__name = name
        self.__id = id
        self.__enrolled = enrolled

    @property
    def id(self):
        return self.__id

    @property
    def name(self):
        return self.__name

    @property
    def enrolled(self):
        return self.__enrolled

    def __str__(self):
        return f"{self.__id} - {self.__name} - {self.__enrolled}"

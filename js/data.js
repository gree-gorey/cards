// mapping для входных данных. ** помечены обязательные элементы.
// Входные данные представляют собой несортированный массив карточек.
// Каждая карточка представляет из себя словарь.

data = [
    {
        "source": "Gerona Airport",  // ** начальный пункт билета
        "destination": "Stockholm",  // ** конечный пункт билета
        "type": "flight",  // ** тип транспортного средства
        "identifier": "SK455",  // номер рейса
        "gate": "458",  // номер выхода
        "seat": "3A",  // номер места
        "baggageInfo": "Baggage drop at ticket counter 344."  // инфо про багаж
    },
    {
        "source": "Stockholm",
        "destination": "New York JFK",
        "type": "flight",
        "identifier": "SK22",
        "gate": "22",
        "seat": "7B",
        "baggageInfo": "Baggage will be automatically transferred from your last leg."
    },
    {
        "source": "Madrid",
        "destination": "Barcelona",
        "type": "train",
        "identifier": "78A",
        "seat": "45B"
    },
    {
        "source": "Barcelona",
        "destination": "Gerona Airport",
        "type": "the airport bus",
        "identifier": "",
        "seat": ""
    }
];

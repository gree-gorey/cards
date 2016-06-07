class Storage {
    constructor(data) {
        this.sources = {};
        this.destinations = {};
        this.firstElement = null;
        this.initialize(data);
    }

    initialize(data) {
        // обходим массив карточек
        for (var i = 0; i < data.length; i++) {
            // для каждой создаем экземпляр класса Card со всеми параметрами
            var myCard = new Card(data[i]);
            // в словарь начальных пунктов добавляем ссылку на объект по ключу - названию начального пункта
            this.sources[myCard.sourceName] = myCard;
            // в словарь конечных пунктов добавляем ссылку на объект по ключу - названию конечного пункта
            this.destinations[myCard.destinationName] = myCard;
            if (i == 0) {
                this.firstElement = myCard;
            }
        }
        // сделаем начальной карточкой любую, например первую
        this.firstElement = this.sources[data[0]["source"]];
    }
    
    sort() {
        // установим переключатель, чтобы знать, когда отстановиться
        this.reachLastDestination = false;
        // последний добавленный (и пока что единственный) - это начальный элемент
        this.lastAddedDestination = this.firstElement;

        // пока не дойдем до конечного пункта путешествия, перебираем карточки (каждый раз последний добавленный меняется)
        while (!this.reachLastDestination) {
            this.goForLastDestination(this.lastAddedDestination)
        }

        // теперь уже идем также, но в начало путешествия; устанавливаем переключатель
        this.reachFirstSource = false;

        // пока не дойдем до начального пункта путешествия, перебираем карточки
        while (!this.reachFirstSource) {
            this.goForFirstSource(this.firstElement)
        }
    }

    goForLastDestination(cardElement) {
        // если конечный пункт этой карточки был упомянут как начальный пункт в другой карточке
        if (cardElement.destinationName in this.sources) {
            // прописываем в текущей карточке ссылку на следующую (т.е. на найденную)
            cardElement.nextCard = this.sources[cardElement.destinationName];
            // удаляем ссылку на найденную карточку из словаря начальных пунктов
            delete this.sources[cardElement.destinationName];
            // запоминаем для себя ссылку на последнюю найденную карточку
            this.lastAddedDestination = cardElement.nextCard;
        } else {
            // если конечный пункт этой карточки нигде не упомянут, то мы достигли конечной точки путешествия
            this.reachLastDestination = true;
        }
    }

    goForFirstSource(cardElement) {
        // если исходный пункт этой карточки был упомянут как конечный пункт в другой карточке
        if (cardElement.sourceName in this.destinations) {
            // меняем начальный элемент списка на ту карточку, где было упоминание
            this.firstElement = this.destinations[cardElement.sourceName];
            // прописываем ссылку на текущую карточку из найденной
            this.firstElement.nextCard = cardElement;
            // удаляем ссылку на найденную карточку из словаря конечных пунктов
            delete this.destinations[cardElement.sourceName];
        } else {
            // если исходный пункт этой карточки нигде не упомянут, то мы достигли исходной точки путешествия
            this.reachFirstSource = true;
        }
    }

    setGenerator() {
        this.reachLastDestination = false;
        this.currentElement = this.firstElement;
    }

    * routeGenerator() {
        while (!this.reachLastDestination) {
            yield this.currentElement;
            if (this.currentElement.nextCard) {
                this.currentElement = this.currentElement.nextCard;
            } else {
                this.reachLastDestination = true;
            }
        }
    }
}


class Card {
    constructor(cardElement) {
        this.sourceName = cardElement["source"];
        this.destinationName = cardElement["destination"];
        this.transportType = cardElement["type"];
        this.baggageInfo = cardElement["baggageInfo"];
        this.transportIdentifier = cardElement["identifier"];
        this.seat = cardElement["seat"];
        this.gate = cardElement["gate"];
        this.nextCard = null;
    }

    generateMessage() {
        var message = "Take " + this.transportType + " ";
        // если есть номер рейса, добавляем
        if (this.transportIdentifier) {
            message += this.transportIdentifier + " ";
        }
        message += "from " + this.sourceName + " to " + this.destinationName + ". ";
        // если указан выход, добавляем в сообщение
        if (this.gate) {
            message += "Gate " + this.gate + ". ";
        }
        // если есть место, указываем; если нет - пишем, что место не назначено
        if (this.seat) {
            message += "Seat " + this.seat + ". ";
        } else {
            message += "No seat assignment. ";
        }
        // если есть инфо про багаж, добавляем в сообщение
        if (this.baggageInfo) {
            message += this.baggageInfo;
        }
        return message;

    }
}
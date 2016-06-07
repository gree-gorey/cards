class Storage {
    constructor(data) {
        this.cards = [];
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
            // этот экземпляр добавляем в массив хранилища
            this.cards.push(myCard);
            // в словарь начальных пунктов добавляем ссылку на объект по ключу - названию начального пункта
            this.sources[myCard.sourceName] = myCard;
            // в словарь конечных пунктов добавляем ссылку на объект по ключу - названию конечного пункта
            this.destinations[myCard.destinationName] = myCard;
        }
        // сделаем начальной карточкой любую, например первую
        this.firstElement = this.cards[0];
        // и сразу удалим ее из массива хранилища
        this.cards.splice(0, 1);
    }
    
    sort() {
        this.reachLastDestination = false;
        this.lastAddedDestination = this.firstElement;

        while (!this.reachLastDestination) {
            this.goForLastDestination(this.lastAddedDestination)
        }

        this.reachFirstSource = false;

        while (!this.reachFirstSource) {
            this.goForFirstSource(this.firstElement)
        }
    }

    goForLastDestination(cardElement) {
        // если конечный пункт этой карточки был упомянут как начальный пункт в другой карточке
        if (cardElement.destinationName in this.sources) {
            // прописываем в текущей карточке ссылку на следующую (т.е. на найденную)
            cardElement.nextCard = this.sources[cardElement.destinationName];
            // удаляем ссылку на найденную карточку из массива хранилища
            var i = this.cards.indexOf(cardElement);
            if(i != -1) {
                this.cards.splice(i, 1);
            }
            // удаляем ссылку на найденную карточку из словаря начальных пунктов
            delete this.sources[cardElement.destinationName];
            // запоминаем для себя ссылку на последнюю найденную карточку
            this.lastAddedDestination = cardElement.nextCard;
        } else {
            // если конечный пункт этой карточки нигде не упомянут, то мы достигли конечной точки путешествия
            cardElement.isLastElement = true;
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
            // удаляем ссылку на текущую карточку из массива хранилища
            var i = this.cards.indexOf(cardElement);
            if(i != -1) {
                this.cards.splice(i, 1);
            }
            // удаляем ссылку на найденную карточку из словаря конечных пунктов
            delete this.destinations[cardElement.sourceName];
        } else {
            // если исходный пункт этой карточки нигде не упомянут, то мы достигли исходной точки путешествия
            this.reachFirstSource = true;
        }
    }
}


class Card {
    constructor(cardElement) {
        this.sourceName = cardElement["source"];
        this.destinationName = cardElement["destination"];
        this.transportType = cardElement["type"];
        this.additionalInfo = cardElement["info"];
        this.transportIdentifier = cardElement["identifier"];
        this.isLastElement = false;
        this.nextCard = null;
    }
}
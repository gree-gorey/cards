var myStorage = new Storage(data);  // создаем экземпляр класса хранилища, передав ему в качестве параметра наш массив с несортированными карточками

myStorage.sort();  // вызываем метод сортировки карточек; в результате создается связанный список

myStorage.setGenerator();  // устанавливаем переменные для работы генератора

// запускаем генератор, который обходит все карты от начала маршрута к концу
for (var card of myStorage.routeGenerator()) {
    console.log(card.generateMessage());
}

data[2]["carNumber"] = "7";
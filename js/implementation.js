var myStorage = new Storage(data);  // Создаем экземпляр класса хранилища, передав ему в качестве параметра наш массив с несортированными карточками

myStorage.sort();  // Вызываем метод сортировки карточек; в результате создается связанный список

console.log(myStorage.lastAddedDestination.destinationName);
var CarSelectorView = Purr.MVC.view(),
CarSelectorModel = Purr.MVC.model(),
CarSelectorController = Purr.MVC.controller({
	model: CarSelectorModel,
	view: CarSelectorView
}),
data = [{make: 'Ford', makeId: 1, models: ['Mustang', 'Focus']}, {make: 'MersedesBenz', makeId: 2, models: ['SLK']}, {make: 'Toyota', makeId: 3, models: ['Corolla']}];



$(function () {
	var tpl = $('.tpl').text();

	console.log('parsed tpl', Purr.MVC.tpl.parse(tpl, data));
});


var a1 = ['Berlin', 'Zurich', 'Antverpen', 'Brugge', 'Monaco', 'Prague'];

a1 = Purr.list(a1);

//a1.removeFirst();
a1.remove('Zurich', 'Monaco');
console.log(Purr.util.isArray(a1.getRawArray()));

var stringWithWildcards = 'Hello, mr. %s! You are %d now!',
name = 'Smith',
age = 30;
Purr.string.format(stringWithWildcards, name, age);


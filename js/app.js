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




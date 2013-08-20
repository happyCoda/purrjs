var CarSelectorView = Purr.MVC.view(),
CarSelectorModel = Purr.MVC.model(),
CarSelectorController = Purr.MVC.controller({
	model: CarSelectorModel,
	view: CarSelectorView
}),
makes = [{Ford: ['Mustang', 'Focus']}, {MersedesBenz: ['SLK']}, {Toyota: ['Corolla']}];



$(function () {
	var tpl = $('.tpl').text();

	console.log(Purr.MVC.tpl.parse(tpl));
});






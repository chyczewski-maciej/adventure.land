function load_all_scripts(branch_or_commit = 'master', retry_count = 1) {
	//$.ajaxSetup({ async: false, cache:false });
	return $.get('https://raw.githubusercontent.com/chyczewski-maciej/adventure.land/'+branch_or_commit+'/load_all_scripts.js')
	.done(content => new Function('branch_or_commit', content)(branch_or_commit))
	.done(() => log('Scripts loaded'))
	.fail(() => {
		game_log('Loading scripts failed. Retrying for ' + (++retry_count) + ' time...');
		setTimeout(() => load_all_scripts(branch_or_commit, retry_count), retry_count * 100);	
	});		 
}



function get_items(filter = (_ => true)) {
  return character
    .items
    .map((item, index) => [item, index])
    .filter(([item, index]) => item && filter(item, index))
}

function sort_by_level (pair1, pair2) {
	var [item1, index2] = pair1;
	var [item2, index2] = pair2;
	
	return item1.level - item2.level;
}

function sort_by_level_desc(pair1,pair2){
	return -sort_by_level(pair1,pair2);
}
var item_name = 'coat';

let sort_order = sort_by_level;
function main_loop() {		
	if(character.q.upgrade)
		return;
	
	if(get_items(item => item.name == item_name && item.level < 9).length == 0)
		if(get_items(item => item.name == item_name && item.level == 9).length < 2)
		  buy_with_gold(item_name);
	
	if(get_items(item => item.name == 'scroll0').length == 0)
		buy_with_gold('scroll0', 100);
		
	if(get_items(item => item.name == 'scroll1').length == 0)
		buy_with_gold('scroll1', 10);
	
	get_items(item => item.name == item_name && item.level < 9)
		.sort(sort_order)
		.slice(0,1)
		.forEach(([item, item_index]) => {
			var scroll = item.level < 7 ? 'scroll0' : 'scroll1';					
			upgrade(item_index, locate_item(scroll));
		});
}

load_all_scripts('master').then(() => setInterval(main_loop, 500));
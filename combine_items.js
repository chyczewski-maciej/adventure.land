function compound_item(item_name, item_level, scroll_name = 'cscroll0') {
	const scroll = locate_item('cscroll0');

	if(scroll <= -1)
		return;

	const items = 
		character
			.items
			.map((item, index) => [item,index])
			.filter(([item, index]) => item && item.name == item_name && item.level == item_level)
			.map(([item, index]) => index)
			.slice(0,3);
	
	
	log(`${item_name}: ${item_level}`);
	if (items.length == 3 && scroll >= 0)
		compound(...items, scroll).then(log);

}

function compound_all() {
	function groupBy(items, keySelector) {
		keySelector = keySelector || (x=>x);
		const groups = {};
		
		items.forEach(item => {
			const key = keySelector(item);
			if(groups[key] === undefined)
				groups[key] = [];
			
			groups[key].push(item);
		});

		return Object.entries(groups).map(([key,value]) => value);
	}

	groupBy(character.items.filter(x => x && !x.q && G.items[x.name]['compound']), item => [item.name, item.level])
		.filter(g => g.length >= 3)
		.map(g => g[0])
		.slice(0,1)
		.forEach(item => compound_item(item.name, item.level));
}

// compound_all()
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

let lure_mode = true;
var party = ['Made2Tank', 'HolyCow', 'PiriPiri'];

var starting_x = character.x, starting_y = character.y;

function main_loop(){
	
	function use_potions() {
	  if (!parent.next_skill.use_hp)
		parent.next_potion = new Date();

	  if (new Date() > parent.next_potion) {
		if (character.hp < character.max_hp * 0.20) use('use_hp');
		else if (character.mp < character.max_mp * 0.20) use('use_mp');
		else if (character.hp < character.max_hp * 0.650) use('use_hp');
		else if (character.mp < character.max_mp - 300) use('use_mp');
	  }
	}


	use_potions();
	var distance_to_character = monster => parent.distance(character, monster);
	var descending = f => (m => -f(m))
	var attacks_me = m => get_target_of(m) == character;
	var attacks_party = m => get_target_of(m) && party.indexOf(get_target_of(m).name) > -1
	var level = m => m.level
	var has_no_target = m => !get_target_of(m)
	var is_phoenix = m => m.name == "Phoenix";
	var sort_functions = [
		attacks_party,
		attacks_me,
		is_phoenix,
		in_attack_range,
		has_no_target,
		descending(distance_to_character),
	];
	
	if(party.filter(get_player).length >= party.length - 1)
	{
		choose_target(target => (target.name == "Dark Hound" || target.name == "Phoenix"), sort_functions);	
	}
	
	var target = get_target();
	if(!lure_mode)
		if(!is_moving(character))
			auto_follow();
	if(lure_mode)
		if(!is_moving(character))
			if(target && (!get_target_of(target) || !attacks_me(target)) && (distance(character, target) > 200))
				auto_follow();
			else if((abs(character.x - starting_x) + abs(character.y - starting_y)) > 50)		
				move(starting_x, starting_y);
			else if(target && !in_attack_range(target) && distance(target, this.character) <= 60)
				auto_follow();
	
	
	if(target && !target.me && !attacks_me(target))
		if(!get_target_of(target) || (get_target_of(target) && (party.indexOf(get_target_of(target).name) > -1)))
			if(can_use('taunt'))
		use_skill('taunt', get_target())

	auto_attack();
	loot();	
	create_party(party);
}


//sell_all((item, _) => 
		 //item.name == "dexring" 
		 //|| item.name == "wattire"
		 //|| item.name == "vitring")

load_all_scripts('master')
	.then(() => setInterval(main_loop, 250));
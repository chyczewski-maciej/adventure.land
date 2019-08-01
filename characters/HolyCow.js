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

var party = ['Made2Tank', 'HolyCow', 'HolySheep', 'PiriPiri'];
var friends = ['Garrry', 'Ygritte', 'Lifeguard', 'Bazinga'];
var starting_x = character.x, starting_y = character.y;

function main_loop() {	
	use_potions();
	heal_friends(party, () => true);
	//heal_friends(friends, () => true);

	var distance_to_character = monster => parent.distance(character, monster);
	var descending = f => (monster => -f(monster))
	var attacks_me = m => get_target_of(m) == character;
	var level = m => m.level
	var is_phoenix = m => m.name == "Phoenix";
	var sort_functions = [
		attacks_me,
		in_attack_range,
		is_phoenix,
		distance_to_character
	];
	
	copy_target('Made2Tank');
	//choose_target(m=> (m.name == 'Pom Pom' || m.name == 'Phoenix') && in_attack_range(m), sort_functions);
	
	
	
	
	var target = get_target();	
	if(target && get_target_of(target))
		auto_attack([]);

	if(true)
		if(!is_moving(character) && character.x != starting_x && character.y != starting_y)		
			if(!target || (target && target.dead))			
				move(starting_x, starting_y);
	else		
		auto_follow();
	
	loot();
	create_party(party);
}

load_all_scripts('master').then(() => setInterval(main_loop, 250));
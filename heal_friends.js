function heal_friends(friends) {
    var target = get_target();
    friends
      .map(get_player)
      .filter(player => player)
      .filter(in_range)
      .filter(player => (player.hp < (player.max_hp * 0.5)) || (player.hp < player.max_hp - (character.int * 5)))
      .sort(player => player.hp / player.max_hp)
      .slice(0, 1) // take 1
      .forEach(heal);
    
    parent.ctarget = target;
}
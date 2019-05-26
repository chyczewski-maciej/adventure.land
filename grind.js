function grind(args, filter) {
  function grindIter() {
    if (character.rip || is_moving(character)) return;
    var target = get_targeted_monster();
    if (!target) {
      target = get_nearest_monster(args, filter);
      change_target(target);
    }
    if (target)
    {
      if (!in_attack_range(target))
        move(character.x + (target.x - character.x) / 2, character.y + (target.y - character.y) / 2);
      
      if (can_attack(target))
        attack(target);
    }

    loot();
  }

  setInterval(grindIter, 250);
}
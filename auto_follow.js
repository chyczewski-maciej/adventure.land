function auto_follow() { 
  setInterval(() => {
    var target = get_targeted_monster();
    if (target && !in_attack_range(target))
      move(character.x + (target.x - character.x) / 2, character.y + (target.y - character.y) / 2);
  }, 250);
}
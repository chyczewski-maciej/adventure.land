function auto_follow() { 
  setInterval(() => {
    var target = get_target();
    if (target && !in_attack_range(target))
      move(character.x + (target.x - character.x) / 2, character.y + (target.y - character.y) / 2);
  }, 250);
}
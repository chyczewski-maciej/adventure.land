function auto_attack() { 
  setInterval(() => {
    var target = get_targeted_monster();
    if (target && can_attack(target))
      attack(target);
  }, 250);
}
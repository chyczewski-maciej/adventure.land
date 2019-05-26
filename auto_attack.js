function auto_attack(skills) {
  var target = get_targeted_monster();
  if (!target)
    return;
  
  if (skills)
    skills
      .filter(can_use)
      .slice(0, 1)
      .forEach(skill => use_skill(skill, target));

  if (can_attack(target))
    attack(target);
}
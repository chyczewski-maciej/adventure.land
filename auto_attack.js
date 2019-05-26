function auto_attack(skills) {
  setInterval(() => {
    var target = get_targeted_monster();
    if (target && can_attack(target)) {
      attack(target);

      if (skills)
        skills
          .filter(can_use)
          .slice(0, 1)
          .forEach(skill => use_skill(skill, target));
    }
  }, 250);
}
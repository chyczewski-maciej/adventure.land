function use_potions() {
  if (!parent.next_skill.use_hp)
    parent.next_potion = new Date();

  if (new Date() > parent.next_potion) {
    if (character.hp < character.max_hp * 0.20) use('use_hp');
    else if (character.mp < character.max_mp * 0.20) use('use_mp');
    else if (character.hp < character.max_hp * 0.50) use('use_hp');
    else if (character.mp < character.max_mp - 300) use('use_mp');
    else if (character.hp < character.max_hp - 400) use('use_hp');
  }
}
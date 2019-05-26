function load_all_scripts() {
  let prepend = 'https://raw.githubusercontent.com/chyczewski-maciej/adventure.land/master/';
  let append = '.js';
  let scripts = [
    "auto_attack",
    "auto_follow",
    "auto_loot",
    "copy_target",
    "grind",
    "heal_friends",
    "sell_all",
    "use_potions"
  ];

  scripts.map(script => prepend + script + append).forEach(load_external_script);
}
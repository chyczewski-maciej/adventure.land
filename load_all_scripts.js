(function (branch_or_commit = 'master') {
  let load_external_script = (url) => {
    $.ajaxSetup({ async: false });
    $.get(url).done(eval).fail(() => {
      log("Failed to load a script. Retrying...");
      setTimeout(() => load_external_script(url), 500);
    });
  }

  let prepend = 'https://raw.githubusercontent.com/chyczewski-maciej/adventure.land/' + branch_or_commit + '/';
  let append = '.js';
  let scripts = [
    "auto_attack",
    "auto_follow",
    "choose_target",
    "copy_target",
    "heal_friends",
    "sell_all",
    "upgrade_items",
    "use_potions"
  ];

  scripts.map(script => prepend + script + append).forEach(load_external_script);
})(branch_or_commit)
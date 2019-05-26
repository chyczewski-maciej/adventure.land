function load_external_script(url, name) {
  $.ajaxSetup({async: false});
  $.get(url).done(eval).fail(() => {
    log("Failed to load a script: " + name + ". Retrying...");
    setTimeout(() => load_external_script(name), 500);
  });
}

load_external_script('https://raw.githubusercontent.com/chyczewski-maciej/adventure.land/master/load_all_scripts.js');
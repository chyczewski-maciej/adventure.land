function load_external_script(url) {
  $.ajaxSetup({async: false});
  $.get(url).done(eval).fail(() => {
    log("Failed to load a script. Retrying...");
    setTimeout(() => load_external_script(url), 500);
  });
}
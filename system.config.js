(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'build/dev/js'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'boot.js',  defaultExtension: 'js' },
    
  };

  var config = {
    map: map,
    packages: packages
  }
  
  System.config(config);
})(this);
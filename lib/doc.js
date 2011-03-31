var markdown = require('node-markdown').Markdown;

exports = module.exports = function(server, options) {
  server.register('.md', {
    compile: function(str, options){
      var html = markdown(str);
      return function(locals){
        return html;
      };
    }
  });
  
  doc(server, options);
};

function doc(server, options) {
  if (options && typeof options == 'string') root = options;

  if (!root && !options.root) throw new Error('root path required');
    
  options = options || {};

  options.root = options.root || root;
  if ('/' != options.root[options.root.length - 1]) options.root += '/';
  
  options.layout = options.layout || 'doc.jade';
  options.title = options.title || __dirname + options.root;
  options.resourceInTitle = options.resourceInTitle || true;
  
  options.nav = options.nav || generateNav();
  
  // console.log(options);
  
  console.log('set up route', options.root + '*?');
  
  server.get(options.root + '*?', function(req, res){
    
    var resource = req.params[0] || 'api'; 
    
    console.log(resource);
    
    res.render(options.root + resource + '.md', {
      layout: options.layout,
      title: (options.resourceInTitle ? resource + ' | ' + options.title : options.title),
      docRoot: options.root,
      nav: options.nav
    });
  });

}
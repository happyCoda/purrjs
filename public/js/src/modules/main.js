'use strict';

require.config({
  paths: {
    react: 'react.min',
    reactDom: 'react-dom.min'
  }
});

require(['react', 'reactDom', 'header', 'section', 'purr'], function (React, ReactDOM, Header, Section, Purr) {

  var Page = React.createClass({
    displayName: 'Page',

    render: function () {
      return React.createElement(
        'section',
        { className: 'main_content' },
        React.createElement(
          'code',
          { className: 'code' },
          'Purr.method();'
        )
      );
    }
  });

  function renderSection() {
    var section = arguments[0].val;

    ReactDOM.render(React.createElement(Section, { content: 'Purr.method(' + section + ');' }), document.querySelector('.container'));
  }

  ReactDOM.render(React.createElement(Page, null), document.querySelector('.container'));

  ReactDOM.render(React.createElement(Header, { onClick: renderSection }), document.querySelector('.header-wrapper'));
});

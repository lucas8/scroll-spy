function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var ScrollSpyContext = React.createContext(undefined);
var ScrollSpyActions = React.createContext(undefined);
function ScrollSpyProvider(_ref) {
  var children = _ref.children,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {
    threshold: 0.5
  } : _ref$options;

  var _React$useState = React.useState([]),
      nodes = _React$useState[0],
      setNodes = _React$useState[1];

  var _React$useRef = React.useRef(new window.IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > (options.threshold || 0.5)) {
        window.history.pushState(null, '', "#" + entry.target.id);
        setNodes(function (nodes) {
          return nodes.map(function (n) {
            return n.id === entry.target.id ? _extends({}, n, {
              isActive: true
            }) : _extends({}, n, {
              isActive: false
            });
          });
        });
      }
    });
  }, options)),
      currentObserver = _React$useRef.current;

  var state = React.useMemo(function () {
    return {
      nodes: nodes,
      sortedNodeTree: nodes.reduce(function (obj, item) {
        if (item.parent) {
          var _extends2, _extends3;

          var parentObj = obj[item.parent] || {};
          var arr = parentObj[item.topic || 'unsorted'] || [];
          return _extends({}, obj, (_extends3 = {}, _extends3[item.parent] = _extends({}, parentObj, (_extends2 = {}, _extends2[item.topic || 'unsorted'] = [].concat(arr, [item]), _extends2)), _extends3));
        } else {
          var _extends4;

          var _arr = obj[item.topic || 'unsorted'] || [];

          return _extends({}, obj, (_extends4 = {}, _extends4[item.topic || 'unsorted'] = [].concat(_arr, [item]), _extends4));
        }
      }, {})
    };
  }, [nodes]);
  var actions = React.useMemo(function () {
    return {
      addNode: function addNode(instance, _ref2) {
        var title = _ref2.title,
            parentTopic = _ref2.parentTopic,
            topic = _ref2.topic;

        if (instance) {
          currentObserver.observe(instance);
          setNodes(function (nodes) {
            return [].concat(nodes, [{
              title: title,
              id: instance.id,
              isActive: false,
              topic: parentTopic ? topic : undefined,
              parent: !parentTopic ? topic : parentTopic
            }]);
          });
        }
      }
    };
  }, [currentObserver]);
  React.useEffect(function () {
    return function () {
      return currentObserver.disconnect();
    };
  }, [currentObserver]);
  return React.createElement(ScrollSpyContext.Provider, {
    value: state
  }, React.createElement(ScrollSpyActions.Provider, {
    value: actions
  }, children));
}
var useScrollSpy = function useScrollSpy() {
  var context = React.useContext(ScrollSpyActions);

  if (!context) {
    throw new Error('useScrollSpy must be used within the ScrollSpyProvider');
  }

  return context.addNode;
};
var useScrollSpyState = function useScrollSpyState() {
  var context = React.useContext(ScrollSpyContext);

  if (!context) {
    throw new Error('useScrollSpyState must be used within the ScrollSpyProvider');
  }

  return context;
};

function Section(_ref) {
  var children = _ref.children,
      title = _ref.title,
      id = _ref.id,
      inheritedTopic = _ref.inheritedTopic,
      parentTopic = _ref.parentTopic,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "title", "id", "inheritedTopic", "parentTopic"]);

  var addNode = useScrollSpy();
  return React.createElement("div", Object.assign({
    id: id,
    ref: function ref(instance) {
      return addNode(instance, {
        title: title,
        topic: inheritedTopic,
        parentTopic: parentTopic
      });
    }
  }, rest), children);
}

function Topic(_ref) {
  var children = _ref.children,
      name = _ref.name,
      inheritedTopic = _ref.inheritedTopic;
  var childrenWithTopic = React.Children.map(children, function (child) {
    if (!React.isValidElement(child)) {
      return child;
    }

    return React.cloneElement(child, {
      inheritedTopic: name,
      parentTopic: inheritedTopic
    });
  });
  return React.createElement("div", null, childrenWithTopic);
}

exports.ScrollSpyProvider = ScrollSpyProvider;
exports.Section = Section;
exports.Topic = Topic;
exports.useScrollSpy = useScrollSpy;
exports.useScrollSpyState = useScrollSpyState;
//# sourceMappingURL=index.js.map

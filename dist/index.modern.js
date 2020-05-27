import React from 'react';

const ScrollSpyContext = React.createContext(undefined);
const ScrollSpyActions = React.createContext(undefined);
function ScrollSpyProvider({
  children,
  options = {
    threshold: 0.5
  }
}) {
  const [nodes, setNodes] = React.useState([]);
  const {
    current: currentObserver
  } = React.useRef(new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > (options.threshold || 0.5)) {
        window.history.pushState(null, '', `#${entry.target.id}`);
        setNodes(nodes => nodes.map(n => n.id === entry.target.id ? { ...n,
          isActive: true
        } : { ...n,
          isActive: false
        }));
      }
    });
  }, options));
  const state = React.useMemo(() => ({
    nodes,
    sortedNodeTree: nodes.reduce((obj, item) => {
      if (item.parent) {
        const parentObj = obj[item.parent] || {};
        const arr = parentObj[item.topic || 'unsorted'] || [];
        return { ...obj,
          [item.parent]: { ...parentObj,
            [item.topic || 'unsorted']: [...arr, item]
          }
        };
      } else {
        const arr = obj[item.topic || 'unsorted'] || [];
        return { ...obj,
          [item.topic || 'unsorted']: [...arr, item]
        };
      }
    }, {})
  }), [nodes]);
  const actions = React.useMemo(() => ({
    addNode: (instance, {
      title,
      parentTopic,
      topic
    }) => {
      if (instance) {
        currentObserver.observe(instance);
        setNodes(nodes => [...nodes, {
          title,
          id: instance.id,
          isActive: false,
          topic: parentTopic ? topic : undefined,
          parent: !parentTopic ? topic : parentTopic
        }]);
      }
    }
  }), [currentObserver]);
  React.useEffect(() => {
    return () => currentObserver.disconnect();
  }, [currentObserver]);
  return React.createElement(ScrollSpyContext.Provider, {
    value: state
  }, React.createElement(ScrollSpyActions.Provider, {
    value: actions
  }, children));
}
const useScrollSpy = () => {
  const context = React.useContext(ScrollSpyActions);

  if (!context) {
    throw new Error('useScrollSpy must be used within the ScrollSpyProvider');
  }

  return context.addNode;
};
const useScrollSpyState = () => {
  const context = React.useContext(ScrollSpyContext);

  if (!context) {
    throw new Error('useScrollSpyState must be used within the ScrollSpyProvider');
  }

  return context;
};

function Section({
  children,
  title,
  id,
  inheritedTopic,
  parentTopic,
  ...rest
}) {
  const addNode = useScrollSpy();
  return React.createElement("div", Object.assign({
    id: id,
    ref: instance => addNode(instance, {
      title,
      topic: inheritedTopic,
      parentTopic: parentTopic
    })
  }, rest), children);
}

function Topic({
  children,
  name,
  inheritedTopic
}) {
  const childrenWithTopic = React.Children.map(children, child => {
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

export { ScrollSpyProvider, Section, Topic, useScrollSpy, useScrollSpyState };
//# sourceMappingURL=index.modern.js.map

const data = [
  {
    id: 1,
    name: "Applications ::",
    children: [
      {
        id: 2,
        name: "Calendar : app",
      },
      {
        id: 3,
        name: "Chrome : app",
      },
      {
        id: 4,
        name: "Webstorm : app",
      },
    ],
  },
  {
    id: 5,
    name: "Documents ::",
    children: [
      {
        id: 6,
        name: "vuetify :",
        children: [
          {
            id: 7,
            name: "src :",
            children: [
              {
                id: 8,
                name: "index : ts",
              },
              {
                id: 9,
                name: "bootstrap : ts",
              },
            ],
          },
        ],
      },
      {
        id: 10,
        name: "material2 :",
        children: [
          {
            id: 11,
            name: "src :",
            children: [
              {
                id: 12,
                name: "v-btn : ts",
              },
              {
                id: 13,
                name: "v-card : ts",
              },
              {
                id: 14,
                name: "v-window : ts",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 15,
    name: "Downloads :",
    children: [
      {
        id: 16,
        name: "October : pdf",
      },
      {
        id: 17,
        name: "November : pdf",
      },
      {
        id: 18,
        name: "Tutorial : html",
      },
    ],
  },
  {
    id: 19,
    name: "Videos :",
    children: [
      {
        id: 20,
        name: "Tutorials :",
        children: [
          {
            id: 21,
            name: "Basic layouts : mp4",
          },
          {
            id: 22,
            name: "Advanced techniques : mp4",
          },
          {
            id: 23,
            name: "All about app : dir",
          },
        ],
      },
      {
        id: 24,
        name: "Intro : mov",
      },
      {
        id: 25,
        name: "Conference introduction : avi",
      },
    ],
  },
];

const data2 = [
  {
    name: ".git",
  },
  {
    name: "node_modules",
  },
  {
    name: "public",
    children: [
      {
        name: "static",
        children: [
          {
            name: "logo.png",
            file: "png",
          },
        ],
      },
      {
        name: "favicon.ico",
        file: "png",
      },
      {
        name: "index.html",
        file: "html",
      },
    ],
  },
  {
    name: ".gitignore",
    file: "txt",
  },
  {
    name: "babel.config.js",
    file: "js",
  },
  {
    name: "package.json",
    file: "json",
  },
  {
    name: "README.md",
    file: "md",
  },
  {
    name: "vue.config.js",
    file: "js",
  },
  {
    name: "yarn.lock",
    file: "txt",
  },
];

document.addEventListener('click', (e) => {
  if([...e.target.classList].includes('row-icon')) {
    [...e.target.parentNode.querySelectorAll('div')].forEach((el)=> {
      el.classList.toggle('d-none')
    })
  }
})

fetch("https://api.openbrewerydb.org/breweries")
  .then((res) => res.json())
  .then((breweries) => {
    const types = breweries
      .reduce((acc, cur) => {
        const type = cur.brewery_type;
        if (!acc.includes(type)) acc.push(type);
        return acc;
      }, [])
      .sort();
      const tree3 = new PageTree()
      tree3.renderTree(modeledData(breweries, types), document.getElementById('tree3'))
  })
  .then(() => {
    console.log(nodes);
  })
  .catch((err) => console.log(err));

const modeledData = (breweries, types) => {
  const breweriesCat = [];
  for (const type of types) {
    breweriesCat.push({
      id: type,
      name: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
      children: breweries.filter((brewery) => brewery.brewery_type === type),
    });
  }
  return breweriesCat;
};

class PageTree {
  nodes = {}
  buildTreeModel(items, parent = null) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.id = item.id ?? item.name
      const key = item.id;
      const children = item.children ?? [];
      const node = {
        parent,
        children: children.map((c) => c.id ?? c.name),
        item,
      };
      this.buildTreeModel(children, key);
      this.nodes[key] = node;
    }
  };
  
  renderTree(items, parent = undefined) {
    const container = parent ? parent : document.getElementById('tree')
    items?.forEach(item => {
      const listItem = document.createElement('div')
      const listIcon = document.createElement('button')
      const listItemText = document.createElement('span')

      listIcon.classList.add('row-icon')
      listIcon.textContent = "B"
      listItemText.textContent=item.name

      listItemText.classList.add('row-text')

      
      if(item.children?.length > 0){
        listItem.appendChild(listIcon)
        listItem.classList.add('tree-view-row')
      } else {
        listItem.classList.add('tree-view-content')
      }
      listItem.appendChild(listItemText)
      container.appendChild(listItem)
      this.renderTree(item?.children, listItem)
    });
  }

  appendIcons(selector) {

  }
}

const tree1 = new PageTree()
tree1.renderTree(data)

const tree2 = new PageTree()
tree1.renderTree(data2, document.getElementById('tree2'))



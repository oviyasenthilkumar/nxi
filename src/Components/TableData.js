// const tableData = [
//   {
//     name: "Snow fruits",
//     children: [
//       {
//         name: "Apples",
//         children: [
//           {
//             name: "Srinagar",
//             children: [
//               {
//                 name: "Hybrid",
//                 description: "Sample description for Hybrid",
//                 attribute1: "Sweet",
//                 attribute2: "Red",
//                 attribute3: "Winter season",
//                 attribute4: "High yield",
//               },
//               {
//                 name: "GMO",
//                 description: "Sample description for GMO",
//                 attribute1: "Modified",
//                 attribute2: "Yellow",
//                 attribute3: "All-season",
//                 attribute4: "Pest-resistant",
//               },
//               {
//                 name: "Organic",
//                 description: "Sample description for Organic",
//                 attribute1: "Natural",
//                 attribute2: "Green",
//                 attribute3: "Seasonal",
//                 attribute4: "Chemical-free",
//               },
//             ],
//           },
//           {
//             name: "Shimla",
//             children: [
//               {
//                 name: "Hybrid",
//                 description: "Sample description for Hybrid",
//                 attribute1: "Crunchy",
//                 attribute2: "Light Red",
//                 attribute3: "Autumn season",
//                 attribute4: "Disease-resistant",
//               },
//               {
//                 name: "Organic",
//                 description: "Sample description for Organic",
//                 attribute1: "Traditional",
//                 attribute2: "Golden",
//                 attribute3: "Late autumn",
//                 attribute4: "Rich in nutrients",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Berries",
//     children: [
//       {
//         name: "Strawberries",
//         children: [
//           {
//             name: "Farm-grown",
//             description: "Sample description for Farm-grown",
//             attribute1: "Juicy",
//             attribute2: "Red",
//             attribute3: "Summer",
//             attribute4: "Soft texture",
//           },
//           {
//             name: "Wild",
//             description: "Sample description for Wild",
//             attribute1: "Tart",
//             attribute2: "Dark Red",
//             attribute3: "Spring",
//             attribute4: "Small size",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Dry fruits",
//     children: [
//       {
//         name: "Raisins",
//         children: [
//           {
//             name: "Nashik",
//             children: [
//               {
//                 name: "Hybrid",
//                 description: "Sample description for Hybrid",
//                 attribute1: "Seedless",
//                 attribute2: "Golden",
//                 attribute3: "Dried",
//                 attribute4: "Sweet taste",
//               },
//               {
//                 name: "GMO",
//                 description: "Sample description for GMO",
//                 attribute1: "Large size",
//                 attribute2: "Dark Brown",
//                 attribute3: "Processed",
//                 attribute4: "Long shelf life",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "Almonds",
//         children: [
//           {
//             name: "California",
//             children: [
//               {
//                 name: "Sweet",
//                 description: "Sample description for Sweet Almonds",
//                 attribute1: "Smooth",
//                 attribute2: "Light Brown",
//                 attribute3: "Rich in protein",
//                 attribute4: "Popular in desserts",
//               },
//               {
//                 name: "Bitter",
//                 description: "Sample description for Bitter Almonds",
//                 attribute1: "Hard",
//                 attribute2: "Dark Brown",
//                 attribute3: "Used for oil extraction",
//                 attribute4: "Not for direct consumption",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },

// ];

// export default tableData;

// const tableData = [
//   {
//     name: "Snow Fruits",
//     id: "snow-fruits",
//     level: 1,
//     children: [
//       {
//         name: "Apples",
//         id: "apples",
//         level: 2,
//         parentId: "snow-fruits",
//         children: [
//           {
//             name: "Srinagar",
//             id: "srinagar",
//             level: 3,
//             parentId: "apples",
//             children: [
//               {
//                 name: "Hybrid",
//                 id: "srinagar-hybrid",
//                 level: 4,
//                 parentId: "srinagar",
//                 description: "Sample description for Hybrid",
//                 attribute1: "Sweet",
//                 attribute2: "Red",
//                 attribute3: "Winter season",
//                 attribute4: "High yield",
//               },
//               {
//                 name: "GMO",
//                 id: "srinagar-gmo",
//                 level: 4,
//                 parentId: "srinagar",
//                 description: "Sample description for GMO",
//                 attribute1: "Modified",
//                 attribute2: "Yellow",
//                 attribute3: "All-season",
//                 attribute4: "Pest-resistant",
//               },
//               {
//                 name: "Organic",
//                 id: "srinagar-organic",
//                 level: 4,
//                 parentId: "srinagar",
//                 description: "Sample description for Organic",
//                 attribute1: "Natural",
//                 attribute2: "Green",
//                 attribute3: "Seasonal",
//                 attribute4: "Chemical-free",
//               },
//             ],
//           },
//           {
//             name: "Shimla",
//             id: "shimla",
//             level: 3,
//             parentId: "apples",
//             children: [
//               {
//                 name: "Hybrid",
//                 id: "shimla-hybrid",
//                 level: 4,
//                 parentId: "shimla",
//                 description: "Sample description for Hybrid",
//                 attribute1: "Crunchy",
//                 attribute2: "Light Red",
//                 attribute3: "Autumn season",
//                 attribute4: "Disease-resistant",
//               },
//               {
//                 name: "Organic",
//                 id: "shimla-organic",
//                 level: 4,
//                 parentId: "shimla",
//                 description: "Sample description for Organic",
//                 attribute1: "Traditional",
//                 attribute2: "Golden",
//                 attribute3: "Late autumn",
//                 attribute4: "Rich in nutrients",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Dry Fruits",
//     id: "dry-fruits",
//     level: 1,
//     children: [
//       {
//         name: "Raisins",
//         id: "raisins",
//         level: 2,
//         parentId: "dry-fruits",
//         children: [
//           {
//             name: "Nashik",
//             id: "nashik",
//             level: 3,
//             parentId: "raisins",
//             children: [
//               {
//                 name: "Hybrid",
//                 id: "nashik-hybrid",
//                 level: 4,
//                 parentId: "nashik",
//                 description: "Sample description for Hybrid",
//                 attribute1: "Seedless",
//                 attribute2: "Golden",
//                 attribute3: "Dried",
//                 attribute4: "Sweet taste",
//               },
//               {
//                 name: "GMO",
//                 id: "nashik-gmo",
//                 level: 4,
//                 parentId: "nashik",
//                 description: "Sample description for GMO",
//                 attribute1: "Large size",
//                 attribute2: "Dark Brown",
//                 attribute3: "Processed",
//                 attribute4: "Long shelf life",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "Almonds",
//         id: "almonds",
//         level: 2,
//         parentId: "dry-fruits",
//         children: [
//           {
//             name: "California",
//             id: "california",
//             level: 3,
//             parentId: "almonds",
//             children: [
//               {
//                 name: "Sweet",
//                 id: "california-sweet",
//                 level: 4,
//                 parentId: "california",
//                 description: "Sample description for Sweet Almonds",
//                 attribute1: "Smooth",
//                 attribute2: "Light Brown",
//                 attribute3: "Rich in protein",
//                 attribute4: "Popular in desserts",
//               },
//               {
//                 name: "Bitter",
//                 id: "california-bitter",
//                 level: 4,
//                 parentId: "california",
//                 description: "Sample description for Bitter Almonds",
//                 attribute1: "Hard",
//                 attribute2: "Dark Brown",
//                 attribute3: "Used for oil extraction",
//                 attribute4: "Not for direct consumption",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Banana",
//     id: "banana",
//     level: 1,
//     children: [
//       {
//         name: "Cavendish",
//         id: "cavendish",
//         level: 2,
//         parentId: "banana",
//         children: [
//           {
//             name: "Dwarf Cavendish",
//             id: "dwarf-cavendish",
//             level: 3,
//             parentId: "cavendish",
//             description: "Short variety of Cavendish Banana",
//             attribute1: "Sweet",
//             attribute2: "Yellow",
//             attribute3: "All-season",
//             attribute4: "Widely consumed",
//           },
//         ],
//       },
//     ],
//   },
// ];

// export default tableData;
const tableData = [
  // {
  //   name: "Snow Fruits",
  //   id: "snow-fruits",
  //   level: 1,
  //   attributes: {
  //     origin: "Himalayas",
  //     climate: "Cold",
  //   },
  //   children: [
  //     {
  //       name: "Apples",
  //       id: "apples",
  //       level: 2,
  //       parentId: "snow-fruits",
  //       attributes: {
  //         variety: "Multiple",
  //         popularity: "High",
  //       },
  //       children: [
  //         {
  //           name: "Srinagar",
  //           id: "srinagar",
  //           level: 3,
  //           parentId: "apples",
  //           attributes: {
  //             soil: "Loamy",
  //             altitude: "High",
  //           },
  //           children: [
  //             {
  //               name: "Hybrid",
  //               id: "srinagar-hybrid",
  //               level: 4,
  //               parentId: "srinagar",
  //               description: "Sample description for Hybrid",
  //               attribute1: "Sweet",
  //               attribute2: "Red",
  //               attribute3: "Winter season",
  //               attribute4: "High yield",
  //             },
  //             {
  //               name: "GMO",
  //               id: "srinagar-gmo",
  //               level: 4,
  //               parentId: "srinagar",
  //               description: "Sample description for GMO",
  //               attribute1: "Modified",
  //               attribute2: "Yellow",
  //               attribute3: "All-season",
  //               attribute4: "Pest-resistant",
  //             },
  //             {
  //               name: "Organic",
  //               id: "srinagar-organic",
  //               level: 4,
  //               parentId: "srinagar",
  //               description: "Sample description for Organic",
  //               attribute1: "Natural",
  //               attribute2: "Green",
  //               attribute3: "Seasonal",
  //               attribute4: "Chemical-free",
  //             },
  //           ],
  //         },
  //         {
  //           name: "Shimla",
  //           id: "shimla",
  //           level: 3,
  //           parentId: "apples",
  //           attributes: {
  //             soil: "Sandy",
  //             altitude: "Moderate",
  //           },
  //           children: [
  //             {
  //               name: "Hybrid",
  //               id: "shimla-hybrid",
  //               level: 4,
  //               parentId: "shimla",
  //               description: "Sample description for Hybrid",
  //               attribute1: "Crunchy",
  //               attribute2: "Light Red",
  //               attribute3: "Autumn season",
  //               attribute4: "Disease-resistant",
  //             },
  //             {
  //               name: "Organic",
  //               id: "shimla-organic",
  //               level: 4,
  //               parentId: "shimla",
  //               description: "Sample description for Organic",
  //               attribute1: "Traditional",
  //               attribute2: "Golden",
  //               attribute3: "Late autumn",
  //               attribute4: "Rich in nutrients",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "Dry Fruits",
  //   id: "dry-fruits",
  //   level: 1,
  //   children: [
  //     {
  //       name: "Raisins",
  //       id: "raisins",
  //       level: 2,
  //       parentId: "dry-fruits",
  //       children: [
  //         {
  //           name: "Nashik",
  //           id: "nashik",
  //           level: 3,
  //           parentId: "raisins",
  //           attributes: {
  //             climate: "Tropical",
  //             soil: "Sandy loam",
  //           },
  //           children: [
  //             {
  //               name: "Hybrid",
  //               id: "nashik-hybrid",
  //               level: 4,
  //               parentId: "nashik",
  //               description: "Sample description for Hybrid",
  //               attribute1: "Seedless",
  //               attribute2: "Golden",
  //               attribute3: "Dried",
  //               attribute4: "Sweet taste",
  //             },
  //             {
  //               name: "GMO",
  //               id: "nashik-gmo",
  //               level: 4,
  //               parentId: "nashik",
  //               description: "Sample description for GMO",
  //               attribute1: "Large size",
  //               attribute2: "Dark Brown",
  //               attribute3: "Processed",
  //               attribute4: "Long shelf life",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       name: "Almonds",
  //       id: "almonds",
  //       level: 2,
  //       parentId: "dry-fruits",
  //       children: [
  //         {
  //           name: "California",
  //           id: "california",
  //           level: 3,
  //           parentId: "almonds",
  //           attributes: {
  //             soil: "Clay loam",
  //             climate: "Mediterranean",
  //           },
  //           children: [
  //             {
  //               name: "Sweet",
  //               id: "california-sweet",
  //               level: 4,
  //               parentId: "california",
  //               description: "Sample description for Sweet Almonds",
  //               attribute1: "Smooth",
  //               attribute2: "Light Brown",
  //               attribute3: "Rich in protein",
  //               attribute4: "Popular in desserts",
  //             },
  //             {
  //               name: "Bitter",
  //               id: "california-bitter",
  //               level: 4,
  //               parentId: "california",
  //               description: "Sample description for Bitter Almonds",
  //               attribute1: "Hard",
  //               attribute2: "Dark Brown",
  //               attribute3: "Used for oil extraction",
  //               attribute4: "Not for direct consumption",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "Banana",
  //   id: "banana",
  //   level: 1,
  //   children: [
  //     {
  //       name: "Cavendish",
  //       id: "cavendish",
  //       level: 2,
  //       parentId: "banana",
  //       children: [
  //         {
  //           name: "Dwarf Cavendish",
  //           id: "dwarf-cavendish",
  //           level: 3,
  //           parentId: "cavendish",
  //           attributes: {
  //             climate: "Tropical",
  //             growth: "Fast",
  //           },
  //           description: "Short variety of Cavendish Banana",
  //           attribute1: "Sweet",
  //           attribute2: "Yellow",
  //           attribute3: "All-season",
  //           attribute4: "Widely consumed",
  //         },
  //       ],
  //     },
  //   ],
  // },

  {
    name: "Snow Fruits",
    id: "snow-fruits",
    level: 1,
    children: [
      {
        name: "Apples",
        id: "apples",
        level: 2,
        parentId: "snow-fruits",
        children: [
          {
            name: "Srinagar",
            id: "srinagar",
            level: 3,
            parentId: "apples",
            children: [
              {
                name: "Hybrid",
                id: "srinagar-hybrid",
                level: 4,
                parentId: "srinagar",
              },
              {
                name: "GMO",
                id: "srinagar-gmo",
                level: 4,
                parentId: "srinagar",
              },
              {
                name: "Organic",
                id: "srinagar-organic",
                level: 4,
                parentId: "srinagar",
              },
            ],
          },
          {
            name: "Shimla",
            id: "shimla",
            level: 3,
            parentId: "apples",
            children: [
              {
                name: "Hybrid",
                id: "shimla-hybrid",
                level: 4,
                parentId: "shimla",
              },
              {
                name: "Organic",
                id: "shimla-organic",
                level: 4,
                parentId: "shimla",
              },
            ],
          },
          {
            name: "Queenstown",
            id: "queenstown",
            level: 3,
            parentId: "apples",
            children: [
              {
                name: "Hybrid",
                id: "queenstown-hybrid",
                level: 4,
                parentId: "queenstown",
              },
              {
                name: "GMO",
                id: "queenstown-gmo",
                level: 4,
                parentId: "queenstown",
              },
            ],
          },
          {
            name: "Ooty",
            id: "ooty",
            level: 3,
            parentId: "apples",
            children: [
              {
                name: "Organic",
                id: "ooty-organic",
                level: 4,
                parentId: "ooty",
              },
            ],
          },
        ],
      },
      {
        name: "Pears",
        id: "pears",
        level: 2,
        parentId: "snow-fruits",
        children: [
          {
            name: "Shimla",
            id: "pears-shimla",
            level: 3,
            parentId: "pears",
            children: [
              {
                name: "Hybrid",
                id: "pears-shimla-hybrid",
                level: 4,
                parentId: "pears-shimla",
              },
              {
                name: "Organic",
                id: "pears-shimla-organic",
                level: 4,
                parentId: "pears-shimla",
              },
            ],
          },
          {
            name: "Ooty",
            id: "pears-ooty",
            level: 3,
            parentId: "pears",
            children: [
              {
                name: "Organic",
                id: "pears-ooty-organic",
                level: 4,
                parentId: "pears-ooty",
              },
            ],
          },
        ],
      },
      {
        name: "Apricot",
        id: "apricot",
        level: 2,
        parentId: "snow-fruits",
        children: [
          {
            name: "Srinagar",
            id: "apricot-srinagar",
            level: 3,
            parentId: "apricot",
            children: [
              {
                name: "Hybrid",
                id: "apricot-srinagar-hybrid",
                level: 4,
                parentId: "apricot-srinagar",
              },
              {
                name: "GMO",
                id: "apricot-srinagar-gmo",
                level: 4,
                parentId: "apricot-srinagar",
              },
            ],
          },
        ],
      },
      {
        name: "Peach",
        id: "peach",
        level: 2,
        parentId: "snow-fruits",
        children: [
          {
            name: "Queenstown",
            id: "peach-queenstown",
            level: 3,
            parentId: "peach",
            children: [
              {
                name: "Hybrid",
                id: "peach-queenstown-hybrid",
                level: 4,
                parentId: "peach-queenstown",
              },
              {
                name: "GMO",
                id: "peach-queenstown-gmo",
                level: 4,
                parentId: "peach-queenstown",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Dry Fruits",
    id: "dry-fruits",
    level: 1,
    children: [
      {
        name: "Raisins",
        id: "raisins",
        level: 2,
        parentId: "dry-fruits",
        children: [
          {
            name: "Nasik",
            id: "nasik",
            level: 3,
            parentId: "raisins",
            children: [
              {
                name: "Hybrid",
                id: "nasik-hybrid",
                level: 4,
                parentId: "nasik",
              },
              { name: "GMO", id: "nasik-gmo", level: 4, parentId: "nasik" },
            ],
          },
          {
            name: "Dindigul",
            id: "dindigul",
            level: 3,
            parentId: "raisins",
            children: [
              {
                name: "Hybrid",
                id: "dindigul-hybrid",
                level: 4,
                parentId: "dindigul",
              },
              {
                name: "Organic",
                id: "dindigul-organic",
                level: 4,
                parentId: "dindigul",
              },
            ],
          },
          {
            name: "Theni",
            id: "theni",
            level: 3,
            parentId: "raisins",
            children: [
              { name: "GMO", id: "theni-gmo", level: 4, parentId: "theni" },
              {
                name: "Organic",
                id: "theni-organic",
                level: 4,
                parentId: "theni",
              },
            ],
          },
        ],
      },
      {
        name: "Figs",
        id: "figs",
        level: 2,
        parentId: "dry-fruits",
        children: [
          {
            name: "Cairo",
            id: "cairo",
            level: 3,
            parentId: "figs",
            children: [
              {
                name: "Hybrid",
                id: "cairo-hybrid",
                level: 4,
                parentId: "cairo",
              },
              { name: "GMO", id: "cairo-gmo", level: 4, parentId: "cairo" },
            ],
          },
          {
            name: "Istanbul",
            id: "istanbul",
            level: 3,
            parentId: "figs",
            children: [
              {
                name: "Hybrid",
                id: "istanbul-hybrid",
                level: 4,
                parentId: "istanbul",
              },
              {
                name: "Organic",
                id: "istanbul-organic",
                level: 4,
                parentId: "istanbul",
              },
            ],
          },
          {
            name: "Mangalore",
            id: "mangalore",
            level: 3,
            parentId: "figs",
            children: [
              {
                name: "GMO",
                id: "mangalore-gmo",
                level: 4,
                parentId: "mangalore",
              },
              {
                name: "Organic",
                id: "mangalore-organic",
                level: 4,
                parentId: "mangalore",
              },
            ],
          },
        ],
      },
      {
        name: "Dates",
        id: "dates",
        level: 2,
        parentId: "dry-fruits",
        children: [
          {
            name: "Dubai",
            id: "dubai",
            level: 3,
            parentId: "dates",
            children: [
              {
                name: "Hybrid",
                id: "dubai-hybrid",
                level: 4,
                parentId: "dubai",
              },
              { name: "GMO", id: "dubai-gmo", level: 4, parentId: "dubai" },
            ],
          },
          {
            name: "Tehran",
            id: "tehran",
            level: 3,
            parentId: "dates",
            children: [
              {
                name: "Hybrid",
                id: "tehran-hybrid",
                level: 4,
                parentId: "tehran",
              },
              {
                name: "Organic",
                id: "tehran-organic",
                level: 4,
                parentId: "tehran",
              },
            ],
          },
          {
            name: "Sharjah",
            id: "sharjah",
            level: 3,
            parentId: "dates",
            children: [
              { name: "GMO", id: "sharjah-gmo", level: 4, parentId: "sharjah" },
              {
                name: "Organic",
                id: "sharjah-organic",
                level: 4,
                parentId: "sharjah",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Nuts",
    id: "nuts",
    level: 1,
    children: [
      {
        name: "Cashew",
        id: "cashew",
        level: 2,
        parentId: "nuts",
        children: [
          {
            name: "Panruti",
            id: "panruti",
            level: 3,
            parentId: "cashew",
            children: [
              {
                name: "Hybrid",
                id: "panruti-hybrid",
                level: 4,
                parentId: "panruti",
              },
              { name: "GMO", id: "panruti-gmo", level: 4, parentId: "panruti" },
            ],
          },
          {
            name: "Kannur",
            id: "kannur",
            level: 3,
            parentId: "cashew",
            children: [
              { name: "GMO", id: "kannur-gmo", level: 4, parentId: "kannur" },
              {
                name: "Organic",
                id: "kannur-organic",
                level: 4,
                parentId: "kannur",
              },
            ],
          },
          {
            name: "Guntur",
            id: "guntur",
            level: 3,
            parentId: "cashew",
            children: [
              {
                name: "Hybrid",
                id: "guntur-hybrid",
                level: 4,
                parentId: "guntur",
              },
              { name: "GMO", id: "guntur-gmo", level: 4, parentId: "guntur" },
            ],
          },
        ],
      },
      {
        name: "Walnut",
        id: "walnut",
        level: 2,
        parentId: "nuts",
        children: [
          {
            name: "Kalanktang",
            id: "kalanktang",
            level: 3,
            parentId: "walnut",
            children: [
              {
                name: "Hybrid",
                id: "kalanktang-hybrid",
                level: 4,
                parentId: "kalanktang",
              },
              {
                name: "Organic",
                id: "kalanktang-organic",
                level: 4,
                parentId: "kalanktang",
              },
              {
                name: "GMO",
                id: "kalanktang-gmo",
                level: 4,
                parentId: "kalanktang",
              },
            ],
          },
          {
            name: "Dheradhun",
            id: "dheradhun",
            level: 3,
            parentId: "walnut",
            children: [
              {
                name: "Organic",
                id: "dheradhun-organic",
                level: 4,
                parentId: "dheradhun",
              },
              {
                name: "GMO",
                id: "dheradhun-gmo",
                level: 4,
                parentId: "dheradhun",
              },
            ],
          },
        ],
      },
      {
        name: "Almond",
        id: "almond",
        level: 2,
        parentId: "nuts",
        children: [
          {
            name: "Dheradhun",
            id: "almond-dheradhun",
            level: 3,
            parentId: "almond",
            children: [
              {
                name: "Hybrid",
                id: "almond-dheradhun-hybrid",
                level: 4,
                parentId: "almond-dheradhun",
              },
              {
                name: "Organic",
                id: "almond-dheradhun-organic",
                level: 4,
                parentId: "almond-dheradhun",
              },
            ],
          },
          {
            name: "Srinagar",
            id: "almond-srinagar",
            level: 3,
            parentId: "almond",
            children: [
              {
                name: "Hybrid",
                id: "almond-srinagar-hybrid",
                level: 4,
                parentId: "almond-srinagar",
              },
              {
                name: "Organic",
                id: "almond-srinagar-organic",
                level: 4,
                parentId: "almond-srinagar",
              },
              {
                name: "GMO",
                id: "almond-srinagar-gmo",
                level: 4,
                parentId: "almond-srinagar",
              },
            ],
          },
        ],
      },
      {
        name: "Groundnut",
        id: "groundnut",
        level: 2,
        parentId: "nuts",
        children: [
          {
            name: "Cudallore",
            id: "cudallore",
            level: 3,
            parentId: "groundnut",
            children: [
              {
                name: "Hybrid",
                id: "cudallore-hybrid",
                level: 4,
                parentId: "cudallore",
              },
              {
                name: "Organic",
                id: "cudallore-organic",
                level: 4,
                parentId: "cudallore",
              },
              {
                name: "GMO",
                id: "cudallore-gmo",
                level: 4,
                parentId: "cudallore",
              },
            ],
          },
          {
            name: "Nellore",
            id: "nellore",
            level: 3,
            parentId: "groundnut",
            children: [
              {
                name: "Organic",
                id: "nellore-organic",
                level: 4,
                parentId: "nellore",
              },
              { name: "GMO", id: "nellore-gmo", level: 4, parentId: "nellore" },
            ],
          },
        ],
      },
      {
        name: "Pistachio",
        id: "pistachio",
        level: 2,
        parentId: "nuts",
        children: [
          {
            name: "Kalanktang",
            id: "pistachio-kalanktang",
            level: 3,
            parentId: "pistachio",
            children: [
              {
                name: "Hybrid",
                id: "pistachio-kalanktang-hybrid",
                level: 4,
                parentId: "pistachio-kalanktang",
              },
            ],
          },
          {
            name: "Dheradhun",
            id: "pistachio-dheradhun",
            level: 3,
            parentId: "pistachio",
            children: [
              {
                name: "GMO",
                id: "pistachio-dheradhun-gmo",
                level: 4,
                parentId: "pistachio-dheradhun",
              },
            ],
          },
          {
            name: "Srinagar",
            id: "pistachio-srinagar",
            level: 3,
            parentId: "pistachio",
            children: [
              {
                name: "Hybrid",
                id: "pistachio-srinagar-hybrid",
                level: 4,
                parentId: "pistachio-srinagar",
              },
              {
                name: "Organic",
                id: "pistachio-srinagar-organic",
                level: 4,
                parentId: "pistachio-srinagar",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Bananas",
    id: "bananas",
    level: 1,
    children: [
      {
        name: "Malavazhai",
        id: "malavazhai",
        level: 2,
        parentId: "bananas",
        children: [
          {
            name: "Yelagiri",
            id: "yelagiri",
            level: 3,
            parentId: "malavazhai",
            children: [
              {
                name: "Organic",
                id: "yelagiri-organic",
                level: 4,
                parentId: "yelagiri",
              },
            ],
          },
          {
            name: "Siruamalai",
            id: "siruamalai",
            level: 3,
            parentId: "malavazhai",
            children: [
              {
                name: "Organic",
                id: "siruamalai-organic",
                level: 4,
                parentId: "siruamalai",
              },
            ],
          },
          {
            name: "Yercaud",
            id: "yercaud",
            level: 3,
            parentId: "malavazhai",
            children: [
              {
                name: "Organic",
                id: "yercaud-organic",
                level: 4,
                parentId: "yercaud",
              },
            ],
          },
          {
            name: "Kambam",
            id: "kambam",
            level: 3,
            parentId: "malavazhai",
            children: [
              {
                name: "Organic",
                id: "kambam-organic",
                level: 4,
                parentId: "kambam",
              },
              {
                name: "Hybrid",
                id: "kambam-hybrid",
                level: 4,
                parentId: "kambam",
              },
            ],
          },
          {
            name: "Nellai",
            id: "nellai",
            level: 3,
            parentId: "malavazhai",
            children: [
              {
                name: "Organic",
                id: "nellai-organic",
                level: 4,
                parentId: "nellai",
              },
            ],
          },
          {
            name: "Theni",
            id: "theni",
            level: 3,
            parentId: "malavazhai",
            children: [
              {
                name: "Hybrid",
                id: "theni-hybrid",
                level: 4,
                parentId: "theni",
              },
            ],
          },
        ],
      },
      {
        name: "Karpooravalli",
        id: "karpooravalli",
        level: 2,
        parentId: "bananas",
        children: [
          {
            name: "Trichy",
            id: "trichy",
            level: 3,
            parentId: "karpooravalli",
            children: [
              {
                name: "Organic",
                id: "trichy-organic",
                level: 4,
                parentId: "trichy",
              },
            ],
          },
          {
            name: "Tanjore",
            id: "tanjore",
            level: 3,
            parentId: "karpooravalli",
            children: [
              {
                name: "Organic",
                id: "tanjore-organic",
                level: 4,
                parentId: "tanjore",
              },
            ],
          },
        ],
      },
      {
        name: "Yellaki",
        id: "yellaki",
        level: 2,
        parentId: "bananas",
        children: [
          {
            name: "Kanyakumari",
            id: "kanyakumari",
            level: 3,
            parentId: "yellaki",
            children: [
              {
                name: "Hybrid",
                id: "kanyakumari-hybrid",
                level: 4,
                parentId: "kanyakumari",
              },
              {
                name: "Organic",
                id: "kanyakumari-organic",
                level: 4,
                parentId: "kanyakumari",
              },
              {
                name: "GMO",
                id: "kanyakumari-gmo",
                level: 4,
                parentId: "kanyakumari",
              },
            ],
          },
          {
            name: "Nagarkovil",
            id: "nagarkovil",
            level: 3,
            parentId: "yellaki",
            children: [
              {
                name: "Hybrid",
                id: "nagarkovil-hybrid",
                level: 4,
                parentId: "nagarkovil",
              },
            ],
          },
          {
            name: "Kollam",
            id: "kollam",
            level: 3,
            parentId: "yellaki",
            children: [
              { name: "GMO", id: "kollam-gmo", level: 4, parentId: "kollam" },
            ],
          },
          {
            name: "Pallakad",
            id: "pallakad",
            level: 3,
            parentId: "yellaki",
            children: [
              {
                name: "Organic",
                id: "pallakad-organic",
                level: 4,
                parentId: "pallakad",
              },
              {
                name: "GMO",
                id: "pallakad-gmo",
                level: 4,
                parentId: "pallakad",
              },
            ],
          },
        ],
      },
      {
        name: "Sevazhai",
        id: "sevazhai",
        level: 2,
        parentId: "bananas",
        children: [
          {
            name: "Pollachi",
            id: "pollachi",
            level: 3,
            parentId: "sevazhai",
            children: [
              {
                name: "Hybrid",
                id: "pollachi-hybrid",
                level: 4,
                parentId: "pollachi",
              },
              {
                name: "Organic",
                id: "pollachi-organic",
                level: 4,
                parentId: "pollachi",
              },
            ],
          },
          {
            name: "Marthandam",
            id: "marthandam",
            level: 3,
            parentId: "sevazhai",
            children: [
              {
                name: "GMO",
                id: "marthandam-gmo",
                level: 4,
                parentId: "marthandam",
              },
            ],
          },
        ],
      },
      {
        name: "Rasthali",
        id: "rasthali",
        level: 2,
        parentId: "bananas",
        children: [
          {
            name: "Salem",
            id: "salem",
            level: 3,
            parentId: "rasthali",
            children: [
              {
                name: "Organic",
                id: "salem-organic",
                level: 4,
                parentId: "salem",
              },
            ],
          },
          {
            name: "Erode",
            id: "erode",
            level: 3,
            parentId: "rasthali",
            children: [
              {
                name: "Organic",
                id: "erode-organic",
                level: 4,
                parentId: "erode",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default tableData;
